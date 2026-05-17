"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { studySessionsApi } from "@/lib/api/study-sessions"
import { flashcardsApi } from "@/lib/api/flashcards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/shared/section-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Skeleton } from "@/components/shared/skeleton"
import { BookOpen, GraduationCap, Clock, TrendingUp } from "lucide-react"
import type { StudySession, FlashcardDeck } from "@/types"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [decks, setDecks] = useState<FlashcardDeck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      studySessionsApi.getAll(),
      flashcardsApi.getDecks(),
    ])
      .then(([sessionsData, decksData]) => {
        setSessions(sessionsData)
        setDecks(decksData)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totalStudyHours = sessions.reduce(
    (acc, s) => acc + Math.floor(s.duration / 60),
    0
  )
  const completedSessions = sessions.filter((s) => s.completed).length
  const totalCards = decks.reduce((acc, d) => acc + d.cardCount, 0)

  const stats = [
    {
      title: "Study Sessions",
      value: sessions.length,
      icon: BookOpen,
    },
    {
      title: "Completed",
      value: completedSessions,
      icon: TrendingUp,
    },
    {
      title: "Study Hours",
      value: totalStudyHours,
      icon: Clock,
    },
    {
      title: "Flashcards",
      value: totalCards,
      icon: GraduationCap,
    },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`Welcome, ${user?.name || "Student"}`}
        subtitle="Here's an overview of your study progress."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? (
                  <Skeleton className="h-7 w-12" />
                ) : (
                  stat.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Study Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : sessions.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No study sessions yet"
                description="Start your first session!"
              />
            ) : (
              <div className="space-y-3">
                {sessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{session.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.subject}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{Math.floor(session.duration / 60)}h {session.duration % 60}m</p>
                      <p>{session.completed ? "Completed" : "In progress"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Flashcard Decks</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : decks.length === 0 ? (
              <EmptyState
                icon={GraduationCap}
                title="No flashcard decks yet"
                description="Create your first deck!"
              />
            ) : (
              <div className="space-y-3">
                {decks.slice(0, 5).map((deck) => (
                  <div
                    key={deck.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{deck.title}</p>
                      {deck.description && (
                        <p className="text-xs text-muted-foreground">
                          {deck.description}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {deck.cardCount} cards
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
