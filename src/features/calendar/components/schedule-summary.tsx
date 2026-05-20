import { useCalendarStore } from "../store/calendar-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, CheckCircle2, TrendingUp, BookOpen } from "lucide-react"

export function ScheduleSummary() {
  const { events } = useCalendarStore()

  const total = events.length
  const completed = events.filter((e) => e.completed).length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const today = new Date().toDateString()
  const todayEvents = events.filter(
    (e) => new Date(e.startDate).toDateString() === today
  )

  const studyHours = events
    .filter((e) => e.category === "Study Session")
    .reduce((acc, e) => {
      const start = new Date(e.startDate).getTime()
      const end = new Date(e.endDate).getTime()
      return acc + (end - start) / (1000 * 60 * 60)
    }, 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Productivity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-lg border p-3">
            <Target className="mb-1 h-4 w-4 text-primary" />
            <p className="text-lg font-bold">{total}</p>
            <p className="text-[10px] text-muted-foreground">Total Events</p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-3">
            <CheckCircle2 className="mb-1 h-4 w-4 text-primary" />
            <p className="text-lg font-bold">{completionRate}%</p>
            <p className="text-[10px] text-muted-foreground">Completed</p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-3">
            <TrendingUp className="mb-1 h-4 w-4 text-primary" />
            <p className="text-lg font-bold">{studyHours.toFixed(1)}h</p>
            <p className="text-[10px] text-muted-foreground">Study Hours</p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-3">
            <BookOpen className="mb-1 h-4 w-4 text-primary" />
            <p className="text-lg font-bold">{todayEvents.length}</p>
            <p className="text-[10px] text-muted-foreground">Today</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
