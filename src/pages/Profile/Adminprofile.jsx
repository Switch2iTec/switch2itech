import React, { useState } from 'react'
import { 
  Mail, Phone, Building2, ShieldCheck, Camera, Edit3, 
  KeyRound, Eye, EyeOff, Code2, Github, Globe, 
  Terminal, Cpu, HardDrive, Database 
} from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent } from "../../components/ui/card"

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false)

  const techStack = ["React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"];

  return (
    <div className="max-w-5xl px-6 py-10 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8 border-border/40">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <Terminal className="text-indigo-500" size={28} />
            Developer Console
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            Root Access: <span className="text-emerald-500 font-mono">system_admin_v2.0</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-indigo-500/20 text-indigo-500 hover:bg-indigo-50">
            <Github size={18} className="mr-2" /> GitHub
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 shadow-xl shadow-indigo-500/20"
              >
                <Edit3 size={16} className="mr-2" />
                Configure Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <KeyRound className="text-indigo-500" size={20} />
                  Access Credentials
                </DialogTitle>
                <DialogDescription>
                  Modify system password and SSH keys.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Current Password</Label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl bg-muted/50 border-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">New Security Key</Label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="rounded-xl bg-muted/50 border-none pr-10" 
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-indigo-500"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full rounded-xl bg-indigo-600 font-bold py-6">Update Credentials</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: IDENTITY */}
        <div className="lg:col-span-4 space-y-8">
          <div className="relative flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
            <Avatar className="h-40 w-40 border-4 border-background relative z-10 shadow-2xl">
              <AvatarImage src="https://i.pravatar.cc/150?u=devadmin" />
              <AvatarFallback className="bg-indigo-600 text-white text-4xl font-black">AR</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute bottom-2 right-2 lg:right-auto lg:left-32 rounded-full h-10 w-10 shadow-lg border-2 border-background z-20 hover:scale-110 transition-transform"
            >
              <Camera size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-black tracking-tighter">Alex Rivera</h2>
              <p className="text-indigo-500 font-mono text-sm font-bold">Senior Full Stack Architect</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold uppercase text-[9px]">Node Optimized</Badge>
              <Badge className="bg-blue-500/10 text-blue-600 border-none font-bold uppercase text-[9px]">AWS Certified</Badge>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex items-center gap-3 text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                <Globe size={18} className="group-hover:text-indigo-500" />
                <span className="text-sm font-semibold">rivera.dev</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} />
                <span className="text-sm font-semibold">alex.rivera@switch2itech.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Building2 size={18} />
                <span className="text-sm font-semibold">Switch2itech HQ</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DEV STATS & STACK */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SYSTEM SUMMARY CARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Builds Deployment", val: "1,240", icon: Cpu },
              { label: "Server Uptime", val: "99.9%", icon: HardDrive },
              { label: "DB Clusters", val: "14", icon: Database },
            ].map((item, i) => (
              <Card key={i} className="bg-muted/30 border-none">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <item.icon className="text-indigo-500 mb-2" size={20} />
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</span>
                  <span className="text-xl font-bold">{item.val}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TECH STACK */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <Code2 size={14} className="text-indigo-500" /> Core Technology Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techStack.map((tech) => (
                <div key={tech} className="p-3 rounded-xl bg-card border border-border/50 flex items-center justify-between group hover:border-indigo-500/50 transition-all">
                  <span className="text-sm font-bold text-foreground/80">{tech}</span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
              ))}
            </div>
          </div>

          {/* BIO / REPO ACTIVITY */}
          <div className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                <ShieldCheck size={16} className="text-indigo-500" /> Security Clearance
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                Authorized for production environment deployment, database migration, and high-level infrastructure configuration. Last system audit performed 14 hours ago.
              </p>
            </div>
            <Terminal className="absolute -bottom-4 -right-4 text-indigo-500/5 h-24 w-24" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile