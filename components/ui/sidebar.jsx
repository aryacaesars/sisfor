"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef(({ className, collapsible = "desktop", ...props }, ref) => (
  <aside ref={ref} data-collapsible={collapsible} className={cn("w-64 flex-col", className)} {...props} />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <header ref={ref} className={cn("", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn("", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium", {
  variants: {
    variant: {
      default: "hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-transparent hover:text-accent-foreground",
      outline: "border hover:bg-accent hover:text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const SidebarMenuButton = React.forwardRef(({ className, variant, ...props }, ref) => (
  <button ref={ref} className={cn(sidebarMenuButtonVariants({ variant }), className)} {...props} />
))
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mx-3 my-2 h-px bg-muted", className)} {...props} />
))
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute inset-y-0 right-0 w-px bg-border", className)} {...props} />
))
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col flex-1", className)} {...props} />
))
SidebarInset.displayName = "SidebarInset"

const SidebarProvider = ({ children }) => {
  return <div className="flex min-h-screen">{children}</div>
}

const SidebarTrigger = () => {
  return (
    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 md:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
      </svg>
      <span className="sr-only">Toggle Menu</span>
    </button>
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
}

