"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface NotesSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function NotesSearchBar({ value, onChange, placeholder = "Search notes..." }: NotesSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  return (
    <div className="relative flex-1 sm:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-16"
      />
      <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="pointer-events-auto rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {!value && (
          <kbd className={cn(
            "hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5",
            "text-[10px] font-medium text-muted-foreground"
          )}>
            <span className="text-[9px]">⌘</span>K
          </kbd>
        )}
      </div>
    </div>
  )
}
