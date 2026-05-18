import type { StudyStreak } from "../types";

const today = new Date();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weeklyData: { day: string; active: boolean }[] = [];

for (let i = 6; i >= 0; i--) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  weeklyData.push({
    day: dayNames[d.getDay()],
    active: i < 5,
  });
}

export const mockStreak: StudyStreak = {
  currentStreak: 7,
  longestStreak: 14,
  weeklyData,
  achievementBadge: "7-Day Streak",
};
