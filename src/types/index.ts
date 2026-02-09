// All Types - Central export

export * from './chat';

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  type: 'draft' | 'uploaded' | 'template' | 'reviewed';
  content?: string;
  fileUrl?: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  isBookmarked?: boolean;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content: string;
  createdAt: Date;
  createdBy: string;
}

// Case Types
export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  judge?: string;
  status: 'pending' | 'ongoing' | 'decided' | 'disposed';
  nextHearingDate?: Date;
  clientName?: string;
  opposingParty?: string;
  description?: string;
  notes?: string;
  isBookmarked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseLibraryItem {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: string;
  summary?: string;
  fullText?: string;
  category: string;
  isBookmarked?: boolean;
}

// Cause List Types
export interface CauseListItem {
  id: string;
  caseNumber: string;
  caseTitle: string;
  court: string;
  bench: string;
  serialNumber: number;
  hearingDate: Date;
  status: 'listed' | 'heard' | 'adjourned' | 'disposed';
}

// Diary Types
export interface DiaryEntry {
  id: string;
  caseId: string;
  title: string;
  description: string;
  date: Date;
  reminderDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isCompleted: boolean;
  createdAt: Date;
}

// Drafter Types
export interface DrafterTemplate {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  icon: string;
  isPremium: boolean;
  fields: TemplateField[];
}

export interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'number';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

// Plan Types
export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: PlanLimits;
  isPopular?: boolean;
}

export interface PlanLimits {
  chatMessages: number;
  documents: number;
  cases: number;
  storage: number; // in MB
}

// Feedback Types
export interface Feedback {
  id: string;
  type: 'bug' | 'feature' | 'general';
  subject: string;
  message: string;
  rating?: number;
  createdAt: Date;
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'chat' | 'document' | 'case' | 'library';
  title: string;
  subtitle?: string;
  snippet?: string;
  score: number;
  data: unknown;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'reminder';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
