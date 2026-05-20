"use client"

import { cn } from "@/lib/utils"
import type { Note } from "../types"
import { TrendingUp, BarChart3, Clock, Star } from "lucide-react"
import { useMemo } from "react"

interface NotesInsightsCardProps {
  notes: Note[]
  className?: string
}

export function NotesInsightsCard({ notes, className }: NotesInsightsCardProps) {
  const insights = useMemo(() => {
    const categoryCounts: Record<string, number> = {}
    for (const n of notes) {
      categoryCounts[n.category] = (categoryCounts[n.category] || 0) + 1
    }
    const mostActive = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]

    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const createdThisWeek = notes.filter((n) => new Date(n.createdAt) >= weekAgo).length

    return {
      mostActiveCategory: mostActive ? mostActive[0] : "—",
      mostActiveCount: mostActive ? mostActive[1] : 0,
      createdThisWeek,
      totalFavorites: notes.filter((n) => n.favorite).length,
    }
  }, [notes])

  const items = [
    { icon: BarChart3, label: "Most Active", value: insights.mostActiveCategory },
    { icon: TrendingUp, label: "Created This Week", value: insights.createdThisWeek },
    { icon: Clock, label: "Total Categories", value: new Set(notes.map((n) => n.category)).size },
    { icon: Star, label: "Favorites", value: insights.totalFavorites },
  ]

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Insights</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-lg px-2 py-1.5">
            <div className="flex items-center gap-2">
              <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-xs font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
