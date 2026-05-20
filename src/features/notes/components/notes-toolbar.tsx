"use client"

import { Bold, Italic, Heading1, Heading2, Heading3, List, Code, Quote, ListOrdered } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotesToolbarProps {
  onInsert: (before: string, after?: string) => void
  className?: string
}

const tools = [
  { icon: Heading1, label: "Heading 1", before: "# ", after: "" },
  { icon: Heading2, label: "Heading 2", before: "## ", after: "" },
  { icon: Heading3, label: "Heading 3", before: "### ", after: "" },
  { icon: Bold, label: "Bold", before: "**", after: "**" },
  { icon: Italic, label: "Italic", before: "_", after: "_" },
  { icon: List, label: "Bullet List", before: "- ", after: "" },
  { icon: ListOrdered, label: "Numbered List", before: "1. ", after: "" },
  { icon: Code, label: "Code", before: "```\n", after: "\n```" },
  { icon: Quote, label: "Quote", before: "> ", after: "" },
]

export function NotesToolbar({ onInsert, className }: NotesToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-0.5 border-b border-border px-3 py-2", className)}>
      {tools.map((tool) => (
        <button
          key={tool.label}
          type="button"
          onClick={() => onInsert(tool.before, tool.after)}
          className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={tool.label}
        >
          <tool.icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}
