// Document API Service
import { apiService } from './api';
import type { Document, DocumentVersion, ApiResponse, PaginatedResponse } from '@/types';

class DocumentApiService {
  async getDocuments(params?: {
    type?: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<Document>>> {
    const queryParams: Record<string, string> = {};
    if (params?.type) queryParams.type = params.type;
    if (params?.page) queryParams.page = params.page.toString();
    if (params?.pageSize) queryParams.pageSize = params.pageSize.toString();
    if (params?.search) queryParams.search = params.search;
    
    return apiService.get<PaginatedResponse<Document>>('/documents', queryParams);
  }

  async getDocument(id: string): Promise<ApiResponse<Document>> {
    return apiService.get<Document>(`/documents/${id}`);
  }

  async createDocument(document: Partial<Document>): Promise<ApiResponse<Document>> {
    return apiService.post<Document>('/documents', document);
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<ApiResponse<Document>> {
    return apiService.put<Document>(`/documents/${id}`, updates);
  }

  async deleteDocument(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/documents/${id}`);
  }

  async uploadDocument(file: File, metadata?: { title?: string; tags?: string[] }): Promise<ApiResponse<Document>> {
    return apiService.uploadFile<Document>('/documents/upload', file, {
      title: metadata?.title || file.name,
      tags: metadata?.tags?.join(',') || '',
    });
  }

  async getVersions(documentId: string): Promise<ApiResponse<DocumentVersion[]>> {
    return apiService.get<DocumentVersion[]>(`/documents/${documentId}/versions`);
  }

  async saveVersion(documentId: string, content: string): Promise<ApiResponse<DocumentVersion>> {
    return apiService.post<DocumentVersion>(`/documents/${documentId}/versions`, { content });
  }

  async toggleBookmark(id: string, isBookmarked: boolean): Promise<ApiResponse<Document>> {
    return apiService.put<Document>(`/documents/${id}/bookmark`, { isBookmarked });
  }

  async downloadDocument(id: string, format: 'pdf' | 'docx'): Promise<Blob | null> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/documents/${id}/download?format=${format}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) return null;
      return response.blob();
    } catch {
      return null;
    }
  }
}

export const documentApi = new DocumentApiService();
export default documentApi;
