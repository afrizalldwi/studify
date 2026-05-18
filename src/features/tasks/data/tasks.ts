import type { Task } from "../types"

const now = new Date()

const daysFromNow = (n: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + n)
  return d.toISOString().split("T")[0]
}

const hoursAgo = (n: number) => {
  const d = new Date(now)
  d.setHours(d.getHours() - n)
  return d.toISOString()
}

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete Calculus Chapter 5 Exercises",
    description:
      "Finish all odd-numbered problems from Chapter 5 on integration techniques. Focus on u-substitution and integration by parts.",
    category: "Mathematics",
    dueDate: daysFromNow(1),
    priority: "high",
    status: "in_progress",
    progress: 60,
    createdAt: hoursAgo(48),
  },
  {
    id: "task-2",
    title: "Write Essay on Photosynthesis",
    description:
      "Write a 1500-word essay covering light-dependent and light-independent reactions, including diagrams.",
    category: "Biology",
    dueDate: daysFromNow(3),
    priority: "medium",
    status: "todo",
    progress: 0,
    createdAt: hoursAgo(72),
  },
  {
    id: "task-3",
    title: "Review Organic Chemistry Notes",
    description:
      "Review chapters on alkanes, alkenes, and alkynes. Prepare summary sheets for functional groups.",
    category: "Chemistry",
    dueDate: daysFromNow(2),
    priority: "high",
    status: "in_progress",
    progress: 40,
    createdAt: hoursAgo(24),
  },
  {
    id: "task-4",
    title: "Prepare History Presentation",
    description:
      "Create a 10-slide presentation on World War II major events and their global impact.",
    category: "History",
    dueDate: daysFromNow(5),
    priority: "low",
    status: "todo",
    progress: 0,
    createdAt: hoursAgo(96),
  },
  {
    id: "task-5",
    title: "Solve Physics Problem Set 3",
    description:
      "Complete problems on electromagnetism including Maxwell's equations and wave propagation.",
    category: "Physics",
    dueDate: daysFromNow(4),
    priority: "medium",
    status: "todo",
    progress: 10,
    createdAt: hoursAgo(36),
  },
  {
    id: "task-6",
    title: "English Vocabulary Quiz Prep",
    description:
      "Study 50 new vocabulary words for the weekly quiz. Focus on etymology and usage in sentences.",
    category: "English",
    dueDate: daysFromNow(0),
    priority: "high",
    status: "completed",
    progress: 100,
    createdAt: hoursAgo(12),
  },
  {
    id: "task-7",
    title: "Linear Algebra Matrix Operations",
    description:
      "Practice matrix multiplication, determinants, and finding eigenvalues for upcoming exam.",
    category: "Mathematics",
    dueDate: daysFromNow(6),
    priority: "medium",
    status: "todo",
    progress: 0,
    createdAt: hoursAgo(6),
  },
  {
    id: "task-8",
    title: "DNA Replication Diagram",
    description:
      "Draw and label a detailed diagram of DNA replication including leading and lagging strands.",
    category: "Biology",
    dueDate: daysFromNow(7),
    priority: "low",
    status: "completed",
    progress: 100,
    createdAt: hoursAgo(120),
  },
  {
    id: "task-9",
    title: "Thermodynamics Lab Report",
    description:
      "Write lab report on enthalpy changes in chemical reactions. Include data tables and analysis.",
    category: "Chemistry",
    dueDate: daysFromNow(3),
    priority: "high",
    status: "in_progress",
    progress: 75,
    createdAt: hoursAgo(18),
  },
  {
    id: "task-10",
    title: "Shakespeare Sonnet Analysis",
    description:
      "Analyze Sonnet 18 and Sonnet 130. Compare themes, structure, and literary devices used.",
    category: "English",
    dueDate: daysFromNow(8),
    priority: "low",
    status: "todo",
    progress: 0,
    createdAt: hoursAgo(10),
  },
]
