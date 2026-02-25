import React from 'react'
import { PlusCircle, UserPlus } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Top = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Team Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create teams and assign members to manage projects effectively.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="rounded-xl border-border bg-card text-foreground hover:bg-muted"
        >
          <UserPlus size={18} className="mr-2 text-primary" />
          Team Member
        </Button>

        <Button
          className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Team
        </Button>
      </div>
    </div>
  )
}

export default Top