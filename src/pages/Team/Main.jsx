import React from 'react'
import { Search, Pencil, Trash2, Mail } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

const Main = () => {
  const members = [
    { name: 'Alex Rivera', email: 'alex@company.com', role: 'Developer', team: 'Tech Ops', status: 'Active', img: 'https://i.pravatar.cc/150?u=1' },
    { name: 'Sarah Chen', email: 'sarah@company.com', role: 'UI Designer', team: 'Creative', status: 'Active', img: 'https://i.pravatar.cc/150?u=2' },
    { name: 'James Wilson', email: 'james@company.com', role: 'Manager', team: 'Marketing', status: 'Active', img: 'https://i.pravatar.cc/150?u=3' },
    { name: 'Elena Frost', email: 'elena@company.com', role: 'Intern', team: 'Tech Ops', status: 'Active', img: 'https://i.pravatar.cc/150?u=4' },
    { name: 'Mike Ross', email: 'mike@company.com', role: 'Developer', team: 'Product', status: 'Active', img: 'https://i.pravatar.cc/150?u=5' },
    { name: 'Lisa Kim', email: 'lisa@company.com', role: 'Developer', team: 'Tech Ops', status: 'Active', img: 'https://i.pravatar.cc/150?u=6' },
    { name: 'David Vane', email: 'david@company.com', role: 'Lead', team: 'Creative', status: 'Active', img: 'https://i.pravatar.cc/150?u=7' },
    { name: 'Sonia Geller', email: 'sonia@company.com', role: 'Intern', team: 'Marketing', status: 'Active', img: 'https://i.pravatar.cc/150?u=8' },
    { name: 'Peter Parker', email: 'peter@company.com', role: 'Developer', team: 'Tech Ops', status: 'Active', img: 'https://i.pravatar.cc/150?u=9' },
    { name: 'Bruce Wayne', email: 'bruce@company.com', role: 'Director', team: 'Product', status: 'Active', img: 'https://i.pravatar.cc/150?u=10' },
  ]

  return (
    <Card className="rounded-2xl border-border bg-card overflow-hidden transition-all duration-300">
      <CardHeader className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">All Members</h2>
          <p className="text-sm text-muted-foreground">Manage your team members and their roles.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, team..."
            className="pl-10 bg-muted/50 border-border text-sm focus-visible:ring-primary/20"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Name & Email</TableHead>
              <TableHead className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Role</TableHead>
              <TableHead className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Team</TableHead>
              <TableHead className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Status</TableHead>
              <TableHead className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, i) => (
              <TableRow key={i} className="hover:bg-muted/50 transition-colors group border-border">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border shadow-sm">
                      <AvatarImage src={member.img} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail size={12} /> {member.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm text-muted-foreground font-medium">{member.role}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{member.team}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="success" className="gap-1.5">
                    <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10">
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Main