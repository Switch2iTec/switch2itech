import React, { useState, useEffect } from "react"
import testimonialService from "../../api/testimonialService"
import {
  Star, MessageSquare, Clock, Award, Search,
  Trash2, Eye, ThumbsUp, CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"

const MOCK_REVIEWS = [
  {
    _id: "t1", clientName: "David Miller", company: "TechNova Solutions", rating: 5,
    status: "Published", isFeatured: true, isApproved: true,
    content: "The implementation phase was handled with extreme professionalism. Our efficiency increased by 40% in the first quarter.",
    createdAt: "2026-02-15", avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    _id: "t2", clientName: "Sophia Loren", company: "Creative Studio", rating: 4,
    status: "Pending", isFeatured: false, isApproved: false,
    content: "Great tool, though the learning curve for advanced analytics was steep initially. Support was helpful throughout.",
    createdAt: "2026-02-22", avatar: "https://i.pravatar.cc/150?u=sophia"
  },
  {
    _id: "t3", clientName: "Marcus Thorne", company: "E-Commerce Giants", rating: 5,
    status: "Published", isFeatured: false, isApproved: true,
    content: "Best-in-class performance. Nothing matches the speed and reliability here compared to competitors we have tried.",
    createdAt: "2026-01-10", avatar: "https://i.pravatar.cc/150?u=marcus"
  },
]

const Testimonialspage = () => {
  const [reviews, setReviews] = useState([])
  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await testimonialService.getTestimonials()
        setReviews(res.data?.data?.length >= 0 ? res.data.data : MOCK_REVIEWS)
      } catch {
        setReviews(MOCK_REVIEWS)
      }
    }
    fetch()
  }, [])

  const handleApprove = async (id, current) => {
    try {
      await testimonialService.updateTestimonial(id, { isApproved: !current })
      setReviews(prev => prev.map(r => r._id === id ? { ...r, isApproved: !current } : r))
    } catch { console.error("Failed to update approval status") }
  }

  const handleToggleFeatured = async (id, current) => {
    try {
      await testimonialService.updateTestimonial(id, { isFeatured: !current })
      setReviews(prev => prev.map(r => r._id === id ? { ...r, isFeatured: !current } : r))
    } catch { console.error("Failed to toggle featured status") }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return
    try {
      await testimonialService.deleteTestimonial(id)
      setReviews(prev => prev.filter(r => r._id !== id))
    } catch { console.error("Failed to delete testimonial") }
  }

  const stats = [
    { label: "Total Reviews", value: reviews.length, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Average Rating", value: "4.8 ★", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Pending Approval", value: reviews.filter(r => !r.isApproved).length, icon: Clock, color: "text-red-500", bg: "bg-red-500/10" },
  ]

  const filtered = reviews.filter(r => {
    const name = r.authorNameOverride || r.author?.name || r.clientName || ""
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "All"
      || (activeTab === "Featured" ? r.isFeatured : activeTab === "Published" ? r.isApproved : !r.isApproved)
    return matchesTab && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background p-8 space-y-8 animate-in fade-in duration-400">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Testimonials</h1>
          <p className="page-subtitle">Curate and moderate client reviews for the public website</p>
        </div>
        <Button className="gap-2 rounded-xl shadow-sm shadow-primary/20">
          <ThumbsUp size={15} /> Add Review
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="stat-card flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.bg} shrink-0`}><s.icon size={19} className={s.color} /></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <h3 className="text-2xl font-extrabold tracking-tight mt-0.5">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-4 border-b border-border/40 bg-secondary/20">
          <div className="flex items-center gap-1 bg-background border border-border/50 p-1 rounded-xl">
            {["All", "Published", "Pending", "Featured"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <Input placeholder="Search by client name…" className="pl-9 h-9 rounded-xl text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <CardContent className="p-0 divide-y divide-border/30">
          {filtered.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3 text-center text-muted-foreground">
              <MessageSquare size={32} className="opacity-30" />
              <p className="font-semibold">No reviews found</p>
            </div>
          )}
          {filtered.map(review => {
            const name = review.authorNameOverride || review.author?.name || review.clientName || "Anonymous"
            const avatar = review.authorAvatarOverride || review.author?.profile || review.avatar || `https://i.pravatar.cc/150?u=${review._id}`
            return (
              <div key={review._id} className="group p-6 hover:bg-secondary/15 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                  {/* Author */}
                  <div className="flex items-start gap-4 w-60 shrink-0">
                    <img src={avatar} className="h-12 w-12 rounded-xl border border-border object-cover" alt="" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm">{name}</h4>
                        {review.isFeatured && (
                          <Badge onClick={() => handleToggleFeatured(review._id, review.isFeatured)}
                            className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[9px] font-black uppercase cursor-pointer px-2 py-0.5 rounded-full">
                            <Award size={8} className="mr-1" /> Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{review.authorRoleOverride || review.author?.role || "Client"}</p>
                      <div className="flex text-amber-400 gap-0.5 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={2} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">"{review.content}"</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-3">
                      Received on {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={`border rounded-lg text-[10px] font-black uppercase px-2.5 py-1 ${review.isApproved ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>
                      {review.isApproved ? <CheckCircle2 size={9} className="inline mr-1" /> : <Clock size={9} className="inline mr-1" />}
                      {review.isApproved ? "Published" : "Pending"}
                    </Badge>
                    {!review.isApproved ? (
                      <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10" onClick={() => handleApprove(review._id, review.isApproved)}>
                        Approve
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-secondary text-emerald-600" onClick={() => handleApprove(review._id, review.isApproved)} title="Unpublish">
                        <Eye size={14} />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-500/10 hover:text-red-500" onClick={() => handleDelete(review._id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

export default Testimonialspage