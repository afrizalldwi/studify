"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/shared/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { StatCard } from "@/features/dashboard/components/stat-card"
import { SectionCard } from "@/features/dashboard/components/section-card"
import { TaskPreviewCard } from "@/features/dashboard/components/task-preview-card"
import { NotePreviewCard } from "@/features/dashboard/components/note-preview-card"
import { QuickActionButton } from "@/features/dashboard/components/quick-action-button"
import { ActivityItem } from "@/features/dashboard/components/activity-item"
import { ProgressCard } from "@/features/dashboard/components/progress-card"
import { mockTasks } from "@/features/dashboard/data/tasks"
import { mockNotes } from "@/features/dashboard/data/notes"
import { mockStats } from "@/features/dashboard/data/stats"
import { mockActivity } from "@/features/dashboard/data/activity"
import { mockStreak } from "@/features/dashboard/data/streak"
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Flame,
  TrendingUp,
  PlusCircle,
  FilePlus,
  Calendar,
  Sparkles,
  Target,
  Award,
  FileText,
  Layers,
  ChevronRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const activityIconMap: Record<string, LucideIcon> = {
  check: CheckCircle2,
  file: FileText,
  clock: Clock,
  layers: Layers,
}

const motivationalQuotes = [
  "Every step forward is progress.",
  "Stay consistent, stay curious.",
  "Learning today, leading tomorrow.",
  "Small daily improvements lead to big results.",
]

export default function DashboardPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const hour = new Date().getHours()
  let greeting = "Good evening"
  if (hour < 12) greeting = "Good morning"
  else if (hour < 17) greeting = "Good afternoon"

  const today = new Date()
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const quote = motivationalQuotes[today.getDate() % motivationalQuotes.length]

  const statCards = [
    {
      icon: ListTodo,
      label: "Total Tasks",
      value: mockStats.totalTasks,
      trend: { value: 12, isUp: true },
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: mockStats.completedTasks,
      trend: { value: 75, isUp: true },
    },
    {
      icon: Clock,
      label: "Study Hours",
      value: mockStats.studyHours,
      trend: { value: 8, isUp: true },
    },
    {
      icon: Flame,
      label: "Day Streak",
      value: mockStats.streak,
      trend: { value: 0, isUp: true },
    },
    {
      icon: TrendingUp,
      label: "This Week",
      value: `${mockStats.completedThisWeek} tasks`,
      trend: { value: 15, isUp: true },
    },
  ]

  const quickActions = [
    {
      icon: PlusCircle,
      label: "Add Task",
      onClick: () => router.push("/dashboard/sessions"),
    },
    {
      icon: FilePlus,
      label: "Create Note",
      onClick: () => router.push("/dashboard/notes"),
    },
    {
      icon: Calendar,
      label: "Open Calendar",
      onClick: () => router.push("/dashboard/calendar"),
    },
    {
      icon: Sparkles,
      label: "Ask AI",
      onClick: () => router.push("/dashboard/ai-study"),
    },
  ]

  const upcomingTasks = mockTasks.filter((t) => t.status !== "completed")
  const recentNotes = mockNotes

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-64 lg:col-span-2" />
          <Skeleton className="h-64" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-48 lg:col-span-2" />
          <Skeleton className="h-48" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-72 lg:col-span-2" />
          <Skeleton className="h-72" />
        </div>
        <Skeleton className="h-32" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-background border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {greeting}, {user?.name || "Student"}!
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{dateStr}</p>
              <p className="mt-2 text-sm italic text-primary">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard
            title="Upcoming Tasks"
            action={
              <Link
                href="/dashboard/sessions"
                className="flex items-center gap-0.5 text-xs text-primary hover:underline"
              >
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            }
          >
            {upcomingTasks.length === 0 ? (
              <EmptyState
                icon={ListTodo}
                title="No upcoming tasks"
                description="You're all caught up!"
              />
            ) : (
              <div className="space-y-2">
                {upcomingTasks.slice(0, 4).map((task) => (
                  <TaskPreviewCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Study Progress">
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg
                    className="h-24 w-24 -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - mockStats.completedTasks / mockStats.totalTasks)}`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute text-lg font-bold">
                    {Math.round(
                      (mockStats.completedTasks / mockStats.totalTasks) * 100
                    )}
                    %
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Overall Progress
                </p>
              </div>
              <ProgressCard
                label="Weekly Goal"
                value={mockStats.completedThisWeek}
                max={10}
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tasks Done</span>
                <span className="font-medium">
                  {mockStats.completedTasks}/{mockStats.totalTasks}
                </span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard
            title="Recent Notes"
            action={
              <Link
                href="/dashboard/notes"
                className="flex items-center gap-0.5 text-xs text-primary hover:underline"
              >
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            }
          >
            {recentNotes.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No notes yet"
                description="Create your first note!"
              />
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {recentNotes.map((note) => (
                  <NotePreviewCard key={note.id} note={note} />
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <QuickActionButton
                  key={action.label}
                  icon={action.icon}
                  label={action.label}
                  onClick={action.onClick}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Activity">
            {mockActivity.length === 0 ? (
              <EmptyState
                icon={Clock}
                title="No recent activity"
                description="Your activity will appear here."
              />
            ) : (
              <div className="mt-2">
                {mockActivity.map((item, i) => (
                  <ActivityItem
                    key={item.id}
                    icon={activityIconMap[item.icon] || Clock}
                    description={item.description}
                    time={item.time}
                    isLast={i === mockActivity.length - 1}
                  />
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Study Streak">
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-1">
                <Flame className="h-8 w-8 text-orange-500" />
                <span className="text-3xl font-bold">
                  {mockStreak.currentStreak}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">day streak</p>

              {mockStreak.achievementBadge && (
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-600 dark:text-orange-400">
                  <Award className="h-4 w-4" />
                  {mockStreak.achievementBadge}
                </div>
              )}

              <div className="mt-4 flex justify-center gap-1.5">
                {mockStreak.weeklyData.map((d) => (
                  <div key={d.day} className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        d.active ? "bg-primary" : "bg-muted-foreground/20"
                      )}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {d.day}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Longest streak: {mockStreak.longestStreak} days
              </p>
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Productivity Summary">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border p-4">
            <Target className="mb-1 h-5 w-5 text-primary" />
            <p className="text-lg font-bold">
              {mockStats.mostProductiveSubject}
            </p>
            <p className="text-xs text-muted-foreground">
              Most Productive Subject
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-4">
            <CheckCircle2 className="mb-1 h-5 w-5 text-primary" />
            <p className="text-lg font-bold">
              {mockStats.completedThisWeek}
            </p>
            <p className="text-xs text-muted-foreground">
              Completed This Week
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-4">
            <TrendingUp className="mb-1 h-5 w-5 text-primary" />
            <p className="text-lg font-bold">{mockStats.consistencyRate}%</p>
            <p className="text-xs text-muted-foreground">
              Consistency Rate
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
