// Chat Context - Manages chat state and conversations
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Conversation, Message, ChatRequest } from '@/types';
import { useLanguage } from './LanguageContext';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  isStreaming: boolean;
  streamingContent: string;
  
  // Actions
  sendMessage: (content: string, attachments?: File[]) => Promise<void>;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  pinMessage: (messageId: string) => void;
  likeMessage: (messageId: string) => void;
  regenerateMessage: (messageId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CONVERSATIONS_KEY = 'ai_attorney_conversations';

export function ChatProvider({ children }: { children: ReactNode }) {
  const { getAIResponse, language } = useLanguage();
  
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const stored = localStorage.getItem(CONVERSATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  const currentConversation = conversations.find(c => c.id === currentConversationId) || null;

  const saveConversations = useCallback((convs: Conversation[]) => {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));
    setConversations(convs);
  }, []);

  const createNewConversation = useCallback(() => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
    };
    
    const updated = [newConv, ...conversations];
    saveConversations(updated);
    setCurrentConversationId(newConv.id);
  }, [conversations, saveConversations]);

  const selectConversation = useCallback((id: string) => {
    setCurrentConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    const updated = conversations.filter(c => c.id !== id);
    saveConversations(updated);
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  }, [conversations, currentConversationId, saveConversations]);

  const sendMessage = useCallback(async (content: string, attachments?: File[]) => {
    let convId = currentConversationId;
    let updatedConversations = [...conversations];
    
    // Create new conversation if none exists
    if (!convId) {
      const newConv: Conversation = {
        id: crypto.randomUUID(),
        title: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
      };
      convId = newConv.id;
      updatedConversations = [newConv, ...updatedConversations];
      setCurrentConversationId(convId);
    }

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments: attachments?.map(f => ({
        id: crypto.randomUUID(),
        name: f.name,
        type: f.type.includes('pdf') ? 'pdf' : f.type.includes('image') ? 'image' : 'doc',
        url: URL.createObjectURL(f),
        size: f.size,
      })),
    };

    updatedConversations = updatedConversations.map(c => 
      c.id === convId 
        ? { ...c, messages: [...c.messages, userMessage], updatedAt: new Date() }
        : c
    );
    saveConversations(updatedConversations);

    // Simulate AI response with streaming
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');

    const aiResponse = getAIResponse();
    let currentContent = '';
    
    // Simulate streaming
    for (let i = 0; i < aiResponse.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 15));
      currentContent = aiResponse.substring(0, i + 1);
      setStreamingContent(currentContent);
    }

    // Add AI message
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    updatedConversations = updatedConversations.map(c => 
      c.id === convId 
        ? { ...c, messages: [...c.messages, aiMessage], updatedAt: new Date() }
        : c
    );
    saveConversations(updatedConversations);
    
    setIsLoading(false);
    setIsStreaming(false);
    setStreamingContent('');
  }, [currentConversationId, conversations, saveConversations, getAIResponse]);

  const pinMessage = useCallback((messageId: string) => {
    if (!currentConversationId) return;
    
    const updated = conversations.map(c => {
      if (c.id !== currentConversationId) return c;
      return {
        ...c,
        messages: c.messages.map(m => 
          m.id === messageId ? { ...m, isPinned: !m.isPinned } : m
        ),
      };
    });
    saveConversations(updated);
  }, [currentConversationId, conversations, saveConversations]);

  const likeMessage = useCallback((messageId: string) => {
    if (!currentConversationId) return;
    
    const updated = conversations.map(c => {
      if (c.id !== currentConversationId) return c;
      return {
        ...c,
        messages: c.messages.map(m => 
          m.id === messageId ? { ...m, isLiked: !m.isLiked } : m
        ),
      };
    });
    saveConversations(updated);
  }, [currentConversationId, conversations, saveConversations]);

  const regenerateMessage = useCallback(async (messageId: string) => {
    // Find the user message before this AI message and resend
    if (!currentConversation) return;
    
    const messageIndex = currentConversation.messages.findIndex(m => m.id === messageId);
    if (messageIndex <= 0) return;
    
    const userMessage = currentConversation.messages[messageIndex - 1];
    if (userMessage.role !== 'user') return;
    
    // Remove the AI message and regenerate
    const updated = conversations.map(c => {
      if (c.id !== currentConversationId) return c;
      return {
        ...c,
        messages: c.messages.filter(m => m.id !== messageId),
      };
    });
    saveConversations(updated);
    
    // Resend the user message
    await sendMessage(userMessage.content);
  }, [currentConversation, currentConversationId, conversations, saveConversations, sendMessage]);

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      isLoading,
      isStreaming,
      streamingContent,
      sendMessage,
      createNewConversation,
      selectConversation,
      deleteConversation,
      pinMessage,
      likeMessage,
      regenerateMessage,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
