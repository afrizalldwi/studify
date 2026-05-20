import type { CalendarEvent } from "../types"
import { cn } from "@/lib/utils"
import { EventBadge } from "./event-badge"
import { Calendar, Clock } from "lucide-react"
import { useMemo } from "react"

const priorityDot: Record<string, string> = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-slate-400",
}

interface UpcomingEventCardProps {
  event: CalendarEvent
  onClick?: () => void
}

export function UpcomingEventCard({ event, onClick }: UpcomingEventCardProps) {
  const startDate = useMemo(() => new Date(event.startDate), [event.startDate])
  const endDate = useMemo(() => new Date(event.endDate), [event.endDate])

  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  const timeStr = `${startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`

  const now = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d
  }, [])

  const isToday = now.toDateString() === startDate.toDateString()
  const isPast = startDate < now && !event.completed
  const isTomorrow = tomorrow.toDateString() === startDate.toDateString()

  let label = dateStr
  if (isToday) label = "Today"
  else if (isTomorrow) label = "Tomorrow"

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border bg-card p-3 text-left text-sm transition-all hover:shadow-md",
        isPast && "opacity-60",
        event.completed && "opacity-50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full", priorityDot[event.priority])} />
            <p className={cn("truncate font-medium", event.completed && "line-through text-muted-foreground")}>
              {event.title}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeStr}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-primary">{label}</span>
            <EventBadge category={event.category} />
          </div>
        </div>
      </div>
    </button>
  )
}
