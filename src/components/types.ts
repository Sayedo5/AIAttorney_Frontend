// Component Types
import type { ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ClickableProps {
  onClick?: () => void;
  disabled?: boolean;
}

export interface LoadingProps {
  isLoading?: boolean;
}

// Case Card Props
export interface CaseCardProps extends BaseComponentProps, ClickableProps {
  caseNumber: string;
  title: string;
  court: string;
  status: 'pending' | 'ongoing' | 'decided' | 'disposed';
  date?: Date;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

// Document Card Props
export interface DocumentCardProps extends BaseComponentProps, ClickableProps {
  title: string;
  type: 'pdf' | 'doc' | 'docx' | 'txt' | 'image';
  size: number;
  date: Date;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

// Search Bar Props
export interface SearchBarProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onClear?: () => void;
  showVoice?: boolean;
  onVoiceStart?: () => void;
}

// Filter Props
export interface FilterChipProps extends BaseComponentProps, ClickableProps {
  label: string;
  isActive?: boolean;
  icon?: ReactNode;
}

// Modal Props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
}

// Gradient Button Props
export interface GradientButtonProps extends BaseComponentProps, ClickableProps, LoadingProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Pagination Props
export interface PaginationProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
}

// Status Badge Props
export interface StatusBadgeProps extends BaseComponentProps {
  status: 'pending' | 'ongoing' | 'decided' | 'disposed' | 'active' | 'completed' | 'urgent' | 'high' | 'medium' | 'low';
  size?: 'sm' | 'md';
}

// Category Toggle Props
export interface CategoryToggleProps extends BaseComponentProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

// Accordion Props
export interface AccordionItemProps extends BaseComponentProps {
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
}
