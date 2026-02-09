// Library API Service (Typesense integration)
import { apiService } from './api';
import type { CaseLibraryItem, ApiResponse, PaginatedResponse } from '@/types';

export interface LibrarySearchParams {
  query: string;
  category?: string;
  court?: string;
  yearFrom?: number;
  yearTo?: number;
  page?: number;
  pageSize?: number;
}

export interface Act {
  id: string;
  title: string;
  year: string;
  description: string;
  sections: ActSection[];
  isBookmarked?: boolean;
}

export interface ActSection {
  id: string;
  number: string;
  title: string;
  content: string;
}

export interface Code {
  id: string;
  title: string;
  abbreviation: string;
  description: string;
  chapters: CodeChapter[];
  isBookmarked?: boolean;
}

export interface CodeChapter {
  id: string;
  number: string;
  title: string;
  sections: ActSection[];
}

class LibraryApiService {
  // Case Library Search
  async searchCases(params: LibrarySearchParams): Promise<ApiResponse<PaginatedResponse<CaseLibraryItem>>> {
    const queryParams: Record<string, string> = {
      query: params.query,
    };
    if (params.category) queryParams.category = params.category;
    if (params.court) queryParams.court = params.court;
    if (params.yearFrom) queryParams.yearFrom = params.yearFrom.toString();
    if (params.yearTo) queryParams.yearTo = params.yearTo.toString();
    if (params.page) queryParams.page = params.page.toString();
    if (params.pageSize) queryParams.pageSize = params.pageSize.toString();
    
    return apiService.get<PaginatedResponse<CaseLibraryItem>>('/library/cases', queryParams);
  }

  async getCaseDetails(id: string): Promise<ApiResponse<CaseLibraryItem>> {
    return apiService.get<CaseLibraryItem>(`/library/cases/${id}`);
  }

  async toggleCaseBookmark(id: string, isBookmarked: boolean): Promise<ApiResponse<void>> {
    return apiService.put<void>(`/library/cases/${id}/bookmark`, { isBookmarked });
  }

  // Acts
  async getActs(category?: string): Promise<ApiResponse<Act[]>> {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    return apiService.get<Act[]>('/library/acts', params);
  }

  async getActDetails(id: string): Promise<ApiResponse<Act>> {
    return apiService.get<Act>(`/library/acts/${id}`);
  }

  async searchActs(query: string): Promise<ApiResponse<Act[]>> {
    return apiService.get<Act[]>('/library/acts/search', { query });
  }

  // Codes
  async getCodes(): Promise<ApiResponse<Code[]>> {
    return apiService.get<Code[]>('/library/codes');
  }

  async getCodeDetails(id: string): Promise<ApiResponse<Code>> {
    return apiService.get<Code>(`/library/codes/${id}`);
  }

  async searchCodes(query: string): Promise<ApiResponse<Code[]>> {
    return apiService.get<Code[]>('/library/codes/search', { query });
  }

  // High Court Specific
  async getHighCourtCases(court: 'islamabad' | 'lahore' | 'peshawar' | 'sindh', params?: LibrarySearchParams): Promise<ApiResponse<PaginatedResponse<CaseLibraryItem>>> {
    const queryParams: Record<string, string> = {
      court,
    };
    if (params?.query) queryParams.query = params.query;
    if (params?.page) queryParams.page = params.page.toString();
    if (params?.pageSize) queryParams.pageSize = params.pageSize.toString();
    
    return apiService.get<PaginatedResponse<CaseLibraryItem>>('/library/highcourt', queryParams);
  }

  // KP Laws
  async getKPLaws(): Promise<ApiResponse<Act[]>> {
    return apiService.get<Act[]>('/library/kp-laws');
  }

  async getKPLawDetails(id: string): Promise<ApiResponse<Act>> {
    return apiService.get<Act>(`/library/kp-laws/${id}`);
  }

  // Bookmarks
  async getBookmarkedCases(): Promise<ApiResponse<CaseLibraryItem[]>> {
    return apiService.get<CaseLibraryItem[]>('/library/bookmarks/cases');
  }

  async getBookmarkedActs(): Promise<ApiResponse<Act[]>> {
    return apiService.get<Act[]>('/library/bookmarks/acts');
  }

  // Statistics
  async getLibraryStats(): Promise<ApiResponse<{
    totalCases: number;
    totalActs: number;
    totalCodes: number;
    recentlyAdded: number;
  }>> {
    return apiService.get('/library/stats');
  }
}

export const libraryApi = new LibraryApiService();
export default libraryApi;
