// Feedback API Service
import { apiService } from './api';
import type { Feedback, ApiResponse } from '@/types';

class FeedbackApiService {
  async submitFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<ApiResponse<Feedback>> {
    return apiService.post<Feedback>('/feedback', feedback);
  }

  async getFeedbackHistory(): Promise<ApiResponse<Feedback[]>> {
    return apiService.get<Feedback[]>('/feedback/history');
  }

  async rateChatResponse(messageId: string, rating: 1 | -1, feedback?: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/feedback/chat-response', {
      messageId,
      rating,
      feedback,
    });
  }
}

export const feedbackApi = new FeedbackApiService();
export default feedbackApi;
