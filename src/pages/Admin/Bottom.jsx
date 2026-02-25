import React from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { MoreHorizontal, ExternalLink } from 'lucide-react'

const Bottom = () => {
  const projects = [
    {
      name: 'Enterprise CRM Revamp',
      client: 'Global Tech Solutions',
      priority: { label: 'High', color: 'text-red-600 bg-red-500/10 border-red-500/20' },
      status: { label: 'In progress', color: 'bg-blue-600' },
      deadline: 'Oct 12, 2023',
      team: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop'
      ],
      extra: '+3'
    },
    {
      name: 'Cloud Migration Phase 2',
      client: 'Nexus Logistics',
      priority: { label: 'Medium', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20' },
      status: { label: 'Planning', color: 'bg-emerald-600' },
      deadline: 'Nov 05, 2023',
      team: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      ],
      extra: null
    }
  ]

  return (
    <Card className="rounded-[2.5rem] border-none bg-card/50 backdrop-blur-sm shadow-xl shadow-blue-500/5 overflow-hidden mt-8">
      <CardHeader className="flex flex-row items-center justify-between px-10 py-8">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-foreground">Project Pipeline</h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Engagements</p>
        </div>
        <Button variant="outline" className="rounded-xl font-bold text-xs border-border/60 hover:bg-muted transition-all">
          View Repository
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground/60 text-[10px] uppercase tracking-[0.2em]">
                <th className="px-6 py-4 font-black">Project Details</th>
                <th className="px-6 py-4 font-black">Stakeholder</th>
                <th className="px-6 py-4 font-black">Urgency</th>
                <th className="px-6 py-4 font-black">Current Phase</th>
                <th className="px-6 py-4 font-black">Target Date</th>
                <th className="px-6 py-4 font-black text-center">Resources</th>
                <th className="px-6 py-4 font-black"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.map((project, index) => (
                <tr key={index} className="group hover:bg-blue-500/[0.02] transition-all duration-200">
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-foreground group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground/70 font-medium">Internal Ref: #{1002 + index}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-bold text-muted-foreground">{project.client}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[10px] font-black uppercase tracking-tighter px-2.5 py-1 rounded-lg border ${project.priority.color}`}>
                      {project.priority.label}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${project.status.color} shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse`} />
                      <span className="text-sm font-bold text-foreground">{project.status.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-bold text-muted-foreground italic">{project.deadline}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-center -space-x-2.5">
                      {project.team.map((img, i) => (
                        <Avatar key={i} className="w-9 h-9 border-[3px] border-card group-hover:border-blue-50/50 transition-colors">
                          <AvatarImage src={img} alt="member" className="object-cover" />
                          <AvatarFallback className="text-[10px] font-black">US</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.extra && (
                        <div className="w-9 h-9 rounded-full bg-secondary border-[3px] border-card flex items-center justify-center text-[10px] font-black text-muted-foreground shadow-sm">
                          {project.extra}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-500/10 hover:text-blue-600">
                      <MoreHorizontal size={18} />
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
}

export default Bottom