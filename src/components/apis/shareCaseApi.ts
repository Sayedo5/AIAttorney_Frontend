// Share Case API Functions
import { post, get, del } from "./api";

export interface SharedCase {
  id: string;
  caseId: string;
  shareLink: string;
  sharedWith?: string[];
  expiresAt?: string;
  createdAt: string;
}

export interface ShareOptions {
  caseId: string;
  emails?: string[];
  expiresInDays?: number;
  allowDownload?: boolean;
}

export const shareCase = async (
  options: ShareOptions,
  token: string
): Promise<SharedCase> => {
  return post("/cases/share", options, token);
};

export const getSharedCases = async (token: string): Promise<SharedCase[]> => {
  return get("/cases/shared", token);
};

export const getSharedCaseByLink = async (
  shareLink: string
): Promise<{ case: unknown; allowDownload: boolean }> => {
  return get(`/cases/shared/${shareLink}`);
};

export const revokeShare = async (
  shareId: string,
  token: string
): Promise<void> => {
  return del(`/cases/share/${shareId}`, token);
};
