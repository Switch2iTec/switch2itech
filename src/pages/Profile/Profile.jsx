import React, { useState, useEffect } from "react"
import authService from "../../api/authService"
import {
  Mail, Phone, Building2, ShieldCheck, Camera,
  KeyRound, Eye, EyeOff, Loader2, CheckCircle,
  Clock, Briefcase, Award, MapPin, User
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

const ROLE_COLOR = {
  admin: 'bg-red-500/10 text-red-600 border-red-500/25',
  manager: 'bg-blue-500/10 text-blue-600 border-blue-500/25',
  developer: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25',
  client: 'bg-amber-500/10 text-amber-600 border-amber-500/25',
  user: 'bg-secondary text-muted-foreground border-border',
}

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="space-y-1.5">
    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
      <Icon size={11} className="text-primary" /> {label}
    </p>
    <p className="text-sm font-semibold text-foreground">{value || 'Not specified'}</p>
  </div>
)

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getCurrentUser()
        if (response.data.status === "success") setUser(response.data.data)
      } catch (err) {
        console.error("Profile fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])          // NOTE: removed [user] dep to prevent infinite loop

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={36} />
    </div>
  )

  if (!user) return (
    <div className="h-[60vh] flex items-center justify-center text-muted-foreground text-sm">
      User not found. Please log in again.
    </div>
  )

  const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "??"

  return (
    <div className="min-h-screen bg-background p-8 animate-in fade-in duration-400">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <ShieldCheck size={26} className="text-primary" /> Account Overview
          </h1>
          <p className="page-subtitle">
            Logged in as <span className="font-bold text-foreground">{user.role}</span>
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl shadow-sm shadow-primary/20">
              <KeyRound size={15} /> Reset Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Update Security</DialogTitle>
              <DialogDescription>Change your password to keep your account secure.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  New Password
                </Label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="auth-input pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full rounded-xl">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl space-y-6">

        {/* Hero banner */}
        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-28 bg-gradient-to-r from-primary/80 to-blue-600 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L3N2Zz4=')]" />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar overlapping banner */}
            <div className="relative flex items-end -mt-14 mb-5">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-card shadow-lg bg-card">
                  <AvatarImage src={user.profile} alt={user.name} className="object-cover" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0.5 right-0.5 h-7 w-7 bg-card border border-border rounded-full flex items-center justify-center shadow hover:bg-secondary transition-colors">
                  <Camera size={12} className="text-muted-foreground" />
                </button>
                {/* Online dot */}
                <span className="absolute top-1 right-1 h-3 w-3 bg-emerald-500 border-2 border-card rounded-full" />
              </div>
            </div>

            {/* Name + badges */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold tracking-tight">{user.name}</h2>
                  {user.isVerified && (
                    <CheckCircle size={18} className="text-primary fill-primary/10" title="Verified account" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`border rounded-lg text-[10px] font-black uppercase px-2.5 py-1 ${ROLE_COLOR[user.role] || ROLE_COLOR.user}`}>
                    {user.role}
                  </Badge>
                  {user.lastLogin && (
                    <Badge variant="outline" className="text-[10px] font-medium flex items-center gap-1 rounded-lg px-2.5 py-1">
                      <Clock size={9} /> Last login: {new Date(user.lastLogin).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="rounded-2xl border border-border/50 bg-card p-7">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground/60 mb-6 flex items-center gap-2">
            <User size={13} className="text-primary" /> Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <InfoRow icon={Mail} label="Email Address" value={user.email} />
            <InfoRow icon={Building2} label="Organization" value={user.company} />
            <InfoRow icon={Phone} label="Phone Number" value={user.phoneNo} />
            <InfoRow icon={MapPin} label="Address" value={user.address} />
            <InfoRow icon={Briefcase} label="Assigned Projects"
              value={user.assignedProjects?.length > 0 ? `${user.assignedProjects.length} Active Projects` : 'None yet'} />
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
                <Award size={11} className="text-primary" /> Expertise
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {user.skills?.length > 0 ? user.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg border border-primary/20">
                    {skill}
                  </span>
                )) : (
                  <span className="text-sm font-semibold text-muted-foreground">General Staff</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
