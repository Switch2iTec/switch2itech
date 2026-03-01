import React, { useState } from 'react'
import {
  Mail, Phone, Building2, ShieldCheck, Camera,
  KeyRound, Eye, EyeOff, Code2, Globe,
  Terminal, Cpu, HardDrive, Database, Edit3
} from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent } from "../../components/ui/card"

const techStack = ["React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"]

const AdminProfile = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8 animate-in fade-in duration-400">

      {/* Header */}
      <div className="page-header mb-10">
        <div>
          <h1 className="page-title flex items-center gap-2.5">
            <Terminal size={24} className="text-primary" /> Developer Console
          </h1>
          <p className="page-subtitle">
            Root Access: <span className="font-mono text-primary">system_admin_v2.0</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-xl">
            <Globe size={15} /> Portfolio
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-xl shadow-sm shadow-primary/20">
                <Edit3 size={14} /> Configure Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <KeyRound size={18} className="text-primary" /> Access Credentials
                </DialogTitle>
                <DialogDescription>Modify your system password and access keys.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">New Security Key</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pr-10" />
                    <button onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full rounded-xl">Update Credentials</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl">

        {/* Left: Identity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            <Avatar className="h-36 w-36 border-4 border-card relative z-10 shadow-xl rounded-2xl">
              <AvatarImage src="https://i.pravatar.cc/150?u=devadmin" className="rounded-2xl object-cover" />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-black rounded-2xl">AR</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary"
              className="absolute bottom-0 right-0 lg:right-auto lg:left-24 rounded-full h-9 w-9 shadow-md border-2 border-card z-20 hover:scale-110 transition-transform">
              <Camera size={14} />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Alex Rivera</h2>
              <p className="text-primary font-mono text-sm font-bold mt-0.5">Senior Full Stack Architect</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" className="text-[9px] font-black uppercase px-2.5">Node Optimized</Badge>
              <Badge className="text-[9px] font-black uppercase px-2.5 bg-blue-500/10 text-blue-600 border-blue-500/20">AWS Certified</Badge>
            </div>
            <div className="space-y-2.5 pt-4 border-t border-border/40">
              {[
                { icon: Globe, label: "rivera.dev" },
                { icon: Mail, label: "alex.rivera@switch2itech.com" },
                { icon: Building2, label: "Switch2itech HQ" },
                { icon: Phone, label: "+1 (555) 012-3456" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-default group">
                  <Icon size={15} className="group-hover:text-primary transition-colors" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Stats & Stack */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Deployments", val: "1,240", icon: Cpu },
              { label: "Server Uptime", val: "99.9%", icon: HardDrive },
              { label: "DB Clusters", val: "14", icon: Database },
            ].map((item, i) => (
              <div key={i} className="stat-card text-center flex flex-col items-center gap-2 py-5">
                <div className="p-2.5 bg-primary/10 rounded-xl"><item.icon size={18} className="text-primary" /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                <span className="text-2xl font-extrabold">{item.val}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
                <Code2 size={12} className="text-primary" /> Core Technology Stack
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {techStack.map(tech => (
                  <div key={tech} className="px-4 py-3 rounded-xl bg-secondary/40 border border-border/40 flex items-center justify-between hover:border-primary/30 transition-colors group">
                    <span className="text-sm font-bold">{tech}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clearance panel */}
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                <ShieldCheck size={15} className="text-primary" /> Security Clearance
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Authorized for production environment deployment, database migration, and high-level infrastructure configuration. Last system audit performed 14 hours ago.
              </p>
            </div>
            <Terminal className="absolute -bottom-4 -right-4 text-primary/5 h-24 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile