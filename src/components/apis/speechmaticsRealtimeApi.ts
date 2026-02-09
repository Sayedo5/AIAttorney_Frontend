// Speechmatics Realtime Speech-to-Text API
import { ENV_CONFIG } from "@/config/env.config";

export interface RealtimeTranscriptEvent {
  type: "partial" | "final";
  text: string;
  startTime: number;
  endTime: number;
}

export type TranscriptCallback = (event: RealtimeTranscriptEvent) => void;

export class RealtimeSpeechmatics {
  private websocket: WebSocket | null = null;
  private onTranscript: TranscriptCallback | null = null;
  private mediaRecorder: MediaRecorder | null = null;

  async connect(onTranscript: TranscriptCallback): Promise<void> {
    this.onTranscript = onTranscript;
    
    const wsUrl = `wss://api.speechmatics.com/v1/realtime?jwt=${ENV_CONFIG.SPEECHMATICS_API_KEY}`;
    this.websocket = new WebSocket(wsUrl);

    return new Promise((resolve, reject) => {
      if (!this.websocket) return reject(new Error("WebSocket not initialized"));

      this.websocket.onopen = () => resolve();
      this.websocket.onerror = (error) => reject(error);
      this.websocket.onmessage = this.handleMessage.bind(this);
    });
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "transcript" && this.onTranscript) {
        this.onTranscript({
          type: data.is_final ? "final" : "partial",
          text: data.text,
          startTime: data.start_time,
          endTime: data.end_time,
        });
      }
    } catch (error) {
      console.error("Failed to parse transcript:", error);
    }
  }

  async startRecording(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && this.websocket?.readyState === WebSocket.OPEN) {
        this.websocket.send(event.data);
      }
    };

    this.mediaRecorder.start(250); // Send chunks every 250ms
  }

  stopRecording(): void {
    this.mediaRecorder?.stop();
    this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
    this.mediaRecorder = null;
  }

  disconnect(): void {
    this.stopRecording();
    this.websocket?.close();
    this.websocket = null;
    this.onTranscript = null;
  }
}
