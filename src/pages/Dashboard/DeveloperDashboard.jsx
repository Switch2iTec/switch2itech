import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase, CheckCircle2, Clock, Loader2,
    FolderGit2, Milestone, Layers, ListTodo,
    AlertCircle, ChevronDown, ChevronRight,
    Zap, CircleDot, CalendarDays, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/ContextProvider';
import projectService from '../../api/projectService';

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
    <Card className="rounded-2xl border-border/50 bg-card hover:shadow-md transition-all duration-300">
        <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${bg}`}>
                <Icon size={20} className={color} />
            </div>
            <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                <h3 className="text-2xl font-extrabold mt-0.5">{value}</h3>
            </div>
        </CardContent>
    </Card>
);

// ── Status badge helper ────────────────────────────────────────────────────
const statusBadge = (status) => {
    const map = {
        completed: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
        active: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
        'in-progress': 'bg-blue-500/15 text-blue-600 border-blue-500/30',
        pending: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
        review: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
        done: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
    };
    const key = status?.toLowerCase() || 'pending';
    return map[key] || 'bg-secondary text-muted-foreground';
};

// ── Task status dot colour ──────────────────────────────────────────────────
const taskDotColor = (status) => {
    const map = {
        completed: 'bg-emerald-500',
        done: 'bg-emerald-500',
        'in-progress': 'bg-blue-500 animate-pulse',
        active: 'bg-blue-500 animate-pulse',
        pending: 'bg-amber-400',
        review: 'bg-purple-500',
    };
    return map[status?.toLowerCase()] || 'bg-gray-400';
};

// ── Main Component ───────────────────────────────────────────────────────────
const DeveloperDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedProject, setExpandedProject] = useState(null);
    const [milestonesMap, setMilestonesMap] = useState({});
    const [tasksMap, setTasksMap] = useState({});

    // ── Fetch assigned projects ──────────────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await projectService.getAllProjects();
                const all = res.data?.data || [];
                const mine = all.filter(p =>
                    p.teamMembers?.some(m => (m._id || m) === user?._id)
                );
                setProjects(mine);
            } catch (err) {
                console.error('Developer dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchData();
    }, [user]);

    // ── Fetch milestones (and tasks per module) for a project ────────────────
    const loadProjectDetails = async (projectId) => {
        if (milestonesMap[projectId]) return;
        try {
            const msRes = await projectService.getMilestones(projectId);
            const msList = msRes.data?.data || [];
            setMilestonesMap(prev => ({ ...prev, [projectId]: msList }));

            // For each milestone fetch modules+tasks
            const collected = [];
            for (const ms of msList) {
                try {
                    const modRes = await projectService.getModules(projectId, ms._id);
                    const modules = modRes.data?.data || [];
                    for (const mod of modules) {
                        try {
                            const taskRes = await projectService.getTasks(projectId, ms._id, mod._id);
                            const tasks = (taskRes.data?.data || []).filter(t =>
                                t.assignedTo === user?._id || t.assignedTo?._id === user?._id
                            );
                            tasks.forEach(t => collected.push({ ...t, _milestoneTitle: ms.title, _moduleTitle: mod.title }));
                        } catch { /* ignore */ }
                    }
                } catch { /* ignore */ }
            }
            setTasksMap(prev => ({ ...prev, [projectId]: collected }));
        } catch {
            setMilestonesMap(prev => ({ ...prev, [projectId]: [] }));
        }
    };

    const toggleProject = (projectId) => {
        if (expandedProject === projectId) {
            setExpandedProject(null);
        } else {
            setExpandedProject(projectId);
            loadProjectDetails(projectId);
        }
    };

    // ── Derived stats ─────────────────────────────────────────────────────────
    const active = projects.filter(p => ['active', 'in-progress'].includes(p.status?.toLowerCase())).length;
    const completed = projects.filter(p => p.status?.toLowerCase() === 'completed').length;
    const allTasks = Object.values(tasksMap).flat();
    const doneTasks = allTasks.filter(t => ['completed', 'done'].includes(t.status?.toLowerCase())).length;

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Developer Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Welcome back, <span className="font-semibold text-foreground">{user?.name}</span> — here are your assigned projects.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard icon={Briefcase} label="Assigned Projects" value={projects.length} color="text-blue-500" bg="bg-blue-500/10" />
                <StatCard icon={Zap} label="Active Projects" value={active} color="text-emerald-500" bg="bg-emerald-500/10" />
                <StatCard icon={CheckCircle2} label="Completed Projects" value={completed} color="text-purple-500" bg="bg-purple-500/10" />
                <StatCard icon={ListTodo} label="My Tasks Done" value={`${doneTasks} / ${allTasks.length}`} color="text-orange-500" bg="bg-orange-500/10" />
            </div>

            {/* Projects */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <FolderGit2 size={20} className="text-primary" /> My Assigned Projects
                </h2>

                {projects.length === 0 && (
                    <Card className="rounded-2xl border-dashed border-2 border-border/50">
                        <CardContent className="p-12 flex flex-col items-center gap-3 text-center">
                            <AlertCircle size={40} className="text-muted-foreground/40" />
                            <p className="font-semibold text-muted-foreground">No projects assigned to you yet.</p>
                            <p className="text-xs text-muted-foreground">Your manager will assign projects to you shortly.</p>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-4">
                    {projects.map(project => {
                        const progress = project.progress || 0;
                        const isExpanded = expandedProject === project._id;
                        const msList = milestonesMap[project._id] || [];
                        const myTasks = tasksMap[project._id] || [];

                        return (
                            <Card key={project._id} className="rounded-2xl border-border/50 overflow-hidden hover:shadow-md transition-all duration-300">
                                <CardContent className="p-0">
                                    {/* Project Row */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                                        {/* Thumb */}
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                            <img
                                                src={project.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400'}
                                                alt={project.title || project.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-bold text-base">{project.title || project.name}</h3>
                                                <Badge className={`text-[10px] border ${statusBadge(project.status)}`}>{project.status || 'Pending'}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{project.description || project.desc || 'No description.'}</p>
                                            {/* Progress */}
                                            <div className="mt-2 space-y-1">
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                                                    <span>Progress</span>
                                                    <span className="text-primary">{progress}%</span>
                                                </div>
                                                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expand toggle + Open button */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button
                                                size="sm"
                                                className="gap-1 h-8 text-xs rounded-lg"
                                                onClick={() => navigate(`/projects/${project._id}`)}
                                            >
                                                <ExternalLink size={13} /> Open
                                            </Button>
                                            <button
                                                onClick={() => toggleProject(project._id)}
                                                className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
                                            >
                                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                {isExpanded ? 'Hide' : 'Details'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Section */}
                                    {isExpanded && (
                                        <div className="border-t border-border/50 bg-muted/20 px-6 py-5 space-y-6 animate-in fade-in slide-in-from-top-1 duration-300">

                                            {/* Milestones */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                                    <Milestone size={12} /> Milestones ({msList.length})
                                                </p>
                                                {msList.length === 0 ? (
                                                    <p className="text-xs text-muted-foreground italic">No milestones for this project.</p>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {msList.map(ms => (
                                                            <div key={ms._id} className="flex items-center gap-3 bg-card border border-border/40 rounded-xl px-4 py-3">
                                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ms.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-semibold truncate">{ms.title}</p>
                                                                    {ms.deadline && (
                                                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                                                            <CalendarDays size={9} /> {new Date(ms.deadline).toLocaleDateString()}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <Badge className={`text-[10px] border flex-shrink-0 ${statusBadge(ms.status)}`}>{ms.status || 'pending'}</Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* My Tasks */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                                    <ListTodo size={12} /> My Tasks ({myTasks.length})
                                                </p>
                                                {myTasks.length === 0 ? (
                                                    <p className="text-xs text-muted-foreground italic">No tasks assigned to you in this project.</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {myTasks.map(task => (
                                                            <div key={task._id} className="flex items-center gap-3 bg-card border border-border/40 rounded-xl px-4 py-3">
                                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${taskDotColor(task.status)}`} />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-semibold truncate">{task.title}</p>
                                                                    <p className="text-[10px] text-muted-foreground mt-0.5">
                                                                        {task._milestoneTitle && <span>{task._milestoneTitle}</span>}
                                                                        {task._moduleTitle && <span> › {task._moduleTitle}</span>}
                                                                    </p>
                                                                </div>
                                                                {task.deadline && (
                                                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 flex-shrink-0">
                                                                        <Clock size={9} /> {new Date(task.deadline).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                                <Badge className={`text-[10px] border flex-shrink-0 ${statusBadge(task.status)}`}>
                                                                    {task.status || 'pending'}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DeveloperDashboard;
