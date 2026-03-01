import React from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { MoreHorizontal } from 'lucide-react'

const PROJECTS = [
  {
    name: 'Enterprise CRM Revamp',
    client: 'Global Tech Solutions',
    ref: '#1002',
    priority: { label: 'High', color: 'text-red-600 bg-red-500/10 border-red-500/20' },
    status: { label: 'In Progress', dot: 'bg-primary animate-pulse' },
    deadline: 'Oct 12, 2023',
    team: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
    ],
    extra: '+3',
  },
  {
    name: 'Cloud Migration Phase 2',
    client: 'Nexus Logistics',
    ref: '#1003',
    priority: { label: 'Medium', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20' },
    status: { label: 'Planning', dot: 'bg-emerald-500' },
    deadline: 'Nov 05, 2023',
    team: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    ],
    extra: null,
  },
]

const Bottom = () => (
  <Card className="rounded-2xl border-border/50 bg-card shadow-sm overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between px-7 py-5 border-b border-border/40">
      <div>
        <h2 className="text-base font-extrabold tracking-tight">Project Pipeline</h2>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mt-0.5">Active Engagements</p>
      </div>
      <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold border-border/60 hover:bg-secondary">
        View Repository
      </Button>
    </CardHeader>

    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground/50 border-b border-border/30">
              <th className="px-7 py-3.5">Project</th>
              <th className="px-5 py-3.5">Stakeholder</th>
              <th className="px-5 py-3.5">Urgency</th>
              <th className="px-5 py-3.5">Phase</th>
              <th className="px-5 py-3.5">Target Date</th>
              <th className="px-5 py-3.5 text-center">Team</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {PROJECTS.map((project, index) => (
              <tr key={index} className="group hover:bg-secondary/20 transition-colors duration-150">
                {/* Project name */}
                <td className="px-7 py-5">
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{project.name}</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">{project.ref}</p>
                </td>

                {/* Client */}
                <td className="px-5 py-5">
                  <span className="text-sm font-semibold text-muted-foreground">{project.client}</span>
                </td>

                {/* Priority */}
                <td className="px-5 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-tight px-2.5 py-1 rounded-lg border ${project.priority.color}`}>
                    {project.priority.label}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${project.status.dot}`} />
                    <span className="text-sm font-semibold">{project.status.label}</span>
                  </div>
                </td>

                {/* Deadline */}
                <td className="px-5 py-5">
                  <span className="text-sm text-muted-foreground font-medium">{project.deadline}</span>
                </td>

                {/* Team avatars */}
                <td className="px-5 py-5">
                  <div className="flex items-center justify-center -space-x-2">
                    {project.team.map((img, i) => (
                      <Avatar key={i} className="w-8 h-8 border-2 border-card">
                        <AvatarImage src={img} alt="member" className="object-cover" />
                        <AvatarFallback className="text-[9px] font-black">US</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.extra && (
                      <div className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[9px] font-black text-muted-foreground">
                        {project.extra}
                      </div>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-5 text-right">
                  <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 hover:bg-primary/10 hover:text-primary">
                    <MoreHorizontal size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
)

export default Bottom