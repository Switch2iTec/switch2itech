import React from 'react'
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Activity,
  Zap
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { dummyData } from '../../utility/dumydata'

const StatCard = ({ title, value, change, icon: Icon, trend }) => {
  const isUp = trend === 'up';
  return (
    <Card className="rounded-3xl border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-muted rounded-2xl">
            <Icon size={24} className="text-primary" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

const Analytics = () => {
  const iconMap = {
    "Page Views": Activity,
    "Bounce Rate": Zap,
    "Conversion": TrendingUp,
    "Active Users": Users,
    "Revenue": DollarSign,
    "Avg. Session": Activity
  };

  const chartData = [
    { name: 'Jan', revenue: 4000, projects: 24 },
    { name: 'Feb', revenue: 3000, projects: 18 },
    { name: 'Mar', revenue: 5000, projects: 29 },
    { name: 'Apr', revenue: 4500, projects: 25 },
    { name: 'May', revenue: 6000, projects: 32 },
    { name: 'Jun', revenue: 5500, projects: 30 },
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] no-scrollbar bg-background transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Displaying insights for {dummyData.analytics.length} key metrics.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl border-border bg-card">
          Download Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyData.analytics.slice(0, 4).map((stat) => (
          <StatCard 
            key={stat.id}
            title={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={iconMap[stat.label] || Activity}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[32px] border-border bg-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">Revenue Overview</CardTitle>
              <CardDescription>Monthly breakdown of earnings.</CardDescription>
            </div>
            <select className="bg-muted text-xs font-bold p-2 rounded-lg outline-none text-muted-foreground border-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderRadius: '16px',
                      border: '1px solid hsl(var(--border))',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-border bg-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">Project Velocity</CardTitle>
              <CardDescription>Performance trends for {dummyData.projects.length} total projects.</CardDescription>
            </div>
            <Button variant="link" className="text-primary text-xs font-bold hover:underline h-auto p-0">View Details</Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderRadius: '16px',
                      border: '1px solid hsl(var(--border))'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3 rounded-3xl border-border bg-card p-6">
          <h4 className="font-bold mb-4">Secondary Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {dummyData.analytics.slice(6, 11).map((stat) => (
               <div key={stat.id} className="p-4 rounded-2xl bg-muted/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className={`text-[10px] ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.change}</p>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Analytics