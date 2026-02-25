import React from 'react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'

const Top = () => {
  const stats = [
    {
      label: 'Total Testimonials',
      value: '1,240',
      change: '+12%',
      changeColor: 'success',
      img: '/Images/Testimonials/person.png'
    },
    {
      label: 'Average Rating',
      value: '4.8/5.0',
      change: null,
      img: '/Images/Testimonials/star.png'
    },
    {
      label: 'Published Count',
      value: '1,180',
      change: '95%',
      changeColor: 'success',
      img: '/Images/Testimonials/tick.png'
    },
    {
      label: 'Pending Approval',
      value: '60',
      change: 'Action Req.',
      changeColor: 'destructive',
      img: '/Images/Testimonials/timer.png'
    }
  ]

  const filters = ['All', 'Published', 'Pending', 'Featured']

  return (
    <div className="flex flex-col gap-8">
      {/* 4 Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center">
                <img src={stat.img} alt={stat.label} className="w-7 h-7 object-contain" />
              </div>
              {stat.change && (
                <Badge variant={stat.changeColor} className="text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  {stat.change}
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground leading-none mb-1">
              {stat.value}
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-3">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={filter === 'All' ? 'default' : 'outline'}
            className={`rounded-xl text-sm font-bold transition-all px-6 py-2 h-auto ${filter === 'All'
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10'
                : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'
              }`}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Top