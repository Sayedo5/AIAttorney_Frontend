import { useState, useCallback } from "react";
import { useChat } from "./useChat";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
}

export function useChatScreen() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const chat = useChat({
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      lastMessage: "",
      updatedAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    chat.clearMessages();
    setIsDrawerOpen(false);
  }, [chat]);

  const selectSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsDrawerOpen(false);
    // TODO: Load messages for this session
    chat.clearMessages();
  }, [chat]);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      chat.clearMessages();
    }
  }, [currentSessionId, chat]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!currentSessionId) {
        createNewSession();
      }
      await chat.sendMessage(content, currentSessionId || undefined);
      
      // Update session
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? { ...s, lastMessage: content, updatedAt: new Date() }
            : s
        )
      );
    },
    [currentSessionId, chat, createNewSession]
  );

  return {
    ...chat,
    sessions,
    currentSessionId,
    isDrawerOpen,
    setIsDrawerOpen,
    createNewSession,
    selectSession,
    deleteSession,
    sendMessage,
  };
}
