import React, { useState, useEffect } from 'react'
import {
  TrendingUp, Users, Briefcase, DollarSign,
  ArrowUpRight, ArrowDownRight, Activity, Download, Zap
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { dummyData } from '../../utility/dumydata'
import { useAuth } from '../../context/ContextProvider'
import projectService from '../../api/projectService'

const ICON_MAP = {
  'Total Projects': Briefcase,
  'Active Projects': Activity,
  'Completed': TrendingUp,
  'Revenue': DollarSign,
}

const chartData = [
  { name: 'Jan', revenue: 4000, projects: 24 },
  { name: 'Feb', revenue: 3000, projects: 18 },
  { name: 'Mar', revenue: 5000, projects: 29 },
  { name: 'Apr', revenue: 4500, projects: 25 },
  { name: 'May', revenue: 6000, projects: 32 },
  { name: 'Jun', revenue: 5500, projects: 30 },
]

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  borderRadius: '12px',
  border: '1px solid hsl(var(--border))',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
}

const Analytics = () => {
  const { user, role } = useAuth()
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState({ projectsCount: 0, revenue: 0, activeProjects: 0, completedProjects: 0 })

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        setLoading(true)
        const res = await projectService.getAllProjects()
        const all = res.data?.data || []
        let filtered = []
        if (role === 'admin') filtered = all
        else if (role === 'manager') filtered = all.filter(p => p.manager?._id === user?._id || p.manager === user?._id)
        else if (role === 'developer') filtered = all.filter(p => p.teamMembers?.some(m => m._id === user?._id || m === user?._id))
        else if (role === 'client') filtered = all.filter(p => p.clients?.some(c => c._id === user?._id || c === user?._id))
        setMetrics({
          projectsCount: filtered.length,
          revenue: filtered.reduce((s, p) => s + (p.budget || 0), 0),
          activeProjects: filtered.filter(p => p.status === 'active').length,
          completedProjects: filtered.filter(p => p.status === 'completed').length,
        })
      } catch (err) {
        console.error('Failed to fetch analytics data:', err)
      } finally {
        setLoading(false)
      }
    }
    if (user && role) fetchRoleData()
  }, [user, role])

  const displayStats = [
    { label: 'Total Projects', value: metrics.projectsCount, change: '+12%', trend: 'up' },
    { label: 'Active Projects', value: metrics.activeProjects, change: '+5%', trend: 'up' },
    { label: 'Completed', value: metrics.completedProjects, change: 'Steady', trend: 'up' },
    { label: 'Revenue', value: `$${metrics.revenue.toLocaleString()}`, change: '+18%', trend: 'up' },
  ]

  return (
    <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-400">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Your'} Analytics
          </h1>
          <p className="page-subtitle">Insights for your assigned portfolio</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2 font-bold">
          <Download size={15} /> Download Report
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayStats.map((stat) => {
          const Icon = ICON_MAP[stat.label] || Activity
          const isUp = stat.trend === 'up'
          return (
            <div key={stat.label} className="stat-card">
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                  {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-extrabold mt-1 tracking-tight">
                {loading ? '···' : stat.value}
              </h3>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <Card className="rounded-2xl border-border/50">
          <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
            <div>
              <CardTitle className="text-base font-extrabold">Revenue Overview</CardTitle>
              <CardDescription className="text-xs">Monthly earnings breakdown</CardDescription>
            </div>
            <select className="bg-secondary text-xs font-bold py-1.5 px-3 rounded-xl outline-none text-muted-foreground border border-border/50">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: 'hsl(var(--foreground))' }} labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project velocity chart */}
        <Card className="rounded-2xl border-border/50">
          <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
            <div>
              <CardTitle className="text-base font-extrabold">Project Velocity</CardTitle>
              <CardDescription className="text-xs">Performance trends for active projects</CardDescription>
            </div>
            <Button variant="link" className="text-primary text-xs font-bold h-auto p-0">View Details</Button>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} contentStyle={tooltipStyle} itemStyle={{ color: 'hsl(var(--foreground))' }} labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                  <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <Card className="rounded-2xl border-border/50">
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            <CardTitle className="text-base font-extrabold">Secondary Metrics</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(dummyData?.analytics || []).slice(6, 11).map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-secondary/40 border border-border/40 hover:border-primary/30 transition-colors">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{stat.label}</p>
                <p className="text-xl font-extrabold mt-1">{stat.value}</p>
                <p className={`text-[10px] font-bold mt-1 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>{stat.change}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics