// Case API Service
import { apiService } from './api';
import type { Case, CauseListItem, ApiResponse, PaginatedResponse } from '@/types';

class CaseApiService {
  // My Cases
  async getMyCases(params?: {
    status?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PaginatedResponse<Case>>> {
    const queryParams: Record<string, string> = {};
    if (params?.status) queryParams.status = params.status;
    if (params?.search) queryParams.search = params.search;
    if (params?.page) queryParams.page = params.page.toString();
    if (params?.pageSize) queryParams.pageSize = params.pageSize.toString();
    
    return apiService.get<PaginatedResponse<Case>>('/cases', queryParams);
  }

  async getCase(id: string): Promise<ApiResponse<Case>> {
    return apiService.get<Case>(`/cases/${id}`);
  }

  async createCase(caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Case>> {
    return apiService.post<Case>('/cases', caseData);
  }

  async updateCase(id: string, updates: Partial<Case>): Promise<ApiResponse<Case>> {
    return apiService.put<Case>(`/cases/${id}`, updates);
  }

  async deleteCase(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/cases/${id}`);
  }

  async toggleBookmark(id: string, isBookmarked: boolean): Promise<ApiResponse<Case>> {
    return apiService.put<Case>(`/cases/${id}/bookmark`, { isBookmarked });
  }

  // Cause List
  async getCauseList(params: {
    court: string;
    date: string;
    bench?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PaginatedResponse<CauseListItem>>> {
    const queryParams: Record<string, string> = {
      court: params.court,
      date: params.date,
    };
    if (params.bench) queryParams.bench = params.bench;
    if (params.page) queryParams.page = params.page.toString();
    if (params.pageSize) queryParams.pageSize = params.pageSize.toString();
    
    return apiService.get<PaginatedResponse<CauseListItem>>('/causelist', queryParams);
  }

  async getCauseListDetails(id: string): Promise<ApiResponse<CauseListItem>> {
    return apiService.get<CauseListItem>(`/causelist/${id}`);
  }

  async getCourts(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>('/causelist/courts');
  }

  async getBenches(court: string): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>('/causelist/benches', { court });
  }

  // Share Case
  async shareCase(caseId: string, recipients: string[]): Promise<ApiResponse<{ shareUrl: string }>> {
    return apiService.post<{ shareUrl: string }>(`/cases/${caseId}/share`, { recipients });
  }

  async getSharedCases(): Promise<ApiResponse<Case[]>> {
    return apiService.get<Case[]>('/cases/shared');
  }
}

export const caseApi = new CaseApiService();
export default caseApi;
