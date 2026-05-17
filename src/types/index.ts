export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface StudySession {
  id: string;
  title: string;
  subject: string;
  duration: number;
  notes?: string;
  date: string;
  completed: boolean;
  userId: string;
}

export interface CreateStudySessionPayload {
  title: string;
  subject: string;
  duration: number;
  notes?: string;
  date?: string;
  completed?: boolean;
}

export interface UpdateStudySessionPayload {
  title?: string;
  subject?: string;
  duration?: number;
  notes?: string;
  date?: string;
  completed?: boolean;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: string;
  cardCount: number;
}

export interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  difficulty?: "easy" | "medium" | "hard";
  lastReviewed?: string;
  nextReview?: string;
}

export interface CreateFlashcardDeckPayload {
  title: string;
  description?: string;
}

export interface CreateFlashcardPayload {
  deckId: string;
  question: string;
  answer: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface ApiError {
  message: string;
  status: number;
}
