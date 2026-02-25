import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Users, UserCheck, UserPlus, Search, 
  Trash2, Edit, MessageSquare, Shield, 
  MoreHorizontal, Mail, MapPin, Star,
  CheckCircle2, XCircle, Filter, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

const MOCK_USERS = [
  {
    _id: "u1",
    name: "Alexander Wright",
    email: "alex.w@globaltech.com",
    role: "Premium Client",
    status: "Active",
    location: "San Francisco, US",
    joinedDate: "2025-08-12",
    testimonial: "The cloud infrastructure transition was seamless. Exceptional support.",
    avatar: "https://i.pravatar.cc/150?u=u1"
  },
  {
    _id: "u2",
    name: "Sarah Jenkins",
    email: "s.jenkins@finflow.io",
    role: "Standard User",
    status: "Inactive",
    location: "London, UK",
    joinedDate: "2025-11-05",
    testimonial: null,
    avatar: "https://i.pravatar.cc/150?u=u2"
  },
  {
    _id: "u3",
    name: "Michael Chen",
    email: "m.chen@aether.ai",
    role: "Admin",
    status: "Active",
    location: "Singapore",
    joinedDate: "2024-03-20",
    testimonial: "Scalability is no longer a concern for our AI models thanks to this tool.",
    avatar: "https://i.pravatar.cc/150?u=u3"
  }
];

const Clientspage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data?.length > 0 ? res.data : MOCK_USERS);
      } catch (err) {
        setUsers(MOCK_USERS);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const stats = [
    { label: "Total Accounts", value: users.length, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Now", value: users.filter(u => u.status === 'Active').length, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Verified Reviews", value: users.filter(u => u.testimonial).length, icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Security Alerts", value: "0", icon: Shield, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-background min-h-screen animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Client Relations</h1>
          <p className="text-muted-foreground font-medium">Manage user identities, access levels, and public testimonials.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 h-11"><Download size={18} /> Export List</Button>
          <Button className="rounded-xl gap-2 h-11 shadow-lg shadow-primary/20"><UserPlus size={18} /> Invite Client</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/40 bg-card/50">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* USER MANAGEMENT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
              <div>
                <CardTitle className="text-xl">User Directory</CardTitle>
                <CardDescription>Authentication and permission controls</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Filter by name/email..." 
                  className="pl-9 h-10 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border/50 text-[11px] font-black uppercase text-muted-foreground">
                      <th className="p-5">User Profile</th>
                      <th className="p-5">Access Level</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-muted/20 transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <img src={user.avatar} className="h-10 w-10 rounded-full border bg-muted" alt="" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-foreground">{user.name}</span>
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Mail size={10} /> {user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="text-xs font-semibold text-muted-foreground">{user.role}</span>
                        </td>
                        <td className="p-5">
                          <Badge className={`rounded-lg px-2 text-[10px] uppercase font-bold ${
                            user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                          }`}>
                            {user.status === 'Active' ? <CheckCircle2 size={10} className="mr-1" /> : <XCircle size={10} className="mr-1" />}
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-blue-50"><Edit size={16} /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50"><Trash2 size={16} /></Button>
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

        {/* TESTIMONIALS MANAGEMENT SECTION */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm sticky top-10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Public Feedback</CardTitle>
                  <CardDescription>Verified client testimonials</CardDescription>
                </div>
                <Badge variant="outline" className="bg-amber-500/5 text-amber-600 border-amber-500/20"><Star size={12} className="mr-1 fill-amber-600" /> 4.9</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.filter(u => u.testimonial).map((u, i) => (
                <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-border/40 relative group">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={u.avatar} className="h-8 w-8 rounded-full" alt="" />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold">{u.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{u.role}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic leading-relaxed">"{u.testimonial}"</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <Badge className="text-[9px] bg-primary/10 text-primary border-none">Published</Badge>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" className="h-7 text-[10px] font-bold">Unpublish</Button>
                       <Button variant="ghost" className="h-7 text-[10px] font-bold text-rose-500">Hide</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Clientspage;