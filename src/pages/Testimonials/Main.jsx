import React, { useState } from 'react'
import { Pencil, Star, Trash2, Check, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { dummyData } from '../../utility/dumydata'

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3 

  const allTestimonials = dummyData.testimonials
  const totalItems = allTestimonials.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = allTestimonials.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const TestimonialCard = ({ item }) => (
    <Card className="bg-card rounded-3xl border border-border shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md mb-6 min-h-[260px]">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <Avatar className="w-12 h-12 rounded-full border border-border">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${item.id}`} alt={item.author} className="object-cover" />
              <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-bold text-foreground text-sm leading-tight">{item.author}</h4>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight mt-0.5">Verified User</p>
              <p className="text-[11px] text-muted-foreground/60 leading-tight">{item.date}</p>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < item.rating ? "#fbbf24" : "none"} stroke={i < item.rating ? "#fbbf24" : "currentColor"} className="text-muted-foreground/40" />
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-6 italic">
          "{item.text}"
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <Badge variant={item.status === 'Published' ? 'success' : 'outline'} className="px-3 py-1 font-bold">
          {item.status}
        </Badge>

        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10">
            <Pencil size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10">
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="flex flex-col gap-12 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 items-start">
        {/* We distribute the sliced items across 3 columns */}
        <div className="flex flex-col">
          {currentItems.filter((_, i) => i % 3 === 0).map(item => <TestimonialCard key={item.id} item={item} />)}
        </div>
        <div className="flex flex-col">
          {currentItems.filter((_, i) => i % 3 === 1).map(item => <TestimonialCard key={item.id} item={item} />)}
        </div>
        <div className="flex flex-col">
          {currentItems.filter((_, i) => i % 3 === 2).map(item => <TestimonialCard key={item.id} item={item} />)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}</span> of <span className="font-semibold text-foreground">{totalItems}</span>
          </p>
          <p className="text-sm text-muted-foreground leading-none">testimonials</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-9 h-9 border-border text-muted-foreground hover:bg-muted"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              onClick={() => handlePageChange(i + 1)}
              className={`w-9 h-9 rounded-xl text-xs font-bold ${currentPage === i + 1 ? 'bg-primary shadow-lg shadow-primary/20 text-white' : 'text-muted-foreground'}`}
            >
              {i + 1}
            </Button>
          ))}

          <Button 
            variant="outline" 
            size="icon" 
            className="w-9 h-9 border-border text-muted-foreground hover:bg-muted"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Main