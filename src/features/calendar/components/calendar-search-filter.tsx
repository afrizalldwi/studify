import { useCalendarStore } from "../store/calendar-store"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = ["Assignment", "Study Session", "Exam", "Meeting", "Personal"]
const priorities = ["Low", "Medium", "High"]

export function CalendarSearchFilter() {
  const { searchQuery, setSearchQuery, filter, setFilter, resetFilter } = useCalendarStore()

  const hasFilter = filter.category || filter.priority || searchQuery

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 h-9"
        />
      </div>

      <Select
        value={filter.category || "all-cat"}
        onValueChange={(value) => setFilter({ category: value === "all-cat" ? "" : value })}
      >
        <SelectTrigger className="w-[130px] h-9">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-cat">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filter.priority || "all-pri"}
        onValueChange={(value) => setFilter({ priority: value === "all-pri" ? "" : value })}
      >
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-pri">All Priorities</SelectItem>
          {priorities.map((pri) => (
            <SelectItem key={pri} value={pri}>
              {pri}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilter && (
        <Button variant="ghost" size="sm" onClick={resetFilter} className="h-9">
          <X className="mr-1 h-3 w-3" />
          Clear
        </Button>
      )}
    </div>
  )
}
