import type { DashboardTask } from "../types";

const now = new Date();

const addDays = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const mockTasks: DashboardTask[] = [
  {
    id: "task-1",
    title: "Complete Calculus Chapter 5 Exercises",
    subject: "Mathematics",
    dueDate: addDays(1),
    priority: "high",
    status: "in_progress",
    progress: 60,
  },
  {
    id: "task-2",
    title: "Write Essay on Photosynthesis",
    subject: "Biology",
    dueDate: addDays(3),
    priority: "medium",
    status: "pending",
    progress: 15,
  },
  {
    id: "task-3",
    title: "Review Organic Chemistry Notes",
    subject: "Chemistry",
    dueDate: addDays(2),
    priority: "high",
    status: "in_progress",
    progress: 40,
  },
  {
    id: "task-4",
    title: "Prepare History Presentation",
    subject: "History",
    dueDate: addDays(5),
    priority: "low",
    status: "pending",
    progress: 0,
  },
  {
    id: "task-5",
    title: "Solve Physics Problem Set 3",
    subject: "Physics",
    dueDate: addDays(4),
    priority: "medium",
    status: "pending",
    progress: 10,
  },
  {
    id: "task-6",
    title: "Complete English Vocabulary Quiz",
    subject: "English",
    dueDate: addDays(0),
    priority: "high",
    status: "completed",
    progress: 100,
  },
];
