import React from 'react'
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  LifeBuoy, 
  ChevronRight, 
  Activity,
  ArrowUpRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { dummyData } from '../../utility/dumydata'

const Support = () => {
  return (
    <div className="p-8 space-y-10 overflow-y-auto max-h-[calc(100vh-80px)] no-scrollbar bg-background">
      
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Support Center</h1>
        <p className="text-muted-foreground text-sm">
          Search our resources or review latest platform feedback from {dummyData.testimonials.length} users.
        </p>
        <div className="relative w-full max-w-md mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search documentation..." 
            className="pl-12 h-12 rounded-2xl border-border bg-card shadow-sm focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2rem] border-border bg-card hover:shadow-lg transition-all border-b-4 border-b-blue-500">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-500/10 rounded-2xl mb-4 text-blue-500">
              <HelpCircle size={28} />
            </div>
            <h3 className="font-bold">Knowledge Base</h3>
            <p className="text-xs text-muted-foreground mt-2">Read tutorials and guides for all products.</p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border bg-card hover:shadow-lg transition-all border-b-4 border-b-indigo-500">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-4 bg-indigo-500/10 rounded-2xl mb-4 text-indigo-500">
              <MessageSquare size={28} />
            </div>
            <h3 className="font-bold">Community Forum</h3>
            <p className="text-xs text-muted-foreground mt-2">Join discussions with other developers.</p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border bg-card hover:shadow-lg transition-all border-b-4 border-b-emerald-500">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-500/10 rounded-2xl mb-4 text-emerald-500">
              <LifeBuoy size={28} />
            </div>
            <h3 className="font-bold">Direct Support</h3>
            <p className="text-xs text-muted-foreground mt-2">Open a ticket with our expert team.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <Card className="rounded-[2.5rem] border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent User Feedback</CardTitle>
              <CardDescription>Latest {dummyData.testimonials.slice(0, 5).length} public reviews</CardDescription>
            </div>
            <Activity className="text-muted-foreground opacity-50" />
          </CardHeader>
          <CardContent className="space-y-4">
            {dummyData.testimonials.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {item.author.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold">{item.author}</span>
                    <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic line-clamp-1">"{item.text}"</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-border bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Platform Status</CardTitle>
            <CardDescription>Live health metrics from your analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dummyData.analytics.slice(0, 5).map((stat) => (
              <div key={stat.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${stat.trend === 'up' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">{stat.value}</span>
                  <ArrowUpRight size={14} className={stat.trend === 'up' ? 'text-emerald-500' : 'text-amber-500'} />
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button className="w-full rounded-2xl py-6 font-bold flex gap-2">
                <LifeBuoy size={18} />
                Contact Support Team
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Support