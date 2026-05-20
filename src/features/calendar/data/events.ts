import type { CalendarEvent } from "../types"

const now = new Date()

const dayStr = (n: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() + n)
  return d.toISOString()
}

const hourStr = (dayOffset: number, hour: number, minute = 0) => {
  const d = new Date(now)
  d.setDate(d.getDate() + dayOffset)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Calculus Final Exam Review",
    description: "Review integration techniques, differential equations, and series convergence for the final exam.",
    category: "Exam",
    startDate: hourStr(0, 9, 0),
    endDate: hourStr(0, 11, 0),
    priority: "High",
    location: "Room 301",
    reminder: true,
    completed: false,
  },
  {
    id: "event-2",
    title: "Study Group - Organic Chemistry",
    description: "Group study session covering alkenes, alkynes, and reaction mechanisms.",
    category: "Study Session",
    startDate: hourStr(0, 14, 0),
    endDate: hourStr(0, 16, 0),
    priority: "Medium",
    location: "Library Study Room B",
    reminder: true,
    completed: false,
  },
  {
    id: "event-3",
    title: "Physics Problem Set 4 Due",
    description: "Complete problems on electromagnetism and wave optics.",
    category: "Assignment",
    startDate: hourStr(1, 23, 59),
    endDate: hourStr(2, 0, 0),
    priority: "High",
    reminder: true,
    completed: false,
  },
  {
    id: "event-4",
    title: "Biology Lab Report Submission",
    description: "Submit lab report on DNA replication and protein synthesis experiments.",
    category: "Assignment",
    startDate: dayStr(3),
    endDate: dayStr(3),
    priority: "Medium",
    reminder: false,
    completed: false,
  },
  {
    id: "event-5",
    title: "Meeting with Academic Advisor",
    description: "Discuss course selection for next semester and research opportunities.",
    category: "Meeting",
    startDate: hourStr(2, 10, 0),
    endDate: hourStr(2, 11, 0),
    priority: "Medium",
    location: "Advisor Office, 2nd Floor",
    reminder: true,
    completed: false,
  },
  {
    id: "event-6",
    title: "Linear Algebra Study Session",
    description: "Review eigenvalues, eigenvectors, and diagonalization with study group.",
    category: "Study Session",
    startDate: hourStr(4, 15, 0),
    endDate: hourStr(4, 17, 0),
    priority: "Low",
    location: "Student Center",
    reminder: false,
    completed: false,
  },
  {
    id: "event-7",
    title: "English Literature Essay Due",
    description: "Submit comparative analysis of Shakespearean sonnets.",
    category: "Assignment",
    startDate: dayStr(5),
    endDate: dayStr(5),
    priority: "High",
    reminder: true,
    completed: false,
  },
  {
    id: "event-8",
    title: "Personal Study Time - Programming",
    description: "Work on personal project building a web application with Next.js.",
    category: "Personal",
    startDate: hourStr(1, 19, 0),
    endDate: hourStr(1, 21, 0),
    priority: "Low",
    reminder: false,
    completed: false,
  },
  {
    id: "event-9",
    title: "History Midterm Exam",
    description: "Midterm covering World War I, World War II, and Cold War periods.",
    category: "Exam",
    startDate: hourStr(6, 8, 0),
    endDate: hourStr(6, 10, 30),
    priority: "High",
    location: "Auditorium A",
    reminder: true,
    completed: false,
  },
  {
    id: "event-10",
    title: "Weekly Review Session",
    description: "Weekly review of all subjects covered this week. Identify weak areas.",
    category: "Study Session",
    startDate: hourStr(6, 14, 0),
    endDate: hourStr(6, 16, 0),
    priority: "Medium",
    location: "Home",
    reminder: true,
    completed: false,
  },
  {
    id: "event-11",
    title: "Morning Workout & Planning",
    description: "Exercise and plan the day's study schedule.",
    category: "Personal",
    startDate: hourStr(0, 6, 30),
    endDate: hourStr(0, 7, 30),
    priority: "Low",
    reminder: false,
    completed: true,
  },
  {
    id: "event-12",
    title: "Study Group Meetup",
    description: "Meet with classmates to discuss upcoming assignments and share notes.",
    category: "Meeting",
    startDate: hourStr(7, 12, 0),
    endDate: hourStr(7, 13, 0),
    priority: "Low",
    location: "Cafeteria",
    reminder: false,
    completed: false,
  },
]
