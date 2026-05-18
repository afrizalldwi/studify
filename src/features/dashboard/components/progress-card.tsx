import { Progress } from "@/components/ui/progress"

interface ProgressCardProps {
  label: string
  value: number
  max?: number
}

export function ProgressCard({
  label,
  value,
  max = 100,
}: ProgressCardProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
