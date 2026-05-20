import { useCalendarStore } from "../store/calendar-store"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CalendarView } from "../types"
import { cn } from "@/lib/utils"

const views: { value: CalendarView; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
]

interface CalendarNavigationProps {
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  title: string
}

export function CalendarNavigation({ onPrev, onNext, onToday, title }: CalendarNavigationProps) {
  const { currentView, setView } = useCalendarStore()

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex overflow-hidden rounded-md border">
        {views.map((v) => (
          <button
            key={v.value}
            type="button"
            onClick={() => setView(v.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium transition-colors",
              currentView === v.value
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-accent"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
