import React from 'react'
import { 
  Monitor, 
  Package, 
  Users, 
  Star, 
  CircleDollarSign, 
  TrendingUp,
  ArrowLeft
} from 'lucide-react'
import { Card, CardContent } from "../../components/ui/card"
import ProjectPage from '../Admindashboard/Projectspage'
import Productpage from '../Admindashboard/Productpage'
import Clientspage from '../Admindashboard/Clientspage'
import Testimonialspage from '../Admindashboard/Testimonialspage'
import Revenuepage from '../Admindashboard/Revenuepage'

const Top = ({ currentView, setCurrentView }) => {
  const stats = [
    {
      id: 'projects',
      title: 'Total Projects',
      value: '156',
      label: '12%',
      hasLabelImg: true,
      icon: <Monitor className="w-6 h-6 text-blue-500" />,
      labelColor: 'text-emerald-600 bg-emerald-500/10'
    },
    {
      id: 'products',
      title: 'Total Products',
      value: '142',
      label: '+8',
      hasLabelImg: true,
      icon: <Package className="w-6 h-6 text-indigo-500" />,
      labelColor: 'text-blue-600 bg-blue-500/10'
    },
    {
      id: 'clients',
      title: 'Active Clients',
      value: '89',
      label: '5%',
      hasLabelImg: true,
      icon: <Users className="w-6 h-6 text-orange-500" />,
      labelColor: 'text-emerald-600 bg-emerald-500/10'
    },
    {
      id: 'testimonials', // Added ID
      title: 'Total Testimonials',
      value: '234',
      label: 'Steady',
      hasLabelImg: false,
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      labelColor: 'text-muted-foreground bg-muted'
    },
    {
      id: 'revenue', // Added ID
      title: 'Total Revenue',
      value: '$125,450',
      label: '18%',
      hasLabelImg: true,
      icon: <CircleDollarSign className="w-6 h-6 text-emerald-500" />,
      labelColor: 'text-emerald-600 bg-emerald-500/10'
    },
  ]

  const BackButton = () => (
    <button 
      onClick={() => setCurrentView('overview')}
      className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mb-6"
    >
      <ArrowLeft size={16} /> Back to Dashboard
    </button>
  )

  if (currentView === 'projects') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <BackButton />
        <ProjectPage /> 
      </div>
    )
  }

  if (currentView === 'products') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <BackButton />
        <Productpage />
      </div>
    )
  }

  if (currentView === 'clients') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <BackButton />
        <Clientspage />
      </div>
    )
  }

  if (currentView === 'testimonials') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <BackButton />
        <Testimonialspage />
      </div>
    )
  }

  if (currentView === 'revenue') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <BackButton />
        <Revenuepage />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground font-medium">Welcome back</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          // All stats now have IDs and are clickable
          const isClickable = !!stat.id;
          
          return (
            <Card
              key={index}
              onClick={() => isClickable && setCurrentView(stat.id)}
              className={`transition-all duration-300 group rounded-2xl border-border/50 ${
                isClickable 
                  ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 active:scale-95' 
                  : 'cursor-default'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="group-hover:scale-110 transition-transform duration-300 p-2 rounded-xl bg-secondary/50">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stat.labelColor}`}>
                    {stat.hasLabelImg && <TrendingUp className="w-3 h-3" />}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-extrabold mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  )
}

export default Top