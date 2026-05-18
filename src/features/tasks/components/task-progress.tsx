import { cn } from "@/lib/utils"

export function TaskProgress({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const color =
    value >= 100
      ? "bg-green-500"
      : value >= 50
        ? "bg-primary"
        : "bg-amber-500"

  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-300", color)}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
