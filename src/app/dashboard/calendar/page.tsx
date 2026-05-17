"use client"

import { SectionHeader } from "@/components/shared/section-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Calendar } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Calendar"
        subtitle="View your study schedule."
      />
      <EmptyState
        icon={Calendar}
        title="No events yet"
        description="Calendar feature coming soon."
      />
    </div>
  )
}
