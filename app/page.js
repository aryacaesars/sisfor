"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskList from "@/components/task-list"
import Calendar from "@/components/calendar"
import Notes from "@/components/notes"
import Stats from "@/components/stats"
import { PlusIcon, CalendarIcon, ListTodoIcon, StickyNoteIcon } from "lucide-react"
import { useAppContext } from "@/lib/context"

export default function Dashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const { state } = useAppContext()

  // Check if app is ready (data loaded)
  const isLoading = state.isLoading

  return (
    <div className="space-y-6">
      {!isOnline && (
        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-4 rounded">
          <p className="font-medium">You are currently offline. Your changes will be saved locally.</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          New Activity
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <Stats />

          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <ListTodoIcon className="h-4 w-4" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <StickyNoteIcon className="h-4 w-4" />
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks">
              <Card className="p-4">
                <TaskList />
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card className="p-4">
                <Calendar />
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="p-4">
                <Notes />
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

