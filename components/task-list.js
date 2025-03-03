"use client"

import { useState } from "react"
import { CheckCircle, Circle, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAppContext, Actions } from "@/lib/context"

export default function TaskList() {
  const { state, dispatch } = useAppContext()
  const { tasks } = state
  const [newTask, setNewTask] = useState("")

  const toggleTaskStatus = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      dispatch(
        Actions.updateTask({
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        }),
      )
    }
  }

  const addTask = () => {
    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      title: newTask,
      status: "pending",
      priority: "medium",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }

    dispatch(Actions.addTask(task))
    setNewTask("")
  }

  const deleteTask = (id) => {
    dispatch(Actions.deleteTask(id))
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1"
        />
        <Button onClick={addTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No tasks yet. Add your first task above!</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between rounded-md border p-3 ${
                task.status === "completed" ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button onClick={() => toggleTaskStatus(task.id)}>
                  {task.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span className={`font-medium ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Due: {task.dueDate}</span>
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleTaskStatus(task.id)}>
                    {task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteTask(task.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

