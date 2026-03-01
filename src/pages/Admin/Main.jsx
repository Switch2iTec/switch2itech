import React from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ArrowUpRight, CheckCircle2, Star, Timer, Globe } from 'lucide-react'

const Main = () => {
  const chartData = [20, 45, 28, 80, 55, 90, 65, 85]

  const getSmoothPath = () => {
    const points = chartData.map((val, i) => ({ x: (i / (chartData.length - 1)) * 100, y: 100 - val }))
    if (points.length === 0) return ''
    let d = `M ${points[0].x},${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i], next = points[i + 1]
      const cp1x = curr.x + (next.x - curr.x) / 2
      d += ` C ${cp1x},${curr.y} ${cp1x},${next.y} ${next.x},${next.y}`
    }
    return d
  }

  const smoothPath = getSmoothPath()
  const areaPoints = `${smoothPath} L 100,100 L 0,100 Z`

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-stretch min-h-[420px]">

      {/* ── Chart Card ─────────────────────────────────────────────── */}
      <Card className="lg:w-[68%] rounded-2xl border-border/50 bg-card/80 backdrop-blur-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between px-7 pt-7 pb-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-base font-extrabold tracking-tight">Project Intelligence</h2>
            </div>
            <p className="text-xs text-muted-foreground">Analytical breakdown · Live Updates</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary/20 border-none rounded-xl h-7 px-3"
          >
            Metrics v2.4
          </Button>
        </CardHeader>

        <CardContent className="px-7 pt-8 pb-6">
          <div className="relative h-56 w-full">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-border/20 h-0" />
              ))}
            </div>

            {/* SVG chart */}
            <div className="relative h-full w-full">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPoints} fill="url(#chartGradient)" />
                <path d={smoothPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                {chartData.map((val, i) => (
                  <circle
                    key={i}
                    cx={(i / (chartData.length - 1)) * 100}
                    cy={100 - val}
                    r="2"
                    className="fill-card stroke-primary stroke-[1.5px] hover:r-3 transition-all cursor-pointer"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            </div>

            {/* Month labels */}
            <div className="flex justify-between mt-6">
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'].map((m) => (
                <span key={m} className="text-[10px] font-black text-muted-foreground/40 tracking-tighter w-0 flex justify-center">{m}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Quick Stats Panel ───────────────────────────────────────── */}
      <div className="lg:w-[32%] flex flex-col gap-4">
        {/* Metric tiles */}
        <div className="space-y-3">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-primary/5 border border-primary/15 hover:bg-primary/10 group transition-colors cursor-pointer">
            <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight">85.0%</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency Rate</span>
            </div>
            <ArrowUpRight size={14} className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 hover:bg-emerald-500/10 group transition-colors cursor-pointer">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-500/30">
              <Star size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight">98.2</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Satisfaction Index</span>
            </div>
            <Globe size={14} className="ml-auto text-emerald-500 opacity-40" />
          </div>
        </div>

        {/* Milestone card */}
        <div className="flex-1 min-h-[150px] p-6 rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-lg shadow-primary/20 relative overflow-hidden flex flex-col justify-end border border-white/10">
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-white/15 backdrop-blur-sm p-1.5 rounded-lg">
                <Timer size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">Active Milestone</span>
            </div>
            <p className="text-sm font-bold leading-snug tracking-tight">
              Q3 Operational Audit &amp; Infrastructure Review
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-[10px] font-black text-blue-100 uppercase tracking-tighter">
                <span>Deployment Progress</span>
                <span className="text-white">65%</span>
              </div>
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[65%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </div>
          {/* Background accents */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-400/20 rounded-full -ml-8 -mb-8 blur-xl" />
        </div>
      </div>
    </div>
  )
}

export default Main