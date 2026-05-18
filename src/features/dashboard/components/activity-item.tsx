"use client"

import type { LucideIcon } from "lucide-react"

interface ActivityItemProps {
  icon: LucideIcon
  description: string
  time: string
  isLast?: boolean
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function ActivityItem({
  icon: Icon,
  description,
  time,
  isLast,
}: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className="flex-1 pb-4">
        <p className="text-sm">{description}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {timeAgo(time)}
        </p>
      </div>
    </div>
  )
}
