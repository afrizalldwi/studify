import { create } from "zustand";
import type { User } from "@/types";

const MOCK_USER: User = {
  id: "mock-user-1",
  name: "John Doe",
  email: "john@studify.app",
  avatar: undefined,
  createdAt: new Date().toISOString(),
};

const MOCK_TOKEN = "mock-jwt-token-12345";

const MOCK_CREDENTIALS = {
  email: "john@studify.app",
  password: "password123",
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

function simulateDelay(ms = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      await simulateDelay();

      if (
        email !== MOCK_CREDENTIALS.email ||
        password !== MOCK_CREDENTIALS.password
      ) {
        throw new Error("Invalid email or password. Try john@studify.app / password123");
      }

      localStorage.setItem("token", MOCK_TOKEN);
      set({
        user: MOCK_USER,
        token: MOCK_TOKEN,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      await simulateDelay();

      const newUser: User = {
        id: "mock-user-" + Date.now(),
        name,
        email,
        avatar: undefined,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("token", MOCK_TOKEN);
      set({
        user: newUser,
        token: MOCK_TOKEN,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set({ isLoading: true });
    try {
      await simulateDelay(500);
      set({ user: MOCK_USER, token: MOCK_TOKEN, isAuthenticated: true });
    } catch {
      localStorage.removeItem("token");
    } finally {
      set({ isLoading: false });
    }
  },
}));
