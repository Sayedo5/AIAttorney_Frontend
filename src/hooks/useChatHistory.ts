import { useState, useEffect, useCallback } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  attachments?: Array<{
    name: string;
    size: number;
    type: string;
    preview?: string;
  }>;
}

export interface ChatConversation {
  id: string;
  title: string;
  preview: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "completed";
}

const CHAT_HISTORY_KEY = "ai-attorney-chat-history";
const MAX_CONVERSATIONS = 100;

export function useChatHistory() {
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(conversations));
  }, [conversations]);

  const createConversation = useCallback((firstMessage: ChatMessage): string => {
    const id = `chat-${Date.now()}`;
    const title = firstMessage.text.slice(0, 50) + (firstMessage.text.length > 50 ? "..." : "");
    
    const newConversation: ChatConversation = {
      id,
      title,
      preview: firstMessage.text.slice(0, 100),
      messages: [firstMessage],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
    };

    setConversations((prev) => [newConversation, ...prev].slice(0, MAX_CONVERSATIONS));
    return id;
  }, []);

  const addMessage = useCallback((conversationId: string, message: ChatMessage) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newMessages = [...conv.messages, message];
          return {
            ...conv,
            messages: newMessages,
            preview: message.text.slice(0, 100) || conv.preview,
            updatedAt: new Date().toISOString(),
            status: !message.isUser ? "completed" : "active",
          };
        }
        return conv;
      })
    );
  }, []);

  const getConversation = useCallback((id: string): ChatConversation | undefined => {
    return conversations.find((conv) => conv.id === id);
  }, [conversations]);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
  }, []);

  const clearAllConversations = useCallback(() => {
    setConversations([]);
  }, []);

  const updateConversationTitle = useCallback((id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, title: newTitle } : conv
      )
    );
  }, []);

  // Group conversations by date
  const getGroupedConversations = useCallback(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const groups: Record<string, ChatConversation[]> = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      "This Month": [],
      Older: [],
    };

    conversations.forEach((conv) => {
      const convDate = new Date(conv.updatedAt);
      const isToday = convDate.toDateString() === today.toDateString();
      const isYesterday = convDate.toDateString() === yesterday.toDateString();
      const isThisWeek = convDate >= lastWeek;
      const isThisMonth = convDate >= lastMonth;

      if (isToday) {
        groups.Today.push(conv);
      } else if (isYesterday) {
        groups.Yesterday.push(conv);
      } else if (isThisWeek) {
        groups["This Week"].push(conv);
      } else if (isThisMonth) {
        groups["This Month"].push(conv);
      } else {
        groups.Older.push(conv);
      }
    });

    // Filter out empty groups
    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  }, [conversations]);

  return {
    conversations,
    createConversation,
    addMessage,
    getConversation,
    deleteConversation,
    clearAllConversations,
    updateConversationTitle,
    getGroupedConversations,
  };
}
