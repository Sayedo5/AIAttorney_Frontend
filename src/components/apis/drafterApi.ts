// Drafter API Functions
import { post, get, put, del } from "./api";

export interface DraftTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
}

export interface Draft {
  id: string;
  title: string;
  templateId?: string;
  content: string;
  status: "draft" | "final";
  createdAt: string;
  updatedAt: string;
}

export const getTemplates = async (token: string): Promise<DraftTemplate[]> => {
  return get("/drafter/templates", token);
};

export const getTemplateById = async (
  id: string,
  token: string
): Promise<DraftTemplate> => {
  return get(`/drafter/templates/${id}`, token);
};

export const getDrafts = async (token: string): Promise<Draft[]> => {
  return get("/drafter/drafts", token);
};

export const getDraftById = async (id: string, token: string): Promise<Draft> => {
  return get(`/drafter/drafts/${id}`, token);
};

export const createDraft = async (
  draft: Omit<Draft, "id" | "createdAt" | "updatedAt">,
  token: string
): Promise<Draft> => {
  return post("/drafter/drafts", draft, token);
};

export const updateDraft = async (
  id: string,
  draft: Partial<Draft>,
  token: string
): Promise<Draft> => {
  return put(`/drafter/drafts/${id}`, draft, token);
};

export const deleteDraft = async (id: string, token: string): Promise<void> => {
  return del(`/drafter/drafts/${id}`, token);
};

export const generateDraft = async (
  templateId: string,
  variables: Record<string, string>,
  token: string
): Promise<{ content: string }> => {
  return post("/drafter/generate", { templateId, variables }, token);
};
