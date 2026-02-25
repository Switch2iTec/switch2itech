import React from 'react'
import { Info, Image as ImageIcon, Upload, Save, ChevronRight, Globe, Shield, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

const Settings = () => {
  const sidebarLinks = [
    { label: 'General', active: true, icon: Info },
    { label: 'About', active: false, icon: Globe },
    { label: 'Contact', active: false, icon: Shield },
    { label: 'SEO Config', active: false, icon: Bell },
  ]

  return (
    <div className="flex flex-col space-y-8 bg-background p-6 md:p-8 transition-colors duration-300">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Website Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage global configuration and assets.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-1 shrink-0">
          {sidebarLinks.map((link, i) => (
            <Button
              key={i}
              variant={link.active ? "secondary" : "ghost"}
              className={`w-full flex items-center justify-between px-4 py-6 rounded-xl text-sm font-medium transition-all ${link.active
                  ? 'bg-secondary text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <div className="flex items-center gap-3">
                <link.icon size={18} />
                {link.label}
              </div>
              {link.active && <ChevronRight size={14} />}
            </Button>
          ))}
        </div>

        <Card className="flex-1 rounded-3xl border-border bg-card flex flex-col overflow-hidden shadow-sm">
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-lg font-bold text-foreground mb-6">General Information</h2>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Website Name</label>
                <div className="w-full max-w-md px-4 py-3 bg-muted/30 border border-border rounded-xl text-foreground font-medium">
                  Switch2iTech
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Website Logo</h2>
              <div className="border-t border-border w-full"></div>

              <div className="flex flex-col sm:flex-row items-center gap-8 bg-muted/20 p-6 rounded-2xl border border-dashed border-border">
                <div className="h-24 w-24 bg-card rounded-2xl flex items-center justify-center border border-border shadow-sm overflow-hidden shrink-0">
                  <img src="Images/Logo.png" alt="Logo" className="w-16 h-16 object-contain" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col gap-1">
                    <Button variant="link" className="p-0 h-auto flex items-center justify-center sm:justify-start gap-2 text-primary font-bold text-sm hover:underline group">
                      <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                      Upload new logo
                    </Button>
                    <p className="text-xs text-muted-foreground font-medium mt-1">
                      Recommended 512x512px. PNG/JPG
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="p-6 bg-muted/30 border-t border-border flex justify-end">
            <Button className="flex items-center gap-2 px-6 py-6 rounded-xl font-bold shadow-lg shadow-primary/20">
              <Save size={18} />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Settings