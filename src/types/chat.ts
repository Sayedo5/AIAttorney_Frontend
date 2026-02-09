// Chat Types - Matching React Native structure

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  isStreaming?: boolean;
  isPinned?: boolean;
  isLiked?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'docx' | 'txt' | 'image' | 'excel';
  url: string;
  size: number;
  thumbnail?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'completed';
  isPinned?: boolean;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
}

export interface ChatSession {
  sessionId: string;
  startedAt: Date;
  lastActivityAt: Date;
  messageCount: number;
}

export interface SSEMessage {
  type: 'start' | 'chunk' | 'end' | 'error';
  content?: string;
  messageId?: string;
  error?: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  attachments?: File[];
  webSearch?: boolean;
  language?: 'EN' | 'UR';
}

export interface ChatResponse {
  messageId: string;
  content: string;
  conversationId: string;
  citations?: Citation[];
}

export interface Citation {
  id: string;
  title: string;
  source: string;
  year?: string;
  court?: string;
  url?: string;
}
