import apiClient from "./client";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/register",
      payload
    );
    return data;
  },

  me: async (): Promise<AuthResponse["user"]> => {
    const { data } = await apiClient.get<AuthResponse["user"]>("/auth/me");
    return data;
  },
};
