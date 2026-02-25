import React, { useState } from 'react'
import { MoreVertical, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { dummyData } from '../../utility/dumydata'

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const totalClients = dummyData.clients.length
  const totalPages = Math.ceil(totalClients / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentClients = dummyData.clients.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClients.map((client) => (
          <Card key={client.id} className="rounded-3xl border border-border bg-card shadow-sm p-6 flex flex-col hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <Avatar className="w-12 h-12 rounded-xl">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${client.id}`} alt={client.name} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {client.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MoreVertical size={20} />
              </Button>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
              {client.name}
            </h3>
            <p className="text-xs font-medium text-indigo-500 mb-4">{client.company}</p>

            <div className="space-y-2 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium leading-none">@</span>
                <span className="text-xs truncate lowercase">
                  {client.name.replace(/\s+/g, '.')}@{client.company.split(' ')[0].toLowerCase()}.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-muted-foreground/60" />
                <span className="text-xs">{client.country}</span>
              </div>
            </div>

            <hr className="border-border mb-4" />

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Revenue</span>
                <span className="text-sm font-bold text-emerald-500">{client.revenue}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="secondary" className="px-2 py-0.5 font-bold text-[10px]">
                  {client.projects} Projects
                </Badge>
                <Badge variant="outline" className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  client.type === 'Enterprise' ? 'border-indigo-500/50 text-indigo-500 bg-indigo-500/5' : ''
                }`}>
                  {client.type}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalClients)}</span> of <span className="font-semibold text-foreground">{totalClients}</span>
          </p>
          <p className="text-sm text-muted-foreground leading-none">clients</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-9 h-9 border-border text-muted-foreground hover:bg-muted"
          >
            <ChevronLeft size={16} />
          </Button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "ghost"}
                onClick={() => handlePageChange(pageNum)}
                className={`w-9 h-9 rounded-lg font-bold text-xs ${
                  currentPage === pageNum 
                  ? 'shadow-md shadow-primary/20 bg-primary' 
                  : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button 
            variant="outline" 
            size="icon" 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-9 h-9 border-border text-muted-foreground hover:bg-muted"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Main