// Chat API Service
import { apiService } from './api';
import type { ChatRequest, ChatResponse, Conversation, Message, ApiResponse } from '@/types';

class ChatApiService {
  async sendMessage(request: ChatRequest): Promise<ApiResponse<ChatResponse>> {
    return apiService.post<ChatResponse>('/chat/message', request);
  }

  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return apiService.get<Conversation[]>('/chat/conversations');
  }

  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    return apiService.get<Conversation>(`/chat/conversations/${id}`);
  }

  async deleteConversation(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/chat/conversations/${id}`);
  }

  async pinMessage(messageId: string, isPinned: boolean): Promise<ApiResponse<Message>> {
    return apiService.put<Message>(`/chat/messages/${messageId}/pin`, { isPinned });
  }

  async likeMessage(messageId: string, isLiked: boolean): Promise<ApiResponse<Message>> {
    return apiService.put<Message>(`/chat/messages/${messageId}/like`, { isLiked });
  }

  async regenerateMessage(messageId: string): Promise<ApiResponse<ChatResponse>> {
    return apiService.post<ChatResponse>(`/chat/messages/${messageId}/regenerate`);
  }

  // SSE Streaming for real-time responses
  createStreamConnection(
    request: ChatRequest,
    onMessage: (content: string) => void,
    onComplete: (response: ChatResponse) => void,
    onError: (error: string) => void
  ): EventSource | null {
    // For demo/prototype, we'll simulate streaming
    // In production, this would connect to an SSE endpoint
    const mockResponse = this.getMockResponse(request.message);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < mockResponse.length) {
        onMessage(mockResponse.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete({
          messageId: crypto.randomUUID(),
          content: mockResponse,
          conversationId: request.conversationId || crypto.randomUUID(),
        });
      }
    }, 20);

    return null;
  }

  private getMockResponse(query: string): string {
    const responses: Record<string, string> = {
      default: `Based on Pakistani law, I can provide guidance on your query regarding "${query.substring(0, 50)}..."\n\n**Legal Analysis:**\n\nUnder the relevant provisions of Pakistani law, the key considerations are:\n\n1. **Statutory Framework**: The applicable legislation provides the foundational rules governing this matter.\n\n2. **Case Precedents**: Recent judicial decisions from the Superior Courts have established important principles.\n\n3. **Procedural Requirements**: Certain procedural steps must be followed to ensure compliance.\n\n**Recommendation:**\n\nI would advise consulting with a qualified legal professional for specific guidance tailored to your circumstances.\n\n*Disclaimer: This is general legal information and should not be considered as legal advice.*`,
    };

    return responses.default;
  }
}

export const chatApi = new ChatApiService();
export default chatApi;
