import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface NotesStatsCardProps {
  icon: LucideIcon
  label: string
  value: number | string
  className?: string
}

export function NotesStatsCard({ icon: Icon, label, value, className }: NotesStatsCardProps) {
  return (
    <div className={cn("flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5", className)}>
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
        <p className="text-xs font-semibold leading-tight">{value}</p>
      </div>
    </div>
  )
}
