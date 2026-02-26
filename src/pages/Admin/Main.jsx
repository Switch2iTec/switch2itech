import React from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ArrowUpRight, CheckCircle2, Star, Timer, Globe } from 'lucide-react'

const Main = () => {
  const chartData = [20, 45, 28, 80, 55, 90, 65, 85];

  const getSmoothPath = () => {
    const points = chartData.map((val, i) => ({
      x: (i / (chartData.length - 1)) * 100,
      y: 100 - val
    }));
    if (points.length === 0) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      d += ` C ${cp1x},${curr.y} ${cp2x},${next.y} ${next.x},${next.y}`;
    }
    return d;
  };

  const smoothPath = getSmoothPath();
  const areaPoints = `${smoothPath} L 100,100 L 0,100 Z`;

  return (
    <div className=" flex flex-col lg:flex-row gap-6 items-stretch min-h-[450px] ">
      {/* Chart Card - Multi-theme surface */}
      <Card className="lg:w-[70%] rounded-[2rem] border border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl shadow-blue-500/5">
        <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-xl font-extrabold tracking-tight">Project Intelligence</h2>
            </div>
            <p className="text-xs font-medium text-muted-foreground/80">Analytical breakdown • Live Updates</p>
          </div>
          <Button variant="secondary" size="sm" className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none rounded-xl h-8 px-4">
            Metrics v2.4
          </Button>
        </CardHeader>
        <CardContent className="px-8 pt-10">
          <div className="relative h-64 w-full">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-border/30 h-0" />
              ))}
            </div>
            <div className="relative h-full w-full">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cnnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPoints} fill="url(#cnnGradient)" className="transition-all duration-1000" />
                <path d={smoothPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                {chartData.map((val, i) => (
                  <circle key={i} cx={(i / (chartData.length - 1)) * 100} cy={100 - val} r="2" className="fill-white stroke-blue-600 stroke-[1.5px] hover:r-3 transition-all cursor-pointer" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between mt-8">
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'].map((month) => (
                <span key={month} className="text-[10px] font-black text-muted-foreground/50 tracking-tighter w-0 flex justify-center">{month}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Statistics - Multi-theme shade CNN style */}
      <div className="lg:w-[30%] flex flex-col gap-4">
        {/* Metric Grid */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-blue-500/5 border border-blue-500/10 transition-hover hover:bg-blue-500/10 group">
            <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <CheckCircle2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter">85.0%</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency Rate</span>
            </div>
            <ArrowUpRight size={16} className="ml-auto text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-center gap-4 p-4 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 transition-hover hover:bg-emerald-500/10 group">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
              <Star size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter">98.2</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Satisfaction index</span>
            </div>
            <Globe size={16} className="ml-auto text-emerald-500 opacity-40" />
          </div>
        </div>

        {/* Milestone Card - Flexible height to match Chart Card */}
        <div className="flex-1 min-h-[160px] p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden flex flex-col justify-end border border-white/10">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                <Timer size={16} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Active Milestone</span>
            </div>
            
            <p className="text-lg font-bold leading-tight tracking-tight">Q3 Operational Audit & Infrastructure Review</p>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-end text-[10px] font-black text-blue-100 uppercase tracking-tighter">
                <span>Deployment Progress</span>
                <span className="text-sm">65%</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-white w-[65%] rounded-full shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              </div>
            </div>
          </div>
          
          {/* CNN-style Background Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        </div>
      </div>
    </div>
  )
}

export default Main