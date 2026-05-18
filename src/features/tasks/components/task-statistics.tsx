"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ListTodo, CheckCircle2, Timer, AlertTriangle } from "lucide-react"
import type { Task } from "../types"

interface TaskStatisticsProps {
  tasks: Task[]
}

export function TaskStatistics({ tasks }: TaskStatisticsProps) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === "completed").length
  const inProgress = tasks.filter((t) => t.status === "in_progress").length
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const overdue = tasks.filter((t) => {
    if (t.status === "completed") return false
    return new Date(t.dueDate) < today
  }).length

  const stats = [
    {
      icon: ListTodo,
      label: "Total Tasks",
      value: total,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: completed,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: Timer,
      label: "In Progress",
      value: inProgress,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: AlertTriangle,
      label: "Overdue",
      value: overdue,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30",
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
