import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  className?: string
}

export function FavoriteButton({ isFavorite, onToggle, className }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className={cn(
        "rounded p-1 transition-colors hover:bg-muted",
        isFavorite ? "text-amber-500" : "text-muted-foreground",
        className
      )}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={cn("h-4 w-4", isFavorite && "fill-current")}
      />
    </button>
  )
}
