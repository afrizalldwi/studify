import { useCalendarStore } from "../store/calendar-store"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CalendarHeader() {
  const { openModal } = useCalendarStore()
  const monthName = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground">{monthName}</p>
      </div>
      <Button onClick={() => openModal("create")}>
        <Plus className="mr-1 h-4 w-4" />
        Add Event
      </Button>
    </div>
  )
}
