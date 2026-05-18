import type { ActivityItem } from "../types";

export const mockActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "task_completed",
    description: "Completed English Vocabulary Quiz",
    time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    icon: "check",
  },
  {
    id: "act-2",
    type: "note_created",
    description: "Created note: Derivatives and Integration Rules",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: "file",
  },
  {
    id: "act-3",
    type: "session_completed",
    description: "Finished 2-hour study session on Calculus",
    time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    icon: "clock",
  },
  {
    id: "act-4",
    type: "deck_reviewed",
    description: "Reviewed 25 flashcards in Organic Chemistry deck",
    time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    icon: "layers",
  },
  {
    id: "act-5",
    type: "task_completed",
    description: "Marked Physics Problem Set 2 as completed",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    icon: "check",
  },
  {
    id: "act-6",
    type: "note_created",
    description: "Created note: Cell Structure and Functions",
    time: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    icon: "file",
  },
];
