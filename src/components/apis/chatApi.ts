// Chat API Functions
import { post, get, del } from "./api";
import type { Message as ChatMessage, ChatSession } from "@/types/chat";

export const sendMessage = async (
  sessionId: string,
  message: string,
  token: string
): Promise<{ response: string; messageId: string }> => {
  return post("/chat/send", { sessionId, message }, token);
};

export const getChatHistory = async (
  sessionId: string,
  token: string
): Promise<ChatMessage[]> => {
  return get(`/chat/history/${sessionId}`, token);
};

export const getChatSessions = async (token: string): Promise<ChatSession[]> => {
  return get("/chat/sessions", token);
};

export const createChatSession = async (
  title: string,
  token: string
): Promise<ChatSession> => {
  return post("/chat/sessions", { title }, token);
};

export const deleteChatSession = async (
  sessionId: string,
  token: string
): Promise<void> => {
  return del(`/chat/sessions/${sessionId}`, token);
};

export const streamMessage = async (
  sessionId: string,
  message: string,
  token: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  // SSE streaming implementation
  const response = await fetch(`/api/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId, message }),
  });

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
};
