"use client"

import { createContext, useContext, useEffect, useReducer } from "react"

// Initial state
const initialState = {
  tasks: [],
  events: [],
  notes: [],
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    upcomingTasks: 0,
    totalEvents: 0,
  },
  isLoading: true,
}

// Action types
const ActionTypes = {
  INITIALIZE: "INITIALIZE",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  ADD_EVENT: "ADD_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  ADD_NOTE: "ADD_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
  TOGGLE_STAR_NOTE: "TOGGLE_STAR_NOTE",
}

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      return {
        ...state,
        tasks: action.payload.tasks || [],
        events: action.payload.events || [],
        notes: action.payload.notes || [],
        isLoading: false,
        stats: calculateStats(action.payload.tasks || [], action.payload.events || []),
      }

    case ActionTypes.ADD_TASK: {
      const updatedTasks = [...state.tasks, action.payload]
      return {
        ...state,
        tasks: updatedTasks,
        stats: calculateStats(updatedTasks, state.events),
      }
    }

    case ActionTypes.UPDATE_TASK: {
      const updatedTasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task))
      return {
        ...state,
        tasks: updatedTasks,
        stats: calculateStats(updatedTasks, state.events),
      }
    }

    case ActionTypes.DELETE_TASK: {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.payload)
      return {
        ...state,
        tasks: updatedTasks,
        stats: calculateStats(updatedTasks, state.events),
      }
    }

    case ActionTypes.ADD_EVENT: {
      const updatedEvents = [...state.events, action.payload]
      return {
        ...state,
        events: updatedEvents,
        stats: calculateStats(state.tasks, updatedEvents),
      }
    }

    case ActionTypes.UPDATE_EVENT: {
      const updatedEvents = state.events.map((event) => (event.id === action.payload.id ? action.payload : event))
      return {
        ...state,
        events: updatedEvents,
        stats: calculateStats(state.tasks, updatedEvents),
      }
    }

    case ActionTypes.DELETE_EVENT: {
      const updatedEvents = state.events.filter((event) => event.id !== action.payload)
      return {
        ...state,
        events: updatedEvents,
        stats: calculateStats(state.tasks, updatedEvents),
      }
    }

    case ActionTypes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      }

    case ActionTypes.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload : note)),
      }

    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      }

    case ActionTypes.TOGGLE_STAR_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => (note.id === action.payload ? { ...note, starred: !note.starred } : note)),
      }

    default:
      return state
  }
}

// Helper function to calculate stats
function calculateStats(tasks, events) {
  const today = new Date().toISOString().split("T")[0]

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const upcomingTasks = tasks.filter((task) => task.status !== "completed" && task.dueDate >= today).length

  const totalEvents = events.length

  return {
    totalTasks,
    completedTasks,
    upcomingTasks,
    totalEvents,
  }
}

// Create context
const AppContext = createContext(null)

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      try {
        const storedTasks = localStorage.getItem("tasks")
        const storedEvents = localStorage.getItem("events")
        const storedNotes = localStorage.getItem("notes")

        const data = {
          tasks: storedTasks ? JSON.parse(storedTasks) : getSampleTasks(),
          events: storedEvents ? JSON.parse(storedEvents) : getSampleEvents(),
          notes: storedNotes ? JSON.parse(storedNotes) : getSampleNotes(),
        }

        dispatch({ type: ActionTypes.INITIALIZE, payload: data })
      } catch (error) {
        console.error("Error loading data from localStorage:", error)

        // Fallback to sample data
        const data = {
          tasks: getSampleTasks(),
          events: getSampleEvents(),
          notes: getSampleNotes(),
        }

        dispatch({ type: ActionTypes.INITIALIZE, payload: data })
      }
    }

    loadData()
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
      localStorage.setItem("events", JSON.stringify(state.events))
      localStorage.setItem("notes", JSON.stringify(state.notes))
    }
  }, [state.tasks, state.events, state.notes, state.isLoading])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }

  return context
}

// Action creators
export const Actions = {
  addTask: (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task,
  }),

  updateTask: (task) => ({
    type: ActionTypes.UPDATE_TASK,
    payload: task,
  }),

  deleteTask: (taskId) => ({
    type: ActionTypes.DELETE_TASK,
    payload: taskId,
  }),

  addEvent: (event) => ({
    type: ActionTypes.ADD_EVENT,
    payload: event,
  }),

  updateEvent: (event) => ({
    type: ActionTypes.UPDATE_EVENT,
    payload: event,
  }),

  deleteEvent: (eventId) => ({
    type: ActionTypes.DELETE_EVENT,
    payload: eventId,
  }),

  addNote: (note) => ({
    type: ActionTypes.ADD_NOTE,
    payload: note,
  }),

  updateNote: (note) => ({
    type: ActionTypes.UPDATE_NOTE,
    payload: note,
  }),

  deleteNote: (noteId) => ({
    type: ActionTypes.DELETE_NOTE,
    payload: noteId,
  }),

  toggleStarNote: (noteId) => ({
    type: ActionTypes.TOGGLE_STAR_NOTE,
    payload: noteId,
  }),
}

// Sample data functions
function getSampleTasks() {
  return [
    { id: 1, title: "Complete project proposal", status: "pending", priority: "high", dueDate: "2023-12-15" },
    { id: 2, title: "Review team submissions", status: "pending", priority: "medium", dueDate: "2023-12-14" },
    { id: 3, title: "Schedule client meeting", status: "completed", priority: "high", dueDate: "2023-12-10" },
    { id: 4, title: "Update documentation", status: "pending", priority: "low", dueDate: "2023-12-20" },
    { id: 5, title: "Prepare presentation slides", status: "pending", priority: "medium", dueDate: "2023-12-18" },
  ]
}

function getSampleEvents() {
  return [
    { id: 1, title: "Team Meeting", date: "2023-12-15", time: "10:00 AM", type: "meeting" },
    { id: 2, title: "Project Deadline", date: "2023-12-20", time: "11:30 AM", type: "deadline" },
    { id: 3, title: "Client Call", date: "2023-12-18", time: "2:00 PM", type: "call" },
    { id: 4, title: "Lunch with Team", date: "2023-12-15", time: "12:30 PM", type: "personal" },
  ]
}

function getSampleNotes() {
  return [
    {
      id: 1,
      title: "Project Ideas",
      content:
        "Brainstorming for the new marketing campaign. Need to focus on social media presence and content strategy.",
      date: "2023-12-10",
      starred: true,
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Discussed project timeline and resource allocation. Next steps: finalize budget by Friday.",
      date: "2023-12-08",
      starred: false,
    },
    {
      id: 3,
      title: "Research Findings",
      content:
        "Key insights from market research: 1. Users prefer mobile-first approach. 2. Competitors are focusing on AI features.",
      date: "2023-12-05",
      starred: true,
    },
  ]
}

