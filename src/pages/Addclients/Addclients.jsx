import React, { useState } from 'react'
import { User, Mail, Globe, Briefcase, Camera, CheckCircle2 } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card } from "../../components/ui/card"

const Addclients = () => {
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const handleUploadClick = () => {
    showToast('Image upload triggered')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Client profile created successfully')
  }

  return (
    <div className="w-full bg-background transition-colors duration-300 relative">
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          <CheckCircle2 size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{toast.message}</span>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Add New Client</h2>
        <p className="text-sm text-muted-foreground mt-1">Register a new client profile in the system</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card 
          onClick={handleUploadClick}
          className="flex flex-col items-center justify-center p-6 bg-muted/20 border-border rounded-2xl mb-8 border-dashed cursor-pointer hover:bg-muted/30 transition-colors"
        >
          <div className="h-20 w-20 rounded-full bg-card flex items-center justify-center shadow-sm relative group border border-border">
            <Camera className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
            <div className="absolute -right-1 -bottom-1 h-7 w-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground border-4 border-card">
              <span className="text-xs font-bold">+</span>
            </div>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-3">Upload Logo / Photo</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Client Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="John Doe or Company Name"
                className="pl-12 bg-muted/30 border-border text-foreground focus-visible:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="client@example.com"
                className="pl-12 bg-muted/30 border-border text-foreground focus-visible:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Industry / Category</Label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <select 
                className="flex h-10 w-full rounded-md border border-border bg-muted/30 px-12 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                onChange={() => showToast('Industry updated')}
              >
                <option className="bg-card">Technology</option>
                <option className="bg-card">Real Estate</option>
                <option className="bg-card">Marketing</option>
                <option className="bg-card">E-commerce</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Website URL</Label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="https://www.client.com"
                className="pl-12 bg-muted/30 border-border text-foreground focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Internal Notes</Label>
          <textarea
            rows="4"
            placeholder="Add any specific requirements or details..."
            className="flex min-h-[80px] w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1 py-6 rounded-xl font-bold shadow-lg shadow-primary/20"
          >
            Create Client Profile
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Addclients