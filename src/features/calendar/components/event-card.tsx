import type { CalendarEvent } from "../types"
import { cn } from "@/lib/utils"
import { EventBadge } from "./event-badge"
import { Clock, MapPin } from "lucide-react"

const priorityDot: Record<string, string> = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-slate-400",
}

interface EventCardProps {
  event: CalendarEvent
  onClick?: () => void
  compact?: boolean
}

export function EventCard({ event, onClick, compact }: EventCardProps) {
  const startTime = new Date(event.startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border bg-card p-3 text-left text-sm shadow-sm transition-all hover:shadow-md hover:border-primary/30",
        "dark:border-border dark:hover:border-primary/40"
      )}
    >
      <div className="flex items-start gap-2">
        <span
          className={cn(
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            priorityDot[event.priority]
          )}
        />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate font-medium text-foreground">{event.title}</p>
          {!compact && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {startTime}
              </span>
              {event.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              )}
            </div>
          )}
          <EventBadge category={event.category} />
        </div>
      </div>
    </button>
  )
}
