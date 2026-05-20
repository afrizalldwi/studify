import { useCalendarStore } from "../store/calendar-store"
import { Button } from "@/components/ui/button"
import { EventBadge } from "./event-badge"
import { ReminderBadge } from "./reminder-badge"
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Pencil,
  Trash2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const priorityColors: Record<string, string> = {
  High: "text-rose-500",
  Medium: "text-amber-500",
  Low: "text-slate-400",
}

export function EventDetailPanel() {
  const { selectedEvent, selectEvent, openModal, deleteEvent } = useCalendarStore()

  if (!selectedEvent) return null

  const startDate = new Date(selectedEvent.startDate)
  const endDate = new Date(selectedEvent.endDate)

  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const timeStr = `${startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn("h-3 w-3 rounded-full", priorityColors[selectedEvent.priority])} />
            <h3 className="font-semibold">{selectedEvent.title}</h3>
          </div>
          <EventBadge category={selectedEvent.category} />
        </div>
        <button
          type="button"
          onClick={() => selectEvent(null)}
          className="rounded-md p-1 text-muted-foreground hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{timeStr}</span>
        </div>
        {selectedEvent.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{selectedEvent.location}</span>
          </div>
        )}
        {selectedEvent.description && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <FileText className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="leading-relaxed">{selectedEvent.description}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-medium", priorityColors[selectedEvent.priority])}>
            {selectedEvent.priority} Priority
          </span>
        </div>
        <ReminderBadge enabled={!!selectedEvent.reminder} />
      </div>

      <div className="mt-5 flex items-center gap-2 border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openModal("edit", selectedEvent)}
        >
          <Pencil className="mr-1 h-3 w-3" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteEvent(selectedEvent.id)
            selectEvent(null)
          }}
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Delete
        </Button>
      </div>
    </div>
  )
}
