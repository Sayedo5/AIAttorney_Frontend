// Document Review Context
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Document } from '@/types';

interface ReviewResult {
  id: string;
  documentId: string;
  summary: string;
  keyPoints: string[];
  issues: { severity: 'low' | 'medium' | 'high'; description: string }[];
  suggestions: string[];
  createdAt: Date;
}

interface DocumentReviewContextType {
  uploadedDocuments: Document[];
  currentReview: ReviewResult | null;
  isReviewing: boolean;
  
  // Actions
  uploadDocument: (file: File) => Promise<Document>;
  reviewDocument: (documentId: string, query?: string) => Promise<ReviewResult>;
  deleteDocument: (id: string) => void;
  clearReview: () => void;
}

const DocumentReviewContext = createContext<DocumentReviewContextType | undefined>(undefined);

const UPLOADED_DOCS_KEY = 'ai_attorney_uploaded_docs';

export function DocumentReviewProvider({ children }: { children: ReactNode }) {
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>(() => {
    const stored = localStorage.getItem(UPLOADED_DOCS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [currentReview, setCurrentReview] = useState<ReviewResult | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const saveDocuments = useCallback((docs: Document[]) => {
    localStorage.setItem(UPLOADED_DOCS_KEY, JSON.stringify(docs));
    setUploadedDocuments(docs);
  }, []);

  const uploadDocument = useCallback(async (file: File): Promise<Document> => {
    // Create a local document reference
    const doc: Document = {
      id: crypto.randomUUID(),
      title: file.name,
      type: 'uploaded',
      fileUrl: URL.createObjectURL(file),
      fileType: file.type,
      fileSize: file.size,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    saveDocuments([doc, ...uploadedDocuments]);
    return doc;
  }, [uploadedDocuments, saveDocuments]);

  const reviewDocument = useCallback(async (documentId: string, query?: string): Promise<ReviewResult> => {
    setIsReviewing(true);
    
    // Simulate AI review
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const document = uploadedDocuments.find(d => d.id === documentId);
    
    const review: ReviewResult = {
      id: crypto.randomUUID(),
      documentId,
      summary: `This ${document?.title || 'document'} appears to be a legal document containing standard contractual provisions. The document is structured appropriately and follows conventional legal formatting.`,
      keyPoints: [
        'The document establishes terms between two parties',
        'Standard liability clauses are included',
        'Dispute resolution mechanism is specified',
        'Termination conditions are clearly defined',
      ],
      issues: [
        { severity: 'medium', description: 'Clause 5.2 contains ambiguous language that could lead to interpretation disputes' },
        { severity: 'low', description: 'Consider updating force majeure clause to include pandemic-related events' },
      ],
      suggestions: [
        'Add a confidentiality clause if dealing with sensitive information',
        'Consider including a governing law clause specifying jurisdiction',
        'Review indemnification provisions for completeness',
      ],
      createdAt: new Date(),
    };
    
    setCurrentReview(review);
    setIsReviewing(false);
    
    return review;
  }, [uploadedDocuments]);

  const deleteDocument = useCallback((id: string) => {
    saveDocuments(uploadedDocuments.filter(d => d.id !== id));
    if (currentReview?.documentId === id) {
      setCurrentReview(null);
    }
  }, [uploadedDocuments, currentReview, saveDocuments]);

  const clearReview = useCallback(() => {
    setCurrentReview(null);
  }, []);

  return (
    <DocumentReviewContext.Provider value={{
      uploadedDocuments,
      currentReview,
      isReviewing,
      uploadDocument,
      reviewDocument,
      deleteDocument,
      clearReview,
    }}>
      {children}
    </DocumentReviewContext.Provider>
  );
}

export function useDocumentReview() {
  const context = useContext(DocumentReviewContext);
  if (!context) {
    throw new Error('useDocumentReview must be used within a DocumentReviewProvider');
  }
  return context;
}
