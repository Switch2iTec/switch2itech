import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase, CheckCircle2, Clock, Users, Plus, Loader2,
    FolderGit2, Milestone, AlertCircle, ChevronDown, ChevronRight,
    UserPlus, X, Search, ExternalLink, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useAuth } from '../../context/ContextProvider';
import projectService from '../../api/projectService';
import userService from '../../api/userService';

/* ── Shared status badge map ─────────────────────────────────────── */
const statusBadge = (status) => {
    const map = {
        completed: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
        active: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
        'in-progress': 'bg-blue-500/15 text-blue-600 border-blue-500/30',
        pending: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
        review: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
    };
    return map[status?.toLowerCase()] || 'bg-secondary text-muted-foreground';
};

/* ── Stat Card ───────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
    <div className="stat-card flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bg} shrink-0`}>
            <Icon size={19} className={color} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
            <h3 className="text-2xl font-extrabold tracking-tight mt-0.5">{value}</h3>
        </div>
    </div>
);

/* ── Main Component ──────────────────────────────────────────────── */
const ManagerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedProject, setExpandedProject] = useState(null);
    const [milestones, setMilestones] = useState({});

    const [assignDialog, setAssignDialog] = useState({ open: false, project: null });
    const [assignments, setAssignments] = useState({ manager: '', teamMembers: [], clients: [] });
    const [addMilestoneDialog, setAddMilestoneDialog] = useState({ open: false, project: null });
    const [milestoneForm, setMilestoneForm] = useState({ title: '', description: '', dueDate: '', status: 'pending' });

    /* fetch ────────────────────────────────────────────────────────── */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [projRes, userRes] = await Promise.all([
                    projectService.getAllProjects(),
                    userService.getUsers(),
                ]);
                const myProjects = (projRes.data?.data || []).filter(
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

    const loadMilestones = async (projectId) => {
        if (milestones[projectId]) return;
        try {
            const res = await projectService.getMilestones(projectId);
            setMilestones(prev => ({ ...prev, [projectId]: res.data?.data || [] }));
        } catch {
            setMilestones(prev => ({ ...prev, [projectId]: [] }));
        }
    };

    const toggleProject = (id) => {
        if (expandedProject === id) { setExpandedProject(null); return; }
        setExpandedProject(id);
        loadMilestones(id);
    };

    const handleAssignSave = async () => {
        try {
            await projectService.assignProject(assignDialog.project._id, assignments);
            setProjects(prev => prev.map(p => p._id === assignDialog.project._id ? { ...p, ...assignments } : p));
            setAssignDialog({ open: false, project: null });
        } catch (err) { console.error('Assignment failed:', err); }
    };

    const openAssignDialog = (project) => {
        setAssignments({
            manager: project.manager?._id || project.manager || '',
            teamMembers: project.teamMembers?.map(t => t._id || t) || [],
            clients: project.clients?.map(c => c._id || c) || [],
        });
        setAssignDialog({ open: true, project });
    };

    const handleAddMilestone = async () => {
        try {
            await projectService.createMilestone(addMilestoneDialog.project._id, milestoneForm);
            delete milestones[addMilestoneDialog.project._id];
            await loadMilestones(addMilestoneDialog.project._id);
            setAddMilestoneDialog({ open: false, project: null });
            setMilestoneForm({ title: '', description: '', deadline: '', status: 'pending' });
        } catch (err) { console.error('Add milestone failed:', err); }
    };

    /* derived stats ─────────────────────────────────────────────── */
    const active = projects.filter(p => ['active', 'in-progress'].includes(p.status?.toLowerCase())).length;
    const completed = projects.filter(p => p.status?.toLowerCase() === 'completed').length;
    const totalMembers = [...new Set(projects.flatMap(p => p.teamMembers?.map(t => t._id || t) || []))].length;
    const filtered = projects.filter(p => (p.title || p.name || '').toLowerCase().includes(searchQuery.toLowerCase()));

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={36} />
        </div>
    );

    return (
        <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-400">

            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Manager Dashboard</h1>
                    <p className="page-subtitle">
                        Welcome back, <span className="font-bold text-foreground">{user?.name}</span> — here's your project overview.
                    </p>
                </div>
                <Button onClick={() => navigate('/add-project')} className="gap-2 rounded-xl shadow-sm shadow-primary/20">
                    <Plus size={15} /> New Project
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Briefcase} label="Total Projects" value={projects.length} color="text-blue-500" bg="bg-blue-500/10" />
                <StatCard icon={Zap} label="Active" value={active} color="text-emerald-500" bg="bg-emerald-500/10" />
                <StatCard icon={CheckCircle2} label="Completed" value={completed} color="text-purple-500" bg="bg-purple-500/10" />
                <StatCard icon={Users} label="Team Members" value={totalMembers} color="text-orange-500" bg="bg-orange-500/10" />
            </div>

            {/* Project list */}
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
                        <FolderGit2 size={18} className="text-primary" /> My Projects
                    </h2>
                    <div className="relative w-60">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search projects…"
                            className="pl-8 h-9 rounded-xl bg-card text-sm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {filtered.length === 0 && (
                    <Card className="rounded-2xl border-dashed border-2 border-border/40">
                        <CardContent className="p-12 flex flex-col items-center gap-3 text-center">
                            <AlertCircle size={36} className="text-muted-foreground/30" />
                            <p className="font-semibold text-muted-foreground">No projects assigned to you yet.</p>
                            <Button onClick={() => navigate('/add-project')} variant="outline" size="sm" className="mt-1 gap-1 rounded-xl">
                                <Plus size={13} /> Create your first project
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-3">
                    {filtered.map(project => {
                        const progress = project.progress || 0;
                        const isExpanded = expandedProject === project._id;
                        const projectMilestones = milestones[project._id] || [];

                        return (
                            <Card key={project._id} className="rounded-2xl border-border/50 overflow-hidden hover:shadow-md transition-all duration-200">
                                <CardContent className="p-0">
                                    {/* Row */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
                                        {/* Thumb */}
                                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                            <img
                                                src={project.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400'}
                                                alt={project.title || project.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-bold text-sm">{project.title || project.name}</h3>
                                                <Badge className={`text-[10px] border ${statusBadge(project.status)}`}>{project.status || 'Pending'}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{project.description || 'No description.'}</p>
                                            {/* Progress bar */}
                                            <div className="mt-2 space-y-1">
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
                                                    <span>Progress</span>
                                                    <span className="text-primary">{progress}%</span>
                                                </div>
                                                <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs rounded-lg" onClick={() => openAssignDialog(project)}>
                                                <UserPlus size={12} /> Assign
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs rounded-lg" onClick={() => setAddMilestoneDialog({ open: true, project })}>
                                                <Milestone size={12} /> Milestone
                                            </Button>
                                            <Button size="sm" className="gap-1 h-8 text-xs rounded-lg" onClick={() => navigate(`/projects/${project._id}`)}>
                                                <ExternalLink size={12} /> Open
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg" onClick={() => toggleProject(project._id)}>
                                                {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Expanded milestones */}
                                    {isExpanded && (
                                        <div className="border-t border-border/40 bg-muted/20 px-5 py-4 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                                                <Milestone size={11} /> Milestones ({projectMilestones.length})
                                            </p>
                                            {projectMilestones.length === 0 ? (
                                                <p className="text-xs text-muted-foreground italic">No milestones yet.</p>
                                            ) : (
                                                <div className="space-y-1.5">
                                                    {projectMilestones.map(ms => (
                                                        <div key={ms._id} className="flex items-center justify-between bg-card border border-border/40 rounded-xl px-4 py-2.5">
                                                            <div className="flex items-center gap-2.5">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${ms.status === 'completed' ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`} />
                                                                <span className="text-sm font-semibold">{ms.title}</span>
                                                                {ms.deadline && (
                                                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                                        <Clock size={9} /> {new Date(ms.deadline).toLocaleDateString()}
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

            {/* ── Assign Dialog ─────────────────────────────────────────────── */}
            <Dialog open={assignDialog.open} onOpenChange={open => setAssignDialog(prev => ({ ...prev, open }))}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Assign Team — {assignDialog.project?.title || assignDialog.project?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-3">
                        {[
                            { label: 'Project Manager', key: 'manager', filter: u => u.role === 'admin' || u.role === 'manager', multi: false },
                        ].map(({ label, key, filter, multi }) => (
                            <div key={key} className="space-y-1.5">
                                <Label className="font-bold text-xs uppercase tracking-wider">{label}</Label>
                                <select
                                    className="auth-input"
                                    value={assignments[key]}
                                    onChange={e => setAssignments({ ...assignments, [key]: e.target.value })}
                                >
                                    <option value="">— Unassigned —</option>
                                    {allUsers.filter(filter).map(u => (
                                        <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {/* Developers */}
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Add Developer</Label>
                            <select
                                className="auth-input"
                                onChange={e => {
                                    if (e.target.value && !assignments.teamMembers.includes(e.target.value))
                                        setAssignments({ ...assignments, teamMembers: [...assignments.teamMembers, e.target.value] });
                                    e.target.value = '';
                                }}
                            >
                                <option value="">Select developer…</option>
                                {allUsers.filter(u => u.role === 'developer').map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {assignments.teamMembers.map(id => {
                                    const dev = allUsers.find(u => u._id === id);
                                    return dev ? (
                                        <Badge key={id} variant="secondary" className="cursor-pointer gap-1 rounded-lg"
                                            onClick={() => setAssignments({ ...assignments, teamMembers: assignments.teamMembers.filter(x => x !== id) })}>
                                            {dev.name} <X size={9} />
                                        </Badge>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        {/* Clients */}
                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Add Client</Label>
                            <select
                                className="auth-input"
                                onChange={e => {
                                    if (e.target.value && !assignments.clients.includes(e.target.value))
                                        setAssignments({ ...assignments, clients: [...assignments.clients, e.target.value] });
                                    e.target.value = '';
                                }}
                            >
                                <option value="">Select client…</option>
                                {allUsers.filter(u => u.role === 'client').map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {assignments.clients.map(id => {
                                    const cl = allUsers.find(u => u._id === id);
                                    return cl ? (
                                        <Badge key={id} className="bg-primary/10 text-primary cursor-pointer gap-1 rounded-lg"
                                            onClick={() => setAssignments({ ...assignments, clients: assignments.clients.filter(x => x !== id) })}>
                                            {cl.name} <X size={9} />
                                        </Badge>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        <Button onClick={handleAssignSave} className="w-full rounded-xl">Save Assignments</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Add Milestone Dialog ──────────────────────────────────────── */}
            <Dialog open={addMilestoneDialog.open} onOpenChange={open => setAddMilestoneDialog(prev => ({ ...prev, open }))}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Milestone — {addMilestoneDialog.project?.title || addMilestoneDialog.project?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-3">
                        {[
                            { label: 'Title', key: 'title', type: 'text', placeholder: 'Milestone title…' },
                            { label: 'Description', key: 'description', type: 'text', placeholder: 'Short description…' },
                            { label: 'Deadline', key: 'deadline', type: 'date', placeholder: '' },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key} className="space-y-1.5">
                                <Label className="font-bold text-xs uppercase tracking-wider">{label}</Label>
                                <input
                                    type={type}
                                    className="auth-input"
                                    placeholder={placeholder}
                                    value={milestoneForm[key]}
                                    onChange={e => setMilestoneForm({ ...milestoneForm, [key]: e.target.value })}
                                />
                            </div>
                        ))}

                        <div className="space-y-1.5">
                            <Label className="font-bold text-xs uppercase tracking-wider">Status</Label>
                            <select
                                className="auth-input"
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
