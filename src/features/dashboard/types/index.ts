export interface DashboardTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  progress: number;
}

export interface DashboardNote {
  id: string;
  title: string;
  category: string;
  preview: string;
  lastEdited: string;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  studyHours: number;
  streak: number;
  weeklyProductivity: number[];
  completedThisWeek: number;
  consistencyRate: number;
  mostProductiveSubject: string;
}

export interface ActivityItem {
  id: string;
  type: "task_completed" | "note_created" | "session_completed" | "deck_reviewed";
  description: string;
  time: string;
  icon: string;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  weeklyData: { day: string; active: boolean }[];
  achievementBadge?: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  href?: string;
  action?: () => void;
}
