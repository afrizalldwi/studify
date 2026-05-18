"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarItem } from "@/components/shared/sidebar-item"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  ListTodo,
  CheckSquare,
  StickyNote,
  Calendar,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tasks", label: "Tasks", icon: ListTodo },
  { href: "/dashboard/sessions", label: "Study Sessions", icon: CheckSquare },
  { href: "/dashboard/notes", label: "Notes", icon: StickyNote },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/ai-study", label: "AI Study", icon: Brain },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!isCollapsed && (
          <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
            Studify
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            isCollapsed && "justify-center"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
              U
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">
                User
              </span>
              <span className="text-xs text-sidebar-foreground/60">
                Student
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onToggleCollapse}
        className="hidden md:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm transition-colors hover:bg-sidebar-accent"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </div>
  )

  return (
    <>
      <aside className="hidden md:fixed md:inset-y-0 md:z-30 md:flex md:flex-col">
        <div className="relative flex h-full flex-col border-r border-sidebar-border bg-sidebar">
          {sidebarContent}
        </div>
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar shadow-xl animate-in slide-in-from-left duration-300">
            <div className="flex h-full flex-col">{sidebarContent}</div>
          </aside>
        </div>
      )}
    </>
  )
}

export { Sidebar }
