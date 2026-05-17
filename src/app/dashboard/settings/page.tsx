"use client"

import { SectionHeader } from "@/components/shared/section-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Settings"
        subtitle="Manage your account settings."
      />
      <EmptyState
        icon={Settings}
        title="Settings coming soon"
        description="Account and app settings will be available here."
      />
    </div>
  )
}
