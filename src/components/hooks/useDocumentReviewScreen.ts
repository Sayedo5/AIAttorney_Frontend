import { useState, useCallback } from "react";
import { useChat } from "./useChat";

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

export function useDocumentReviewScreen() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const chat = useChat({
    onError: (error) => {
      console.error("Document review error:", error);
    },
  });

  const uploadDocument = useCallback(async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newDoc: UploadedDocument = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocumentId(newDoc.id);
    setIsUploading(false);
    chat.clearMessages();

    return newDoc;
  }, [chat]);

  const selectDocument = useCallback((id: string) => {
    setSelectedDocumentId(id);
    chat.clearMessages();
  }, [chat]);

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (selectedDocumentId === id) {
      setSelectedDocumentId(null);
      chat.clearMessages();
    }
  }, [selectedDocumentId, chat]);

  const downloadDocument = useCallback((id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      // TODO: Implement actual download
      console.log("Downloading:", doc.name);
    }
  }, [documents]);

  const askQuestion = useCallback(
    async (question: string) => {
      if (!selectedDocumentId) return;
      await chat.sendMessage(question, selectedDocumentId);
    },
    [selectedDocumentId, chat]
  );

  const selectedDocument = documents.find((d) => d.id === selectedDocumentId);

  return {
    documents,
    selectedDocument,
    selectedDocumentId,
    isUploading,
    uploadDocument,
    selectDocument,
    deleteDocument,
    downloadDocument,
    askQuestion,
    ...chat,
  };
}
