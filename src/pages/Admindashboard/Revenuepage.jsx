import React, { useState, useEffect } from "react"
import projectService from "../../api/projectService"
import {
  TrendingUp, DollarSign, Briefcase, CreditCard,
  Clock, Download, Calendar, ArrowUpRight, Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"

const MOCK_REVENUE_DATA = [
  { _id: "rev1", projectName: "E-Commerce Platform", client: "Global Retail Inc.", amount: 12500, status: "Paid", date: "2026-02-10", paymentMethod: "Bank Transfer", category: "Development" },
  { _id: "rev2", projectName: "Cloud Migration", client: "FinFlow IO", amount: 8200, status: "Pending", date: "2026-02-20", paymentMethod: "Stripe", category: "Consulting" },
  { _id: "rev3", projectName: "UI/UX Redesign", client: "Aether AI", amount: 4500, status: "Paid", date: "2026-01-25", paymentMethod: "PayPal", category: "Design" },
]

const Revenuepage = () => {
  const [transactions, setTransactions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await projectService.getAllProjects()
        const mapped = (res.data?.data || []).map(p => ({
          _id: p._id,
          projectName: p.title || p.name,
          client: p.clients?.[0]?.name || "Internal",
          amount: p.budget || 0,
          status: p.completedAt ? "Paid" : "Pending",
          date: new Date(p.startDate || Date.now()).toLocaleDateString(),
          paymentMethod: "Project Budget",
          category: p.category || "Development",
        }))
        setTransactions(mapped.length > 0 ? mapped : MOCK_REVENUE_DATA)
      } catch {
        setTransactions(MOCK_REVENUE_DATA)
      }
    }
    fetch()
  }, [])

  const total = transactions.reduce((s, t) => s + (t.amount || 0), 0)
  const pending = transactions.filter(t => t.status === "Pending").reduce((s, t) => s + (t.amount || 0), 0)

  const stats = [
    { label: "Total Revenue", value: `$${total.toLocaleString()}`, trend: "+18%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Invoices", value: `$${pending.toLocaleString()}`, trend: `${transactions.filter(t => t.status === "Pending").length} items`, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Project Earnings", value: "$88,400", trend: "70% of total", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Average Deal Size", value: `$${Math.round(total / Math.max(transactions.length, 1)).toLocaleString()}`, trend: "+5%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
  ]

  const filtered = transactions.filter(t =>
    (t.projectName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.client || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-400">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Financial Overview</h1>
          <p className="page-subtitle">Track project earnings, transaction history, and fiscal growth</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2"><Calendar size={15} /> Last 30 Days</Button>
          <Button className="rounded-xl gap-2 shadow-sm shadow-primary/20"><Download size={15} /> Export Report</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-start justify-between mb-5">
              <div className={`p-3 rounded-xl ${s.bg}`}><s.icon size={19} className={s.color} /></div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-secondary text-muted-foreground px-2.5 py-1 rounded-lg">{s.trend}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <h3 className="text-2xl font-extrabold mt-1 tracking-tight">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue Ledger */}
        <Card className="lg:col-span-2 rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between px-6 pt-6 pb-4 border-b border-border/40 gap-4">
            <div>
              <CardTitle className="text-base font-extrabold">Revenue Ledger</CardTitle>
              <CardDescription className="text-xs">Earnings breakdown by project</CardDescription>
            </div>
            <div className="relative w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <Input placeholder="Search projects…" className="pl-9 h-9 rounded-xl text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/30 border-b border-border/40 text-[10px] font-black uppercase tracking-[0.14em] text-muted-foreground/60">
                  <th className="px-6 py-3.5">Project &amp; Client</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filtered.map(item => (
                  <tr key={item._id} className="group hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm">{item.projectName}</p>
                      <p className="text-[11px] text-muted-foreground">{item.client}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground">{item.category}</td>
                    <td className="px-6 py-4 font-extrabold text-sm">${(item.amount || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Badge className={`rounded-lg border text-[10px] font-black uppercase px-2.5 py-1 ${item.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                        <ArrowUpRight size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-border/40">
            <CardTitle className="text-base font-extrabold">Recent Activity</CardTitle>
            <CardDescription className="text-xs">Incoming payments and audits</CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-5 space-y-4">
            {transactions.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${item.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary text-muted-foreground"}`}>
                  <CreditCard size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.client}</p>
                  <p className="text-[11px] text-muted-foreground">{item.paymentMethod} · {item.date}</p>
                </div>
                <span className={`text-sm font-extrabold shrink-0 ${item.status === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>
                  {item.status === "Paid" ? "+" : ""}${(item.amount || 0).toLocaleString()}
                </span>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl font-bold text-xs uppercase tracking-widest mt-2">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Revenuepage