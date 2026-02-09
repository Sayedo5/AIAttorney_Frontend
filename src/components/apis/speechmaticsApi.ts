// Speechmatics Speech-to-Text API
import { ENV_CONFIG } from "@/config/env.config";

export interface TranscriptionResult {
  text: string;
  confidence: number;
  words: Array<{
    word: string;
    start: number;
    end: number;
    confidence: number;
  }>;
}

export interface TranscriptionOptions {
  language?: string;
  enablePunctuation?: boolean;
  enableDiarization?: boolean;
}

export const transcribeAudio = async (
  audioBlob: Blob,
  options: TranscriptionOptions = {}
): Promise<TranscriptionResult> => {
  const formData = new FormData();
  formData.append("audio", audioBlob);
  formData.append("language", options.language || "en");
  formData.append("punctuation", String(options.enablePunctuation ?? true));
  formData.append("diarization", String(options.enableDiarization ?? false));

  const response = await fetch(`${ENV_CONFIG.API_BASE_URL}/speechmatics/transcribe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV_CONFIG.SPEECHMATICS_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Transcription failed");
  return response.json();
};
