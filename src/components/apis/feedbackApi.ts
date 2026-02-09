// Feedback API Functions
import { post } from "./api";

export interface FeedbackData {
  type: "suggestion" | "bug" | "compliment" | "other";
  rating?: number;
  name?: string;
  email?: string;
  subject?: string;
  message: string;
}

export interface FeedbackResponse {
  success: boolean;
  ticketId?: string;
  message: string;
}

export const submitFeedback = async (
  feedback: FeedbackData,
  token?: string
): Promise<FeedbackResponse> => {
  return post("/feedback/submit", feedback, token);
};

export const submitMessageFeedback = async (
  messageId: string,
  isPositive: boolean,
  comment?: string,
  token?: string
): Promise<{ success: boolean }> => {
  return post("/feedback/message", { messageId, isPositive, comment }, token);
};
