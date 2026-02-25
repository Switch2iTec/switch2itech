import React from 'react'
import { Search, Star, StarHalf } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

const Top = () => {
  const stats = [
    {
      label: 'Total clients',
      value: '1,248',
      subtext: '',
      imgUrl: '/Images/Client/People.png',
      extraValueImg: '/Images/Client/12.png',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Active Projects',
      value: '84',
      subtext: 'Ongoing',
      imgUrl: '/Images/Client/Office.png',
      bgColor: 'bg-emerald-500/10'
    },
    {
      label: 'Client satisfaction',
      value: '4.8',
      subtext: '',
      imgUrl: '/Images/Client/Star.png',
      bgColor: 'bg-amber-500/10'
    }
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border bg-card shadow-sm flex items-center p-6 rounded-3xl overflow-hidden transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center shrink-0`}>
              {stat.imgUrl ? (
                <img src={stat.imgUrl} alt={stat.label} className="w-8 h-8 object-contain" />
              ) : (
                <div className="text-[10px] text-muted-foreground">IMG</div>
              )}
            </div>

            <div className="flex flex-col justify-center ml-4">
              <p className="text-sm font-medium text-muted-foreground leading-tight mb-1">{stat.label}</p>

              <div className="flex items-end gap-2">
                <h2 className="text-2xl font-bold text-foreground leading-none">{stat.value}</h2>

                {stat.extraValueImg && index === 0 && (
                  <img
                    src={stat.extraValueImg}
                    alt="stat-icon"
                    className="w-8 h-5 object-contain mb-0.5"
                  />
                )}

                {stat.label === 'Client satisfaction' && (
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                    <StarHalf size={14} className="fill-amber-400 text-amber-400" />
                  </div>
                )}

                {stat.subtext && (
                  <span className="text-xs font-medium text-muted-foreground mb-0.5 whitespace-nowrap">
                    {stat.subtext}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search by name, company or email..."
          className="bg-card border-border rounded-2xl py-6 pl-12 pr-4 text-sm focus-visible:ring-primary/20 shadow-sm transition-all"
        />
      </div>
    </div>
  )
}

export default Top