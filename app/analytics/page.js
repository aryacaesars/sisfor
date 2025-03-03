"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "@/lib/context"

export default function AnalyticsPage() {
  const { state } = useAppContext()
  const { tasks, events, notes } = state
  const [timeRange, setTimeRange] = useState("week")

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    pending: tasks.filter((task) => task.status === "pending").length,
    highPriority: tasks.filter((task) => task.priority === "high").length,
    mediumPriority: tasks.filter((task) => task.priority === "medium").length,
    lowPriority: tasks.filter((task) => task.priority === "low").length,
  }

  // Calculate event statistics
  const eventStats = {
    total: events.length,
    meetings: events.filter((event) => event.type === "meeting").length,
    deadlines: events.filter((event) => event.type === "deadline").length,
    calls: events.filter((event) => event.type === "call").length,
    personal: events.filter((event) => event.type === "personal").length,
  }

  // Calculate note statistics
  const noteStats = {
    total: notes.length,
    starred: notes.filter((note) => note.starred).length,
  }

  // Helper function to get percentage
  const getPercentage = (value, total) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="year">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Task Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Task Analytics</CardTitle>
            <CardDescription>Overview of task completion and priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Completion Rate</span>
                  <span className="font-medium">{getPercentage(taskStats.completed, taskStats.total)}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${getPercentage(taskStats.completed, taskStats.total)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <p className="text-2xl font-bold">{taskStats.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold">{taskStats.completed}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium">Priority Distribution</p>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">High Priority</span>
                      <span className="text-sm font-medium">{taskStats.highPriority}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">Medium Priority</span>
                      <span className="text-sm font-medium">{taskStats.mediumPriority}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">Low Priority</span>
                      <span className="text-sm font-medium">{taskStats.lowPriority}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Event Analytics</CardTitle>
            <CardDescription>Distribution of event types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Events</p>
                  <p className="text-2xl font-bold">{eventStats.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-2xl font-bold">{eventStats.total}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium">Event Types</p>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">Meetings</span>
                      <span className="text-sm font-medium">{eventStats.meetings}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">Deadlines</span>
                      <span className="text-sm font-medium">{eventStats.deadlines}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">Calls</span>
                      <span className="text-sm font-medium">{eventStats.calls}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">Personal</span>
                      <span className="text-sm font-medium">{eventStats.personal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Note Analytics</CardTitle>
            <CardDescription>Overview of notes and categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Notes</p>
                  <p className="text-2xl font-bold">{noteStats.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Starred Notes</p>
                  <p className="text-2xl font-bold">{noteStats.starred}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Starred Rate</span>
                    <span className="font-medium">{getPercentage(noteStats.starred, noteStats.total)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${getPercentage(noteStats.starred, noteStats.total)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>Recent activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...tasks, ...events, ...notes]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{"title" in item ? item.title : item.content}</p>
                    <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

