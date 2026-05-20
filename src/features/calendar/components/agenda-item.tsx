import type { CalendarEvent } from "../types"
import { cn } from "@/lib/utils"
import { EventBadge } from "./event-badge"
import { CheckCircle2, Circle } from "lucide-react"
import { useCalendarStore } from "../store/calendar-store"

interface AgendaItemProps {
  event: CalendarEvent
}

export function AgendaItem({ event }: AgendaItemProps) {
  const { updateEvent } = useCalendarStore()

  const startTime = new Date(event.startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const endTime = new Date(event.endDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border p-3 transition-all hover:bg-accent/50",
        event.completed && "opacity-60"
      )}
    >
      <button
        type="button"
        onClick={() => updateEvent(event.id, { completed: !event.completed })}
        className="mt-0.5 shrink-0"
      >
        {event.completed ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
        )}
      </button>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "truncate text-sm font-medium",
              event.completed && "line-through text-muted-foreground"
            )}
          >
            {event.title}
          </p>
          <EventBadge category={event.category} className="shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">
          {startTime} - {endTime}
        </p>
      </div>
    </div>
  )
}
