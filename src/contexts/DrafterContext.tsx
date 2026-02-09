// Drafter Context - Manages document drafting
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { DrafterTemplate, Document } from '@/types';

interface DrafterContextType {
  templates: DrafterTemplate[];
  categories: string[];
  savedDrafts: Document[];
  currentDraft: Document | null;
  isGenerating: boolean;
  
  // Actions
  selectTemplate: (template: DrafterTemplate) => void;
  generateDraft: (templateId: string, fieldValues: Record<string, string>) => Promise<Document>;
  saveDraft: (content: string, title?: string) => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  clearCurrentDraft: () => void;
  getTemplatesByCategory: (category: string) => DrafterTemplate[];
  toggleTemplateBookmark: (templateId: string) => void;
}

const DrafterContext = createContext<DrafterContextType | undefined>(undefined);

const SAVED_DRAFTS_KEY = 'ai_attorney_saved_drafts';
const BOOKMARKED_TEMPLATES_KEY = 'ai_attorney_bookmarked_templates';

// Template categories matching React Native structure
const templateCategories = [
  'Civil',
  'Criminal',
  'Family',
  'Corporate',
  'Property',
  'Labour',
  'Constitutional',
  'Banking',
  'Contracts',
];

// Mock templates
const mockTemplates: DrafterTemplate[] = [
  {
    id: '1',
    name: 'Rental Agreement',
    category: 'Property',
    description: 'Standard rental/lease agreement template',
    icon: 'file-text',
    isPremium: false,
    fields: [
      { id: 'landlord', name: 'landlord', label: 'Landlord Name', type: 'text', required: true },
      { id: 'tenant', name: 'tenant', label: 'Tenant Name', type: 'text', required: true },
      { id: 'property', name: 'property', label: 'Property Address', type: 'textarea', required: true },
      { id: 'rent', name: 'rent', label: 'Monthly Rent', type: 'number', required: true },
      { id: 'duration', name: 'duration', label: 'Lease Duration', type: 'select', options: ['6 months', '1 year', '2 years'], required: true },
    ],
  },
  {
    id: '2',
    name: 'Power of Attorney',
    category: 'Civil',
    description: 'General or special power of attorney',
    icon: 'stamp',
    isPremium: false,
    fields: [
      { id: 'principal', name: 'principal', label: 'Principal Name', type: 'text', required: true },
      { id: 'agent', name: 'agent', label: 'Agent Name', type: 'text', required: true },
      { id: 'powers', name: 'powers', label: 'Powers Granted', type: 'textarea', required: true },
    ],
  },
  {
    id: '3',
    name: 'Bail Application',
    category: 'Criminal',
    description: 'Pre-arrest or post-arrest bail application',
    icon: 'shield',
    isPremium: true,
    fields: [
      { id: 'accused', name: 'accused', label: 'Accused Name', type: 'text', required: true },
      { id: 'fir', name: 'fir', label: 'FIR Number', type: 'text', required: true },
      { id: 'section', name: 'section', label: 'Sections Applied', type: 'text', required: true },
      { id: 'grounds', name: 'grounds', label: 'Grounds for Bail', type: 'textarea', required: true },
    ],
  },
  {
    id: '4',
    name: 'Divorce Petition',
    category: 'Family',
    description: 'Khula or divorce petition template',
    icon: 'users',
    isPremium: true,
    fields: [
      { id: 'petitioner', name: 'petitioner', label: 'Petitioner Name', type: 'text', required: true },
      { id: 'respondent', name: 'respondent', label: 'Respondent Name', type: 'text', required: true },
      { id: 'marriageDate', name: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
      { id: 'grounds', name: 'grounds', label: 'Grounds for Divorce', type: 'textarea', required: true },
    ],
  },
  {
    id: '5',
    name: 'Employment Contract',
    category: 'Labour',
    description: 'Standard employment agreement',
    icon: 'briefcase',
    isPremium: false,
    fields: [
      { id: 'employer', name: 'employer', label: 'Employer Name', type: 'text', required: true },
      { id: 'employee', name: 'employee', label: 'Employee Name', type: 'text', required: true },
      { id: 'position', name: 'position', label: 'Position/Designation', type: 'text', required: true },
      { id: 'salary', name: 'salary', label: 'Monthly Salary', type: 'number', required: true },
    ],
  },
  {
    id: '6',
    name: 'Company Registration',
    category: 'Corporate',
    description: 'Memorandum and articles of association',
    icon: 'building',
    isPremium: true,
    fields: [
      { id: 'companyName', name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { id: 'directors', name: 'directors', label: 'Directors', type: 'textarea', required: true },
      { id: 'capital', name: 'capital', label: 'Authorized Capital', type: 'number', required: true },
    ],
  },
];

export function DrafterProvider({ children }: { children: ReactNode }) {
  const [templates] = useState<DrafterTemplate[]>(mockTemplates);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(BOOKMARKED_TEMPLATES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  
  const [savedDrafts, setSavedDrafts] = useState<Document[]>(() => {
    const stored = localStorage.getItem(SAVED_DRAFTS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [currentDraft, setCurrentDraft] = useState<Document | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const saveDraftsToStorage = useCallback((drafts: Document[]) => {
    localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(drafts));
    setSavedDrafts(drafts);
  }, []);

  const selectTemplate = useCallback((template: DrafterTemplate) => {
    // Template selected - could trigger navigation or state update
    console.log('Template selected:', template.name);
  }, []);

  const generateDraft = useCallback(async (templateId: string, fieldValues: Record<string, string>): Promise<Document> => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const template = templates.find(t => t.id === templateId);
    if (!template) throw new Error('Template not found');
    
    // Generate mock content based on template
    const content = `
# ${template.name}

This document is generated based on the ${template.name} template.

## Details

${Object.entries(fieldValues).map(([key, value]) => `**${key}**: ${value}`).join('\n\n')}

## Terms and Conditions

[Generated legal content would appear here based on the template and provided values]

---
*Generated by AI Attorney on ${new Date().toLocaleDateString()}*
    `.trim();
    
    const newDraft: Document = {
      id: crypto.randomUUID(),
      title: template.name,
      type: 'draft',
      content,
      fileType: 'docx',
      fileSize: content.length,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [template.category],
    };
    
    setCurrentDraft(newDraft);
    setIsGenerating(false);
    
    return newDraft;
  }, [templates]);

  const saveDraft = useCallback((content: string, title?: string) => {
    if (currentDraft) {
      const updated: Document = {
        ...currentDraft,
        content,
        title: title || currentDraft.title,
        updatedAt: new Date(),
      };
      
      const existingIndex = savedDrafts.findIndex(d => d.id === currentDraft.id);
      if (existingIndex >= 0) {
        const newDrafts = [...savedDrafts];
        newDrafts[existingIndex] = updated;
        saveDraftsToStorage(newDrafts);
      } else {
        saveDraftsToStorage([updated, ...savedDrafts]);
      }
      setCurrentDraft(updated);
    }
  }, [currentDraft, savedDrafts, saveDraftsToStorage]);

  const loadDraft = useCallback((id: string) => {
    const draft = savedDrafts.find(d => d.id === id);
    if (draft) setCurrentDraft(draft);
  }, [savedDrafts]);

  const deleteDraft = useCallback((id: string) => {
    saveDraftsToStorage(savedDrafts.filter(d => d.id !== id));
    if (currentDraft?.id === id) setCurrentDraft(null);
  }, [savedDrafts, currentDraft, saveDraftsToStorage]);

  const clearCurrentDraft = useCallback(() => {
    setCurrentDraft(null);
  }, []);

  const getTemplatesByCategory = useCallback((category: string) => {
    return templates.filter(t => t.category === category);
  }, [templates]);

  const toggleTemplateBookmark = useCallback((templateId: string) => {
    const newBookmarks = new Set(bookmarkedIds);
    if (newBookmarks.has(templateId)) {
      newBookmarks.delete(templateId);
    } else {
      newBookmarks.add(templateId);
    }
    localStorage.setItem(BOOKMARKED_TEMPLATES_KEY, JSON.stringify([...newBookmarks]));
    setBookmarkedIds(newBookmarks);
  }, [bookmarkedIds]);

  return (
    <DrafterContext.Provider value={{
      templates,
      categories: templateCategories,
      savedDrafts,
      currentDraft,
      isGenerating,
      selectTemplate,
      generateDraft,
      saveDraft,
      loadDraft,
      deleteDraft,
      clearCurrentDraft,
      getTemplatesByCategory,
      toggleTemplateBookmark,
    }}>
      {children}
    </DrafterContext.Provider>
  );
}

export function useDrafter() {
  const context = useContext(DrafterContext);
  if (!context) {
    throw new Error('useDrafter must be used within a DrafterProvider');
  }
  return context;
}
