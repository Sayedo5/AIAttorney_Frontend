// Diary API Functions
import { post, get, put, del } from "./api";

export interface DiaryEntry {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  nextHearing: string;
  notes?: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "ongoing" | "disposed";
  createdAt: string;
  updatedAt: string;
}

export const getDiaryEntries = async (token: string): Promise<DiaryEntry[]> => {
  return get("/diary/entries", token);
};

export const getDiaryEntryById = async (
  id: string,
  token: string
): Promise<DiaryEntry> => {
  return get(`/diary/entries/${id}`, token);
};

export const createDiaryEntry = async (
  entry: Omit<DiaryEntry, "id" | "createdAt" | "updatedAt">,
  token: string
): Promise<DiaryEntry> => {
  return post("/diary/entries", entry, token);
};

export const updateDiaryEntry = async (
  id: string,
  entry: Partial<DiaryEntry>,
  token: string
): Promise<DiaryEntry> => {
  return put(`/diary/entries/${id}`, entry, token);
};

export const deleteDiaryEntry = async (
  id: string,
  token: string
): Promise<void> => {
  return del(`/diary/entries/${id}`, token);
};

export const getUpcomingHearings = async (
  days: number,
  token: string
): Promise<DiaryEntry[]> => {
  return get(`/diary/upcoming?days=${days}`, token);
};
