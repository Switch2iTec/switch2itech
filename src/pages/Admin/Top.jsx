import React, { useState, useEffect } from "react";
import projectService from "../../api/projectService";
import productService from "../../api/productService";
import userService from "../../api/userService";
import testimonialService from "../../api/testimonialService";
import {
  Monitor, Package, Users, Star,
  CircleDollarSign, TrendingUp, ArrowLeft, Loader2,
} from "lucide-react";
import ProjectPage from "../Admindashboard/Projectspage";
import Productpage from "../Admindashboard/Productpage";
import Userspage from "../Admindashboard/Userspage";
import Testimonialspage from "../Admindashboard/Testimonialspage";
import Revenuepage from "../Admindashboard/Revenuepage";

const STAT_CONFIG = [
  {
    id: "projects",
    title: "Total Projects",
    label: "Live",
    icon: Monitor,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    badgeColor: "text-emerald-600 bg-emerald-500/10",
    accentBar: "bg-blue-500",
  },
  {
    id: "products",
    title: "Total Products",
    label: "Stock",
    icon: Package,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    badgeColor: "text-indigo-600 bg-indigo-500/10",
    accentBar: "bg-indigo-500",
  },
  {
    id: "users",
    title: "Manage Users",
    label: "All Users",
    icon: Users,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    badgeColor: "text-orange-600 bg-orange-500/10",
    accentBar: "bg-orange-500",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    label: "Verified",
    icon: Star,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    badgeColor: "text-amber-600 bg-amber-500/10",
    accentBar: "bg-amber-500",
  },
  {
    id: "revenue",
    title: "Total Revenue",
    label: "Budget",
    icon: CircleDollarSign,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    badgeColor: "text-emerald-600 bg-emerald-500/10",
    accentBar: "bg-emerald-500",
  },
];

const Top = ({ currentView, setCurrentView }) => {
  const [data, setData] = useState({ projects: 0, products: 0, users: 0, testimonials: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [projRes, prodRes, userRes, testRes] = await Promise.all([
          projectService.getAllProjects(),
          productService.getAllProducts(),
          userService.getUsers(),
          testimonialService.getTestimonials(),
        ]);
        const totalRevenue = projRes.data.data.reduce((sum, proj) => sum + (proj.budget || 0), 0);
        setData({
          projects: projRes.data.data.length,
          products: prodRes.data.data.length,
          users: userRes.data.data.length,
          testimonials: testRes.data.data.length,
          revenue: totalRevenue,
        });
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentView === "overview") fetchDashboardData();
  }, [currentView]);

  const getValue = (id) => {
    if (loading) return "···";
    if (id === "revenue") return `$${data.revenue.toLocaleString()}`;
    return data[id];
  };

  const BackButton = () => (
    <button
      onClick={() => setCurrentView("overview")}
      className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-opacity mb-6"
    >
      <ArrowLeft size={15} /> Back to Dashboard
    </button>
  );

  const renderView = () => {
    const views = { projects: ProjectPage, products: Productpage, users: Userspage, testimonials: Testimonialspage, revenue: Revenuepage };
    const View = views[currentView];
    return View ? <><BackButton /><View /></> : null;
  };

  if (currentView !== "overview") {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
        {renderView()}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-400">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Real-time stats from Switch2iTech ERP</p>
        </div>
        {loading && <Loader2 className="animate-spin text-primary" size={22} />}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {STAT_CONFIG.map((stat) => (
          <button
            key={stat.id}
            onClick={() => setCurrentView(stat.id)}
            className={`stat-card text-left group cursor-pointer relative overflow-hidden`}
          >
            {/* Coloured top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${stat.accentBar} opacity-60 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-start justify-between mb-5">
              <div className={`p-2.5 rounded-xl ${stat.iconBg} group-hover:scale-105 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${stat.badgeColor}`}>
                <TrendingUp className="w-3 h-3" />
                {stat.label}
              </div>
            </div>

            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
            <h3 className="text-2xl font-extrabold mt-1 tracking-tight">{getValue(stat.id)}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Top;
