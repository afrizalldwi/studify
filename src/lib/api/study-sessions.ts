import apiClient from "./client";
import type {
  StudySession,
  CreateStudySessionPayload,
  UpdateStudySessionPayload,
} from "@/types";

export const studySessionsApi = {
  getAll: async (): Promise<StudySession[]> => {
    const { data } = await apiClient.get<StudySession[]>("/study-sessions");
    return data;
  },

  getById: async (id: string): Promise<StudySession> => {
    const { data } = await apiClient.get<StudySession>(
      `/study-sessions/${id}`
    );
    return data;
  },

  create: async (
    payload: CreateStudySessionPayload
  ): Promise<StudySession> => {
    const { data } = await apiClient.post<StudySession>(
      "/study-sessions",
      payload
    );
    return data;
  },

  update: async (
    id: string,
    payload: UpdateStudySessionPayload
  ): Promise<StudySession> => {
    const { data } = await apiClient.put<StudySession>(
      `/study-sessions/${id}`,
      payload
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/study-sessions/${id}`);
  },
};
