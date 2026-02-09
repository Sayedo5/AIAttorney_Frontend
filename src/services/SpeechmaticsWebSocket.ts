// Speechmatics WebSocket Service for real-time transcription

import { ENV_CONFIG } from "@/config/env.config";

export interface TranscriptEvent {
  type: "partial" | "final";
  text: string;
  startTime: number;
  endTime: number;
  speaker?: string;
}

export interface SpeechmaticsConfig {
  apiKey: string;
  language?: string;
  enablePunctuation?: boolean;
  enableDiarization?: boolean;
  sampleRate?: number;
}

export type TranscriptCallback = (event: TranscriptEvent) => void;
export type ErrorCallback = (error: Error) => void;
export type ConnectionCallback = () => void;

export class SpeechmaticsWebSocket {
  private websocket: WebSocket | null = null;
  private config: SpeechmaticsConfig;
  private onTranscript: TranscriptCallback | null = null;
  private onError: ErrorCallback | null = null;
  private onConnect: ConnectionCallback | null = null;
  private onDisconnect: ConnectionCallback | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private isConnecting = false;

  constructor(config: SpeechmaticsConfig) {
    this.config = {
      language: "en",
      enablePunctuation: true,
      enableDiarization: false,
      sampleRate: 16000,
      ...config,
    };
  }

  async connect(): Promise<void> {
    if (this.isConnecting || this.websocket?.readyState === WebSocket.OPEN) {
      return;
    }

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      try {
        const wsUrl = this.buildWebSocketUrl();
        this.websocket = new WebSocket(wsUrl);

        this.websocket.onopen = () => {
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.sendConfig();
          this.onConnect?.();
          resolve();
        };

        this.websocket.onmessage = this.handleMessage.bind(this);

        this.websocket.onerror = (event) => {
          this.isConnecting = false;
          const error = new Error("WebSocket connection error");
          this.onError?.(error);
          reject(error);
        };

        this.websocket.onclose = () => {
          this.isConnecting = false;
          this.onDisconnect?.();
          this.attemptReconnect();
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  private buildWebSocketUrl(): string {
    const baseUrl = "wss://api.speechmatics.com/v1/realtime";
    return `${baseUrl}?jwt=${this.config.apiKey}`;
  }

  private sendConfig(): void {
    if (this.websocket?.readyState !== WebSocket.OPEN) return;

    const config = {
      message: "StartRecognition",
      audio_format: {
        type: "raw",
        encoding: "pcm_s16le",
        sample_rate: this.config.sampleRate,
      },
      transcription_config: {
        language: this.config.language,
        enable_partials: true,
        punctuation_overrides: {
          permitted_marks: this.config.enablePunctuation
            ? [".", ",", "?", "!"]
            : [],
        },
        diarization: this.config.enableDiarization ? "speaker" : "none",
      },
    };

    this.websocket.send(JSON.stringify(config));
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);

      switch (data.message) {
        case "AddPartialTranscript":
          this.onTranscript?.({
            type: "partial",
            text: this.extractText(data.results),
            startTime: data.results?.[0]?.start_time || 0,
            endTime: data.results?.[data.results.length - 1]?.end_time || 0,
          });
          break;

        case "AddTranscript":
          this.onTranscript?.({
            type: "final",
            text: this.extractText(data.results),
            startTime: data.results?.[0]?.start_time || 0,
            endTime: data.results?.[data.results.length - 1]?.end_time || 0,
            speaker: data.results?.[0]?.speaker,
          });
          break;

        case "Error":
          this.onError?.(new Error(data.reason || "Unknown error"));
          break;
      }
    } catch (error) {
      console.error("Failed to parse message:", error);
    }
  }

  private extractText(results: Array<{ alternatives?: Array<{ content: string }> }>): string {
    if (!results) return "";
    return results
      .map((r) => r.alternatives?.[0]?.content || "")
      .join(" ")
      .trim();
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.onError?.(new Error("Max reconnection attempts reached"));
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.pow(2, this.reconnectAttempts) * 1000;

    setTimeout(() => {
      this.connect().catch(console.error);
    }, delay);
  }

  sendAudio(audioData: ArrayBuffer): void {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.send(audioData);
    }
  }

  endStream(): void {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({ message: "EndOfStream" }));
    }
  }

  disconnect(): void {
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnection
    this.websocket?.close();
    this.websocket = null;
  }

  // Event handlers
  setOnTranscript(callback: TranscriptCallback): void {
    this.onTranscript = callback;
  }

  setOnError(callback: ErrorCallback): void {
    this.onError = callback;
  }

  setOnConnect(callback: ConnectionCallback): void {
    this.onConnect = callback;
  }

  setOnDisconnect(callback: ConnectionCallback): void {
    this.onDisconnect = callback;
  }

  // Status
  get isConnected(): boolean {
    return this.websocket?.readyState === WebSocket.OPEN;
  }
}
