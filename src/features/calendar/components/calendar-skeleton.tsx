import { Skeleton } from "@/components/shared/skeleton"

export function CalendarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-9" />
        </div>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-9 w-44" />
      </div>

      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-none" />
        ))}
      </div>
    </div>
  )
}
