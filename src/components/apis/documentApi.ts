// Document API Functions
import { post, get, del } from "./api";

export interface Document {
  id: string;
  title: string;
  type: "pdf" | "doc" | "docx" | "txt";
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const uploadDocument = async (
  file: File,
  token: string
): Promise<Document> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/documents/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Upload failed");
  return response.json();
};

export const getDocuments = async (token: string): Promise<Document[]> => {
  return get("/documents", token);
};

export const getDocumentById = async (
  id: string,
  token: string
): Promise<Document> => {
  return get(`/documents/${id}`, token);
};

export const deleteDocument = async (
  id: string,
  token: string
): Promise<void> => {
  return del(`/documents/${id}`, token);
};

export const downloadDocument = async (
  id: string,
  token: string
): Promise<Blob> => {
  const response = await fetch(`/api/documents/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.blob();
};
