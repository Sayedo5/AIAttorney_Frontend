// Drafter API Service
import { apiService } from './api';
import type { DrafterTemplate, Document, ApiResponse } from '@/types';

export interface DraftGenerationRequest {
  templateId: string;
  fieldValues: Record<string, string>;
  customInstructions?: string;
}

export interface DraftGenerationResponse {
  documentId: string;
  content: string;
  title: string;
}

class DrafterApiService {
  async getTemplates(category?: string): Promise<ApiResponse<DrafterTemplate[]>> {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    return apiService.get<DrafterTemplate[]>('/drafter/templates', params);
  }

  async getTemplate(id: string): Promise<ApiResponse<DrafterTemplate>> {
    return apiService.get<DrafterTemplate>(`/drafter/templates/${id}`);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>('/drafter/categories');
  }

  async generateDraft(request: DraftGenerationRequest): Promise<ApiResponse<DraftGenerationResponse>> {
    return apiService.post<DraftGenerationResponse>('/drafter/generate', request);
  }

  async saveDraft(documentId: string, content: string, title?: string): Promise<ApiResponse<Document>> {
    return apiService.put<Document>(`/drafter/drafts/${documentId}`, { content, title });
  }

  async getSavedDrafts(): Promise<ApiResponse<Document[]>> {
    return apiService.get<Document[]>('/drafter/drafts');
  }

  async deleteDraft(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/drafter/drafts/${id}`);
  }

  async getBookmarkedTemplates(): Promise<ApiResponse<DrafterTemplate[]>> {
    return apiService.get<DrafterTemplate[]>('/drafter/templates/bookmarked');
  }

  async toggleTemplateBookmark(templateId: string, isBookmarked: boolean): Promise<ApiResponse<void>> {
    return apiService.put<void>(`/drafter/templates/${templateId}/bookmark`, { isBookmarked });
  }

  async uploadPersonalTemplate(file: File, metadata: { name: string; category: string }): Promise<ApiResponse<DrafterTemplate>> {
    return apiService.uploadFile<DrafterTemplate>('/drafter/templates/personal', file, metadata);
  }
}

export const drafterApi = new DrafterApiService();
export default drafterApi;
