import { useState, useCallback, useRef, useEffect } from "react";

interface SSEChatOptions {
  endpoint: string;
  onMessage?: (message: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

interface SSEChatState {
  isConnected: boolean;
  isStreaming: boolean;
  currentResponse: string;
  error: Error | null;
}

export function useSSEChat(options: SSEChatOptions) {
  const [state, setState] = useState<SSEChatState>({
    isConnected: false,
    isStreaming: false,
    currentResponse: "",
    error: null,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const connect = useCallback(() => {
    if (eventSourceRef.current) return;

    const eventSource = new EventSource(options.endpoint);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setState((prev) => ({ ...prev, isConnected: true, error: null }));
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chunk") {
          setState((prev) => ({
            ...prev,
            currentResponse: prev.currentResponse + data.content,
            isStreaming: true,
          }));
          options.onMessage?.(data.content);
        } else if (data.type === "done") {
          setState((prev) => ({ ...prev, isStreaming: false }));
          options.onComplete?.();
        }
      } catch (error) {
        console.error("Failed to parse SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      const err = new Error("SSE connection error");
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isStreaming: false,
        error: err,
      }));
      options.onError?.(err);
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [options]);

  const disconnect = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    setState((prev) => ({
      ...prev,
      isConnected: false,
      isStreaming: false,
    }));
  }, []);

  const sendMessage = useCallback(
    async (message: string, sessionId?: string) => {
      setState((prev) => ({ ...prev, currentResponse: "", isStreaming: true }));

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(options.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, sessionId }),
          signal: abortControllerRef.current.signal,
        });

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setState((prev) => ({
            ...prev,
            currentResponse: prev.currentResponse + chunk,
          }));
          options.onMessage?.(chunk);
        }

        setState((prev) => ({ ...prev, isStreaming: false }));
        options.onComplete?.();
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setState((prev) => ({
            ...prev,
            isStreaming: false,
            error: error as Error,
          }));
          options.onError?.(error as Error);
        }
      }
    },
    [options]
  );

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    setState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  const clearResponse = useCallback(() => {
    setState((prev) => ({ ...prev, currentResponse: "" }));
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
      abortControllerRef.current?.abort();
    };
  }, [disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    sendMessage,
    stopStreaming,
    clearResponse,
  };
}
