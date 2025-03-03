"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Notes from "@/components/notes"

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Notes />
        </CardContent>
      </Card>
    </div>
  )
}

