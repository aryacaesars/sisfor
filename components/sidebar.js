"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  StickyNote,
  Settings,
  Users,
  BarChart,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Notes", href: "/notes", icon: StickyNote },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center text-white">A</span>
            <span>InfoSystem</span>
          </Link>
        )}
        {collapsed && (
          <span className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-full p-1 hover:bg-gray-100",
            collapsed ? "absolute -right-3 top-7 bg-white border shadow-sm" : "",
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  pathname === item.href ? "bg-gray-100 text-gray-900 font-medium" : "",
                  collapsed ? "justify-center" : "",
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t p-4">
        <div
          className={cn(
            "flex items-center gap-3 rounded-md bg-blue-50 p-3 text-blue-900",
            collapsed ? "justify-center" : "",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
          {!collapsed && <span className="text-sm font-medium">Online</span>}
        </div>
      </div>
    </div>
  )
}

