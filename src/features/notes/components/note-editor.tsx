"use client"

import { useState, useRef, useCallback } from "react"
import { NotesToolbar } from "./notes-toolbar"
import { MarkdownPreview } from "./markdown-preview"
import { useNoteStore } from "../store/note-store"
import { cn } from "@/lib/utils"

export function NotesEditor() {
  const { selectedNote, editorContent, setEditorContent, updateNote } = useNoteStore()
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMarkdown = useCallback(
    (before: string, after = "") => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selected = editorContent.slice(start, end)
      const newText =
        editorContent.slice(0, start) +
        before +
        selected +
        after +
        editorContent.slice(end)

      setEditorContent(newText)

      requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + selected.length
        )
      })
    },
    [editorContent, setEditorContent]
  )

  if (!selectedNote) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Select a note to start editing
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-sm font-medium truncate">{selectedNote.title}</span>
        <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              activeTab === "edit" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              activeTab === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Preview
          </button>
        </div>
      </div>

      {activeTab === "edit" ? (
        <>
          <NotesToolbar onInsert={insertMarkdown} />
          <textarea
            ref={textareaRef}
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            onBlur={() => {
              if (selectedNote && editorContent !== selectedNote.content) {
                updateNote(selectedNote.id, { content: editorContent })
              }
            }}
            className="flex-1 resize-none border-0 bg-transparent p-4 text-sm leading-relaxed outline-none placeholder:text-muted-foreground font-mono"
            placeholder="Start writing in markdown..."
          />
        </>
      ) : (
        <MarkdownPreview content={editorContent} className="flex-1" />
      )}
    </div>
  )
}
