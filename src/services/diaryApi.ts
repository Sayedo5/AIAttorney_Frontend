// Diary API Service
import { apiService } from './api';
import type { DiaryEntry, ApiResponse, PaginatedResponse } from '@/types';

class DiaryApiService {
  async getEntries(params?: {
    caseId?: string;
    startDate?: string;
    endDate?: string;
    priority?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PaginatedResponse<DiaryEntry>>> {
    const queryParams: Record<string, string> = {};
    if (params?.caseId) queryParams.caseId = params.caseId;
    if (params?.startDate) queryParams.startDate = params.startDate;
    if (params?.endDate) queryParams.endDate = params.endDate;
    if (params?.priority) queryParams.priority = params.priority;
    if (params?.page) queryParams.page = params.page.toString();
    if (params?.pageSize) queryParams.pageSize = params.pageSize.toString();
    
    return apiService.get<PaginatedResponse<DiaryEntry>>('/diary', queryParams);
  }

  async getEntry(id: string): Promise<ApiResponse<DiaryEntry>> {
    return apiService.get<DiaryEntry>(`/diary/${id}`);
  }

  async createEntry(entry: Omit<DiaryEntry, 'id' | 'createdAt'>): Promise<ApiResponse<DiaryEntry>> {
    return apiService.post<DiaryEntry>('/diary', entry);
  }

  async updateEntry(id: string, updates: Partial<DiaryEntry>): Promise<ApiResponse<DiaryEntry>> {
    return apiService.put<DiaryEntry>(`/diary/${id}`, updates);
  }

  async deleteEntry(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/diary/${id}`);
  }

  async toggleComplete(id: string, isCompleted: boolean): Promise<ApiResponse<DiaryEntry>> {
    return apiService.put<DiaryEntry>(`/diary/${id}/complete`, { isCompleted });
  }

  async getUpcomingReminders(days: number = 7): Promise<ApiResponse<DiaryEntry[]>> {
    return apiService.get<DiaryEntry[]>('/diary/reminders', { days: days.toString() });
  }

  async getEntriesByDate(date: string): Promise<ApiResponse<DiaryEntry[]>> {
    return apiService.get<DiaryEntry[]>('/diary/by-date', { date });
  }
}

export const diaryApi = new DiaryApiService();
export default diaryApi;
