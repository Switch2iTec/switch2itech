import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase, CheckCircle2, Clock, Users, Plus, Loader2,
    FolderGit2, Milestone, Layers, ListTodo, ArrowRight,
    TrendingUp, Zap, AlertCircle, ChevronDown, ChevronRight,
    UserPlus, X, Search, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import { useAuth } from '../../context/ContextProvider';
import projectService from '../../api/projectService';
import userService from '../../api/userService';

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

// ── Milestone Row ───────────────────────────────────────────────────────────
const statusBadge = (status) => {
    const map = {
        completed: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
        active: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
        'in-progress': 'bg-blue-500/15 text-blue-600 border-blue-500/30',
        pending: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
        review: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
    };
    const key = status?.toLowerCase() || 'pending';
    return map[key] || 'bg-secondary text-muted-foreground';
};

// ── Main Component ───────────────────────────────────────────────────────────
const ManagerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedProject, setExpandedProject] = useState(null);
    const [milestones, setMilestones] = useState({});

    // Dialog states
    const [assignDialog, setAssignDialog] = useState({ open: false, project: null });
    const [assignments, setAssignments] = useState({ manager: '', teamMembers: [], clients: [] });
    const [addMilestoneDialog, setAddMilestoneDialog] = useState({ open: false, project: null });
    const [milestoneForm, setMilestoneForm] = useState({ title: '', description: '', dueDate: '', status: 'pending' });

    // ── Fetch data ────────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [projRes, userRes] = await Promise.all([
                    projectService.getAllProjects(),
                    userService.getUsers(),
                ]);
                const allProjects = projRes.data?.data || [];
                const myProjects = allProjects.filter(
                    p => (p.manager?._id || p.manager) === user?._id
                );
                setProjects(myProjects);
                setAllUsers(userRes.data?.data || []);
            } catch (err) {
                console.error('Manager dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchData();
    }, [user]);

    // ── Fetch milestones for a project ───────────────────────────────────────
    const loadMilestones = async (projectId) => {
        if (milestones[projectId]) return;
        try {
            const res = await projectService.getMilestones(projectId);
            setMilestones(prev => ({ ...prev, [projectId]: res.data?.data || [] }));
        } catch {
            setMilestones(prev => ({ ...prev, [projectId]: [] }));
        }
    };

    const toggleProject = (projectId) => {
        if (expandedProject === projectId) {
            setExpandedProject(null);
        } else {
            setExpandedProject(projectId);
            loadMilestones(projectId);
        }
    };

    // ── Assignment save ───────────────────────────────────────────────────────
    const handleAssignSave = async () => {
        try {
            await projectService.assignProject(assignDialog.project._id, assignments);
            setProjects(prev =>
                prev.map(p => p._id === assignDialog.project._id ? { ...p, ...assignments } : p)
            );
            setAssignDialog({ open: false, project: null });
        } catch (err) {
            console.error('Assignment failed:', err);
        }
    };

    const openAssignDialog = (project) => {
        setAssignments({
            manager: project.manager?._id || project.manager || '',
            teamMembers: project.teamMembers?.map(t => t._id || t) || [],
            clients: project.clients?.map(c => c._id || c) || [],
        });
        setAssignDialog({ open: true, project });
    };

    // ── Add milestone save ────────────────────────────────────────────────────
    const handleAddMilestone = async () => {
        try {
            await projectService.createMilestone(addMilestoneDialog.project._id, milestoneForm);
            // Reload milestones for this project
            delete milestones[addMilestoneDialog.project._id];
            await loadMilestones(addMilestoneDialog.project._id);
            setAddMilestoneDialog({ open: false, project: null });
            setMilestoneForm({ title: '', description: '', deadline: '', status: 'pending' });
        } catch (err) {
            console.error('Add milestone failed:', err);
        }
    };

    // ── Derived stats ─────────────────────────────────────────────────────────
    const active = projects.filter(p => p.status?.toLowerCase() === 'active' || p.status?.toLowerCase() === 'in-progress').length;
    const completed = projects.filter(p => p.status?.toLowerCase() === 'completed').length;
    const totalMembers = [...new Set(projects.flatMap(p => p.teamMembers?.map(t => t._id || t) || []))].length;

    const filteredProjects = projects.filter(p =>
        (p.title || p.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }


    // ── Main Dashboard ────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Welcome back, <span className="font-semibold text-foreground">{user?.name}</span> — here's your project overview.
                    </p>
                </div>
                <Button onClick={() => navigate('/add-project')} className="gap-2 rounded-xl shadow-lg shadow-primary/20">
                    <Plus size={16} /> New Project
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard icon={Briefcase} label="Total Projects" value={projects.length} color="text-blue-500" bg="bg-blue-500/10" />
                <StatCard icon={Zap} label="Active" value={active} color="text-emerald-500" bg="bg-emerald-500/10" />
                <StatCard icon={CheckCircle2} label="Completed" value={completed} color="text-purple-500" bg="bg-purple-500/10" />
                <StatCard icon={Users} label="Team Members" value={totalMembers} color="text-orange-500" bg="bg-orange-500/10" />
            </div>

            {/* Projects list */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                        <FolderGit2 size={20} className="text-primary" /> My Projects
                    </h2>
                    <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-8 h-9 rounded-xl bg-card text-sm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {filteredProjects.length === 0 && (
                    <Card className="rounded-2xl border-dashed border-2 border-border/50">
                        <CardContent className="p-12 flex flex-col items-center gap-3 text-center">
                            <AlertCircle size={40} className="text-muted-foreground/40" />
                            <p className="font-semibold text-muted-foreground">No projects assigned to you yet.</p>
                            <Button onClick={() => navigate('/add-project')} variant="outline" size="sm" className="mt-2 gap-1">
                                <Plus size={14} /> Create your first project
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-4">
                    {filteredProjects.map(project => {
                        const progress = project.progress || 0;
                        const isExpanded = expandedProject === project._id;
                        const projectMilestones = milestones[project._id] || [];

                        return (
                            <Card key={project._id} className="rounded-2xl border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md">
                                <CardContent className="p-0">
                                    {/* Project Row */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                                        {/* Cover thumb */}
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
                                            {/* Progress bar */}
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

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-1 h-8 text-xs rounded-lg"
                                                onClick={() => openAssignDialog(project)}
                                            >
                                                <UserPlus size={13} /> Assign
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-1 h-8 text-xs rounded-lg"
                                                onClick={() => setAddMilestoneDialog({ open: true, project })}
                                            >
                                                <Milestone size={13} /> Add Milestone
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="gap-1 h-8 text-xs rounded-lg"
                                                onClick={() => navigate(`/projects/${project._id}`)}
                                            >
                                                <ExternalLink size={13} /> Open
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 rounded-lg"
                                                onClick={() => toggleProject(project._id)}
                                            >
                                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Expanded Milestones */}
                                    {isExpanded && (
                                        <div className="border-t border-border/50 bg-muted/30 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                                    <Milestone size={13} /> Milestones ({projectMilestones.length})
                                                </p>
                                            </div>

                                            {projectMilestones.length === 0 ? (
                                                <p className="text-xs text-muted-foreground italic">No milestones yet. Add one above.</p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {projectMilestones.map(ms => (
                                                        <div key={ms._id} className="flex items-center justify-between bg-card border border-border/40 rounded-xl px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-2 h-2 rounded-full ${ms.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
                                                                <span className="text-sm font-semibold">{ms.title}</span>
                                                                {ms.deadline && (
                                                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                                        <Clock size={10} /> {new Date(ms.deadline).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <Badge className={`text-[10px] border ${statusBadge(ms.status)}`}>{ms.status || 'pending'}</Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* ── Assign Dialog ───────────────────────────────────────────────────── */}
            <Dialog open={assignDialog.open} onOpenChange={open => setAssignDialog(prev => ({ ...prev, open }))}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Assign Team — {assignDialog.project?.title || assignDialog.project?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-4">

                        {/* Manager */}
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Project Manager</Label>
                            <select
                                className="w-full h-10 px-3 rounded-xl border border-border bg-card text-sm"
                                value={assignments.manager}
                                onChange={e => setAssignments({ ...assignments, manager: e.target.value })}
                            >
                                <option value="">— Unassigned —</option>
                                {allUsers.filter(u => u.role === 'admin' || u.role === 'manager').map(u => (
                                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                                ))}
                            </select>
                        </div>

                        {/* Developers */}
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Add Developer</Label>
                            <select
                                className="w-full h-10 px-3 rounded-xl border border-border bg-card text-sm"
                                onChange={e => {
                                    if (e.target.value && !assignments.teamMembers.includes(e.target.value)) {
                                        setAssignments({ ...assignments, teamMembers: [...assignments.teamMembers, e.target.value] });
                                    }
                                    e.target.value = '';
                                }}
                            >
                                <option value="">Select developer...</option>
                                {allUsers.filter(u => u.role === 'developer').map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {assignments.teamMembers.map(id => {
                                    const dev = allUsers.find(u => u._id === id);
                                    return dev ? (
                                        <Badge key={id} variant="secondary" className="cursor-pointer gap-1" onClick={() =>
                                            setAssignments({ ...assignments, teamMembers: assignments.teamMembers.filter(x => x !== id) })
                                        }>
                                            {dev.name} <X size={10} />
                                        </Badge>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        {/* Clients */}
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Add Client</Label>
                            <select
                                className="w-full h-10 px-3 rounded-xl border border-border bg-card text-sm"
                                onChange={e => {
                                    if (e.target.value && !assignments.clients.includes(e.target.value)) {
                                        setAssignments({ ...assignments, clients: [...assignments.clients, e.target.value] });
                                    }
                                    e.target.value = '';
                                }}
                            >
                                <option value="">Select client...</option>
                                {allUsers.filter(u => u.role === 'client').map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {assignments.clients.map(id => {
                                    const cl = allUsers.find(u => u._id === id);
                                    return cl ? (
                                        <Badge key={id} className="bg-blue-100 text-blue-800 cursor-pointer gap-1" onClick={() =>
                                            setAssignments({ ...assignments, clients: assignments.clients.filter(x => x !== id) })
                                        }>
                                            {cl.name} <X size={10} />
                                        </Badge>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        <Button onClick={handleAssignSave} className="w-full rounded-xl">Save Assignments</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Add Milestone Dialog ─────────────────────────────────────────────── */}
            <Dialog open={addMilestoneDialog.open} onOpenChange={open => setAddMilestoneDialog(prev => ({ ...prev, open }))}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Milestone — {addMilestoneDialog.project?.title || addMilestoneDialog.project?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Title</Label>
                            <Input
                                placeholder="Milestone title..."
                                className="rounded-xl"
                                value={milestoneForm.title}
                                onChange={e => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Description</Label>
                            <Input
                                placeholder="Short description..."
                                className="rounded-xl"
                                value={milestoneForm.description}
                                onChange={e => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Deadline</Label>
                            <Input
                                type="date"
                                className="rounded-xl"
                                value={milestoneForm.deadline}
                                onChange={e => setMilestoneForm({ ...milestoneForm, deadline: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Status</Label>
                            <select
                                className="w-full h-10 px-3 rounded-xl border border-border bg-card text-sm"
                                value={milestoneForm.status}
                                onChange={e => setMilestoneForm({ ...milestoneForm, status: e.target.value })}
                            >
                                {['pending', 'in-progress', 'review', 'completed'].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <Button onClick={handleAddMilestone} className="w-full rounded-xl" disabled={!milestoneForm.title}>
                            Create Milestone
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManagerDashboard;
