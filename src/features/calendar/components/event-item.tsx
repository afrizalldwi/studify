import React from "react"
import { EventApi } from "@fullcalendar/core"
import { Badge } from "@/components/ui/badge"

interface EventItemProps {
  event: EventApi
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { title, extendedProps } = event
  const { category, priority, completed } = extendedProps

  return (
    <div className="flex flex-col p-1 text-xs">
      <span className="font-semibold truncate">{title}</span>
      <div className="flex items-center gap-1 mt-1">
        {category && (
          <Badge
            variant="outline"
            className="px-1 py-0 text-[10px]"
          >
            {category}
          </Badge>
        )}
        {priority && (
          <Badge
            variant={
              priority === "High"
                ? "destructive"
                : priority === "Medium"
                ? "default"
                : "secondary"
            }
            className="px-1 py-0 text-[10px]"
          >
            {priority}
          </Badge>
        )}
        {completed && (
          <Badge
            variant="secondary"
            className="px-1 py-0 text-[10px]"
          >
            Done
          </Badge>
        )}
      </div>
    </div>
  )
}
