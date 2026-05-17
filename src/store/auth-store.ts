import { create } from "zustand";
import type { User } from "@/types";
import { authApi } from "@/lib/api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: true });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authApi.login({ email, password });
      get().setAuth(user, token);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authApi.register({ name, email, password });
      get().setAuth(user, token);
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
      const user = await authApi.me();
      set({ user, token, isAuthenticated: true });
    } catch {
      localStorage.removeItem("token");
    } finally {
      set({ isLoading: false });
    }
  },
}));
