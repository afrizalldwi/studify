import Link from "next/link"
import { GraduationCap, BookOpen, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Studify</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Your Personal{" "}
              <span className="text-primary">Study Companion</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Track study sessions, create flashcards, and boost your learning
              with AI-powered insights.
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start Studying
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Track Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Log and monitor your study sessions with detailed metrics and
                progress tracking.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Smart Flashcards</h3>
              <p className="text-sm text-muted-foreground">
                Create and review flashcards with spaced repetition for
                effective learning.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized study recommendations and insights powered by
                artificial intelligence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Studify. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
