// Document Review API Functions
import { post, get } from "./api";

export interface ReviewResult {
  id: string;
  documentId: string;
  summary: string;
  keyPoints: string[];
  legalIssues: string[];
  recommendations: string[];
  riskLevel: "low" | "medium" | "high";
  createdAt: string;
}

export interface ReviewQuestion {
  id: string;
  question: string;
  answer: string;
  sources: string[];
}

export const reviewDocument = async (
  documentId: string,
  token: string
): Promise<ReviewResult> => {
  return post("/document-review/analyze", { documentId }, token);
};

export const getReviewHistory = async (
  documentId: string,
  token: string
): Promise<ReviewResult[]> => {
  return get(`/document-review/history/${documentId}`, token);
};

export const askDocumentQuestion = async (
  documentId: string,
  question: string,
  token: string
): Promise<ReviewQuestion> => {
  return post("/document-review/ask", { documentId, question }, token);
};

export const getDocumentQuestions = async (
  documentId: string,
  token: string
): Promise<ReviewQuestion[]> => {
  return get(`/document-review/questions/${documentId}`, token);
};
