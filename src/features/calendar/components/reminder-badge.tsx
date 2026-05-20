import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReminderBadgeProps {
  enabled: boolean
  className?: string
}

export function ReminderBadge({ enabled, className }: ReminderBadgeProps) {
  if (!enabled) return null

  return (
    <span className={cn("inline-flex items-center text-xs text-amber-500", className)}>
      <Bell className="mr-1 h-3 w-3" />
      Reminder set
    </span>
  )
}
