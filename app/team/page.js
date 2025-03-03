"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Mail, Phone, MapPin } from "lucide-react"

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Project Manager",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    tasks: 12,
    completedTasks: 8,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Developer",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    location: "San Francisco, USA",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    tasks: 15,
    completedTasks: 10,
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Designer",
    email: "mike@example.com",
    phone: "+1 234 567 892",
    location: "London, UK",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    tasks: 8,
    completedTasks: 5,
  },
]

export default function TeamPage() {
  const [members] = useState(teamMembers)
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddMember = () => {
    // In a real app, this would make an API call
    console.log("Adding new member:", newMember)
    // Reset form
    setNewMember({
      name: "",
      role: "",
      email: "",
      phone: "",
      location: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Team</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Project Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newMember.location}
                  onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="ml-auto">
                  <div className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="mr-2 h-4 w-4" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="mr-2 h-4 w-4" />
                    {member.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 h-4 w-4" />
                    {member.location}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Task Completion</span>
                    <span className="font-medium">{Math.round((member.completedTasks / member.tasks) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${(member.completedTasks / member.tasks) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {member.completedTasks} of {member.tasks} tasks completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

