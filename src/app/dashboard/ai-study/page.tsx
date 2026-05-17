"use client"

import { SectionHeader } from "@/components/shared/section-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Brain } from "lucide-react"

export default function AIStudyPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="AI Study"
        subtitle="AI-powered study recommendations."
      />
      <EmptyState
        icon={Brain}
        title="Not available yet"
        description="AI Study feature coming soon."
      />
    </div>
  )
}
