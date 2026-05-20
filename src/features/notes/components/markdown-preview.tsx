"use client"

import { cn } from "@/lib/utils"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  html = html
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```(\w*)\n?([\s\S]*?)```/gm, '<pre><code>$2</code></pre>')
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n{2,}/g, "\n")

  const lines = html.split("\n")
  let inList = false
  const result: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("<li>")) {
      if (!inList) {
        result.push("<ul>")
        inList = true
      }
      result.push(trimmed)
    } else {
      if (inList) {
        result.push("</ul>")
        inList = false
      }
      if (
        trimmed &&
        !trimmed.startsWith("<h") &&
        !trimmed.startsWith("<blockquote") &&
        !trimmed.startsWith("</blockquote") &&
        !trimmed.startsWith("<pre") &&
        !trimmed.startsWith("</pre>") &&
        !trimmed.startsWith("<ul>") &&
        !trimmed.startsWith("</ul>")
      ) {
        result.push(`<p>${trimmed}</p>`)
      } else if (trimmed) {
        result.push(trimmed)
      }
    }
  }
  if (inList) result.push("</ul>")

  return result.join("\n")
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  const html = renderMarkdown(content)

  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none overflow-y-auto",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-xl prose-h1:mt-6 prose-h1:mb-3",
        "prose-h2:text-lg prose-h2:mt-5 prose-h2:mb-2",
        "prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2",
        "prose-p:text-sm prose-p:leading-relaxed prose-p:my-2",
        "prose-strong:font-semibold",
        "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-normal",
        "prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4 prose-pre:overflow-x-auto",
        "prose-pre:border prose-pre:border-border",
        "prose-pre:code:bg-transparent prose-pre:code:p-0",
        "prose-blockquote:border-l-2 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground",
        "prose-ul:my-2 prose-li:text-sm prose-li:leading-relaxed",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
