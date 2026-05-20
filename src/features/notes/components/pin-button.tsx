import { Pin } from "lucide-react"
import { cn } from "@/lib/utils"

interface PinButtonProps {
  isPinned: boolean
  onToggle: () => void
  className?: string
}

export function PinButton({ isPinned, onToggle, className }: PinButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className={cn(
        "rounded p-1 transition-colors hover:bg-muted",
        isPinned ? "text-primary" : "text-muted-foreground",
        className
      )}
      title={isPinned ? "Unpin" : "Pin"}
    >
      <Pin className={cn("h-4 w-4", isPinned && "fill-current")} />
    </button>
  )
}
