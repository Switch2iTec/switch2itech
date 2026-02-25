import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Search, Plus, Code, ExternalLink, Loader2, 
  TrendingUp, BarChart3, Layers, 
  Globe, ShieldCheck, Zap, Target, Users, LayoutGrid, ArrowLeft,
  Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import Addproject from '../Addproject/Addproject';

const DUMMY_DATA = [
  { 
    _id: "1", 
    name: "Nexus Cloud Infrastructure", 
    category: "DevOps", 
    desc: "Enterprise-level automation for cloud management.", 
    clients: "Global Tech Corp", 
    progress: 95, 
    status: "Completed",
    imageUrl: "https://i.pinimg.com/736x/38/f2/e4/38f2e4e6e6529b0943676a50bbc8c3f5.jpg" 
  },
  { 
    _id: "2", 
    name: "FinFlow Mobile Wallet", 
    category: "FinTech", 
    desc: "Next-gen wallet with biometric security.", 
    clients: "Silverline Banking", 
    progress: 88, 
    status: "Review",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    _id: "3", 
    name: "Aether AI Engine", 
    category: "AI", 
    desc: "Predictive analytics engine processing multi-terabyte datasets.", 
    clients: "RetailHub Global", 
    progress: 62, 
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    _id: "4", 
    name: "Sentinel Security Suite", 
    category: "Cyber", 
    desc: "Real-time threat detection system with AI anomaly identification.", 
    clients: "Defense Systems Ltd", 
    progress: 45, 
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  }
];

const Projects = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("list");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const finalData = (response.data?.length > 0 ? response.data : DUMMY_DATA).map(p => ({
          ...p,
          imageUrl: p.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"
        }));
        setProducts(finalData);
      } catch (error) {
        setProducts(DUMMY_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const stats = [
    { label: "Completed", count: 24, icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active", count: 12, icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "In Review", count: 5, icon: Target, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const filteredProjects = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.clients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  if (currentView === "add") {
    return (
      <div className="min-h-screen bg-background p-6 lg:p-10 space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Create Asset</h1>
            <p className="text-muted-foreground">Provision a new project repository to the ecosystem.</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentView("list")} className="gap-2 rounded-xl">
            <ArrowLeft size={16} /> Cancel & Return
          </Button>
        </div>
        <Addproject />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto transition-colors duration-300">
      
      {/* 1. Header & KPI Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Project Overview</h1>
          <p className="text-muted-foreground">Synchronized delivery metrics and client success assets.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-2 flex items-center gap-3 border-r last:border-0 border-border/50">
                <s.icon size={18} className={s.color} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground leading-none">{s.label}</span>
                  <span className="text-lg font-bold leading-none mt-1">{s.count}</span>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => setCurrentView("add")} className="h-12 px-6 rounded-xl font-semibold gap-2 shadow-lg shadow-primary/20">
            <Plus size={18} /> New Project
          </Button>
        </div>
      </div>

      {/* 2. STRATEGIC CLIENTS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Building2 size={18} className="text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Strategic Clients</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {[...new Set(products.map(p => p.clients))].map((client, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 px-6 py-4 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:bg-secondary/10 transition-all duration-300 cursor-default group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                {client.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">{client}</span>
                <span className="text-[10px] text-emerald-500 font-medium">Verified Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Filter repositories..." 
                className="pl-9 h-10 rounded-lg bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><LayoutGrid size={16}/></Button>
              <Button variant="ghost" size="icon"><Layers size={16}/></Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="group overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img 
                    src={project.imageUrl} 
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/60 backdrop-blur-md text-white border-none uppercase text-[9px]">
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Code size={20} />
                    </div>
                    <Badge variant="secondary" className="font-semibold text-[10px] uppercase">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg pt-4">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.desc}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="text-muted-foreground">Velocity</span>
                      <span className="text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-700" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                       <Globe size={14} /> {project.clients}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold gap-2">
                      Asset <ExternalLink size={12} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SIDEBAR SECTIONS */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" /> Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-secondary/30 border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Growth Rate</span>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none text-[10px]">+14.2%</Badge>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/40 rounded-t-sm transition-colors hover:bg-primary" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[{ label: "Deployment Speed", val: "94%" }, { label: "Code Coverage", val: "88%" }].map((m, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {m.val} <TrendingUp size={14} className="text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Users size={20} className="text-primary" /> Active Stakeholders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {products.slice(0, 4).map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-primary border">
                        {p.clients.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none">{p.clients}</span>
                        <span className="text-[10px] text-muted-foreground mt-1">Status: {p.status}</span>
                      </div>
                    </div>
                    <Badge variant={p.status === 'Completed' ? 'default' : 'outline'} className="text-[9px]">
                      {p.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;