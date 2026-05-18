import { create } from "zustand"
import type { Task, TaskFilter, TaskModalState } from "../types"
import { mockTasks } from "../data/tasks"

interface TaskStore {
  tasks: Task[]
  selectedTask: Task | null
  filter: TaskFilter
  searchQuery: string
  modal: TaskModalState

  filteredTasks: () => Task[]

  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  selectTask: (task: Task | null) => void
  setFilter: (filter: Partial<TaskFilter>) => void
  resetFilter: () => void
  setSearchQuery: (query: string) => void
  openModal: (mode: "create" | "edit", task?: Task) => void
  closeModal: () => void
}

const defaultFilter: TaskFilter = {
  status: "",
  category: "",
  priority: "",
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: mockTasks,
  selectedTask: null,
  filter: { ...defaultFilter },
  searchQuery: "",
  modal: { open: false, mode: "create" },

  filteredTasks: () => {
    const { tasks, filter, searchQuery } = get()
    return tasks.filter((task) => {
      if (filter.status && task.status !== filter.status) return false
      if (
        filter.category &&
        task.category.toLowerCase() !== filter.category.toLowerCase()
      )
        return false
      if (filter.priority && task.priority !== filter.priority) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !task.title.toLowerCase().includes(q) &&
          !task.description.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  },

  addTask: (task) =>
    set((state) => ({ tasks: [task, ...state.tasks] })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
      selectedTask:
        state.selectedTask?.id === id
          ? { ...state.selectedTask, ...updates }
          : state.selectedTask,
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      selectedTask:
        state.selectedTask?.id === id ? null : state.selectedTask,
    })),

  selectTask: (task) => set({ selectedTask: task }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  resetFilter: () => set({ filter: { ...defaultFilter } }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  openModal: (mode, task) =>
    set({ modal: { open: true, mode, task } }),

  closeModal: () =>
    set({ modal: { open: false, mode: "create", task: undefined } }),
}))
