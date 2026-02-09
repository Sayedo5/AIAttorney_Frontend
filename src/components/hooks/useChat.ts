import { useState, useCallback, useRef } from "react";
import type { Message as ChatMessage } from "@/types/chat";

interface UseChatOptions {
  onError?: (error: Error) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string, sessionId?: string) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setIsStreaming(true);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        // Simulate streaming response
        const response = "This is a simulated AI response. In production, this would connect to your AI backend and stream the response in real-time.";
        
        for (let i = 0; i <= response.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 20));
          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = response.slice(0, i);
            }
            return updated;
          });
        }
      } catch (error) {
        options.onError?.(error as Error);
        setMessages((prev) => prev.filter((m) => m.id !== assistantMessage.id));
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [options]
  );

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
    setIsLoading(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const retryLastMessage = useCallback(async () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      // Remove last assistant message
      setMessages((prev) => {
        const reversedIndex = [...prev].reverse().findIndex((m) => m.role === "assistant");
        const lastAssistantIndex = reversedIndex > -1 ? prev.length - 1 - reversedIndex : -1;
        if (lastAssistantIndex > -1) {
          return prev.filter((_, i) => i !== lastAssistantIndex);
        }
        return prev;
      });
      await sendMessage(lastUserMessage.content);
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    stopGeneration,
    clearMessages,
    retryLastMessage,
    setMessages,
  };
}
