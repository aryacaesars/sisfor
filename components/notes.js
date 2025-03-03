"use client"

import { useState, useEffect } from "react"
import { Plus, MoreVertical, Trash, Edit, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppContext, Actions } from "@/lib/context"

export default function Notes() {
  const { state, dispatch } = useAppContext()
  const { notes } = state

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNote, setSelectedNote] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Update selected note if it changes in the global state
  useEffect(() => {
    if (selectedNote) {
      const updatedNote = notes.find((note) => note.id === selectedNote.id)
      if (updatedNote) {
        setSelectedNote(updatedNote)
      }
    }
  }, [notes, selectedNote])

  const handleNoteSelect = (note) => {
    setSelectedNote(note)
    setEditMode(false)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const handleNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      date: new Date().toISOString().split("T")[0],
      starred: false,
    }

    dispatch(Actions.addNote(newNote))
    handleNoteSelect(newNote)
    setEditMode(true)
  }

  const handleDeleteNote = (id) => {
    dispatch(Actions.deleteNote(id))
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null)
    }
  }

  const handleToggleStar = (id) => {
    dispatch(Actions.toggleStarNote(id))
  }

  const handleSaveNote = () => {
    if (!selectedNote) return

    const updatedNote = {
      ...selectedNote,
      title: editTitle,
      content: editContent,
    }

    dispatch(Actions.updateNote(updatedNote))
    setEditMode(false)
  }

  return (
    <div className="flex h-[500px] border rounded-md overflow-hidden">
      {/* Notes List */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-3 border-b">
          <div className="flex items-center gap-2 mb-3">
            <Input
              type="search"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" onClick={handleNewNote}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notes found</div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedNote && selectedNote.id === note.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleNoteSelect(note)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium flex items-center gap-1">
                      {note.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      {note.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{note.content}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-3 border-b flex items-center justify-between">
              {editMode ? (
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="font-medium" />
              ) : (
                <h2 className="font-medium">{selectedNote.title}</h2>
              )}

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleToggleStar(selectedNote.id)}>
                  <Star className={`h-4 w-4 ${selectedNote.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {editMode ? (
                      <DropdownMenuItem onClick={handleSaveNote}>Save</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => setEditMode(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleDeleteNote(selectedNote.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {editMode ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="whitespace-pre-wrap">
                  {selectedNote.content || <span className="text-gray-400">No content</span>}
                </div>
              )}
            </div>

            {editMode && (
              <div className="p-3 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNote}>Save</Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Select a note or create a new one</div>
        )}
      </div>
    </div>
  )
}

