import type { DashboardNote } from "../types";

export const mockNotes: DashboardNote[] = [
  {
    id: "note-1",
    title: "Derivatives and Integration Rules",
    category: "Mathematics",
    preview: "The derivative of a function measures the rate of change. Key rules include power rule, product rule, quotient rule, and chain rule...",
    lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "note-2",
    title: "Cell Structure and Functions",
    category: "Biology",
    preview: "Cells are the basic structural and functional units of life. Eukaryotic cells contain membrane-bound organelles including the nucleus...",
    lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "note-3",
    title: "Newton's Laws of Motion",
    category: "Physics",
    preview: "First Law: An object at rest stays at rest unless acted upon by external force. Second Law: F = ma. Third Law: Every action has equal...",
    lastEdited: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "note-4",
    title: "World War II Timeline",
    category: "History",
    preview: "1939: Germany invades Poland. 1940: Battle of Britain. 1941: Operation Barbarossa, Pearl Harbor. 1942: Battle of Midway...",
    lastEdited: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];
