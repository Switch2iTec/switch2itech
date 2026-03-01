import React, { useState, useEffect } from "react"
import userService from "../../api/userService"
import {
  Users, UserCheck, UserPlus, Search,
  Trash2, Edit, Shield, Mail, CheckCircle2, XCircle, Download, Check
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"

const ROLES = ["user", "admin", "client", "developer", "manager"]

const MOCK_USERS = [
  { _id: "u1", name: "Alexander Wright", email: "alex.w@globaltech.com", role: "client", status: "Active", avatar: "https://i.pravatar.cc/150?u=u1" },
  { _id: "u2", name: "Sarah Jenkins", email: "s.jenkins@finflow.io", role: "user", status: "Inactive", avatar: "https://i.pravatar.cc/150?u=u2" },
  { _id: "u3", name: "Michael Chen", email: "m.chen@aether.ai", role: "admin", status: "Active", avatar: "https://i.pravatar.cc/150?u=u3" },
  { _id: "u4", name: "Priya Nair", email: "p.nair@devhub.in", role: "developer", status: "Active", avatar: "https://i.pravatar.cc/150?u=u4" },
]

const ROLE_BADGE = {
  admin: "bg-red-500/10 text-red-600 border-red-500/20",
  manager: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  developer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  client: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  user: "bg-secondary text-muted-foreground border-border",
}

const Userspage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingRole, setEditingRole] = useState(null)
  const [newRole, setNewRole] = useState("")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await userService.getUsers()
      setUsers(res.data?.data?.length >= 0 ? res.data.data : MOCK_USERS)
    } catch {
      setUsers(MOCK_USERS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleRoleUpdate = async (userId) => {
    try {
      await userService.updateUserRole(userId, newRole)
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u))
      setEditingRole(null)
    } catch {
      console.error("Failed to update user role")
    }
  }

  const stats = [
    { label: "Total Accounts", value: users.length, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Admins", value: users.filter(u => u.role === "admin").length, icon: Shield, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Developers", value: users.filter(u => u.role === "developer").length, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Clients", value: users.filter(u => u.role === "client").length, icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-400">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage identities and access levels across the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2"><Download size={15} /> Export</Button>
          <Button className="rounded-xl gap-2 shadow-sm shadow-primary/20"><UserPlus size={15} /> Invite User</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="stat-card flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.bg} shrink-0`}><s.icon size={19} className={s.color} /></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <h3 className="text-2xl font-extrabold tracking-tight mt-0.5">{loading ? "···" : s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* User Table */}
      <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border/40">
          <div>
            <CardTitle className="text-base font-extrabold">User Directory</CardTitle>
            <CardDescription className="text-xs">Authentication and permission controls</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <Input
              placeholder="Search by name or email…"
              className="pl-9 h-9 rounded-xl text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/30 border-b border-border/40 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground/60">
                  <th className="px-6 py-4">User Profile</th>
                  <th className="px-6 py-4">Access Level</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filtered.map(user => (
                  <tr key={user._id} className="group hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <img src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`} className="h-9 w-9 rounded-xl border border-border object-cover" alt="" />
                        <div>
                          <p className="font-bold text-sm">{user.name}</p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Mail size={9} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {editingRole === user._id ? (
                        <div className="flex items-center gap-2">
                          <select className="h-8 rounded-lg border border-border bg-background px-2 text-xs" value={newRole} onChange={e => setNewRole(e.target.value)}>
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-500/10" onClick={() => handleRoleUpdate(user._id)}>
                            <Check size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10" onClick={() => setEditingRole(null)}>
                            <XCircle size={14} />
                          </Button>
                        </div>
                      ) : (
                        <Badge className={`border rounded-lg text-[10px] font-black uppercase px-2.5 py-1 ${ROLE_BADGE[user.role] || ROLE_BADGE.user}`}>
                          {user.role}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`border rounded-lg text-[10px] font-black uppercase px-2.5 py-1 flex items-center w-fit gap-1 ${user.status?.toLowerCase() === "inactive" ? "bg-red-500/10 text-red-600 border-red-500/20" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}`}>
                        {user.status?.toLowerCase() === "inactive" ? <XCircle size={9} /> : <CheckCircle2 size={9} />}
                        {user.status || "Active"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                          onClick={() => { setEditingRole(user._id); setNewRole(user.role) }}>
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-500/10 hover:text-red-500">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Userspage