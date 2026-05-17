"use client"

import { SectionHeader } from "@/components/shared/section-header"
import { EmptyState } from "@/components/shared/empty-state"
import { StickyNote } from "lucide-react"

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Notes"
        subtitle="Manage your study notes."
      />
      <EmptyState
        icon={StickyNote}
        title="No notes yet"
        description="Notes feature coming soon."
      />
    </div>
  )
}
