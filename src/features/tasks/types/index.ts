export interface Task {
  id: string
  title: string
  description: string
  category: string
  dueDate: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in_progress" | "completed"
  progress: number
  createdAt: string
}

export interface TaskFilter {
  status: string
  category: string
  priority: string
}

export interface TaskModalState {
  open: boolean
  mode: "create" | "edit"
  task?: Task
}
