import React, { useState } from 'react'
import { Mail, Phone, Building2, ShieldCheck, Camera, Edit3, KeyRound, Eye, EyeOff } from 'lucide-react'
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

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-4xl px-6 py-10 transition-all duration-300">
      
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-indigo-500" size={24} />
            Profile Info
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal details and professional identity.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Edit3 size={16} className="mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <KeyRound className="text-indigo-500" size={20} />
                Security Update
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Update your account password to keep your profile secure.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="current" className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground">Current Password</Label>
                <Input id="current" type="password" placeholder="••••••••" className="rounded-xl bg-secondary/50 border-none focus-visible:ring-indigo-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new" className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground">New Password</Label>
                <div className="relative">
                  <Input 
                    id="new" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="rounded-xl bg-secondary/50 border-none focus-visible:ring-indigo-500 pr-10" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-indigo-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold py-6">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-12">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
          <Avatar className="h-32 w-32 border-2 border-border/50 relative z-10 bg-background shadow-sm">
            <AvatarImage src="https://i.pravatar.cc/150?u=alexrivera" alt="Alex Rivera" />
            <AvatarFallback className="bg-indigo-500 text-white text-2xl font-bold">AR</AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-0 right-0 rounded-full h-9 w-9 shadow-lg border-2 border-background z-20 hover:scale-110 transition-transform"
          >
            <Camera size={14} />
          </Button>
        </div>

        <div className="flex-1 pt-2">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-foreground tracking-tighter mb-2">
              Alex Rivera
            </h2>
            <Badge className="bg-indigo-500/10 text-indigo-500 border-none px-3 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-widest mb-4">
              Super Admin
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <Phone size={16} className="text-indigo-500/70" />
              <span className="text-sm font-medium">+1 (555) 000-1234</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-border/40">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </p>
              <p className="text-sm font-semibold text-foreground">
                alex.rivera@switch2itech.com
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Building2 size={12} /> Organization
              </p>
              <p className="text-sm font-semibold text-foreground">
                Switch2itech Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile