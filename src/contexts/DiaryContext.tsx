// Diary Context - Manages case diary entries and reminders
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { DiaryEntry, Case } from '@/types';

interface DiaryContextType {
  entries: DiaryEntry[];
  cases: Case[];
  selectedDate: Date;
  
  // Actions
  addEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (id: string, updates: Partial<DiaryEntry>) => void;
  deleteEntry: (id: string) => void;
  toggleComplete: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  getEntriesByDate: (date: Date) => DiaryEntry[];
  getUpcomingReminders: () => DiaryEntry[];
  addCase: (caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  deleteCase: (id: string) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

const DIARY_ENTRIES_KEY = 'ai_attorney_diary_entries';
const CASES_KEY = 'ai_attorney_cases';

// Mock data for demo
const mockEntries: DiaryEntry[] = [
  {
    id: '1',
    caseId: '1',
    title: 'Property Dispute Hearing',
    description: 'Prepare arguments for property boundary dispute',
    date: new Date(),
    reminderDate: new Date(),
    priority: 'high',
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    caseId: '2',
    title: 'Submit Reply Brief',
    description: 'File response to opposing counsel\'s motion',
    date: new Date(Date.now() + 86400000),
    priority: 'urgent',
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    caseId: '3',
    title: 'Client Meeting',
    description: 'Discuss case strategy with Mr. Ahmed',
    date: new Date(Date.now() + 172800000),
    priority: 'medium',
    isCompleted: false,
    createdAt: new Date(),
  },
];

const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'CP/2024/001',
    title: 'Khan vs. Ahmad - Property Dispute',
    court: 'Lahore High Court',
    judge: 'Justice Malik',
    status: 'ongoing',
    nextHearingDate: new Date(Date.now() + 604800000),
    clientName: 'Muhammad Khan',
    opposingParty: 'Ali Ahmad',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    caseNumber: 'CR/2024/042',
    title: 'State vs. Rashid',
    court: 'Sessions Court Islamabad',
    status: 'pending',
    clientName: 'Rashid Ali',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const stored = localStorage.getItem(DIARY_ENTRIES_KEY);
    return stored ? JSON.parse(stored) : mockEntries;
  });
  
  const [cases, setCases] = useState<Case[]>(() => {
    const stored = localStorage.getItem(CASES_KEY);
    return stored ? JSON.parse(stored) : mockCases;
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  const saveEntries = useCallback((newEntries: DiaryEntry[]) => {
    localStorage.setItem(DIARY_ENTRIES_KEY, JSON.stringify(newEntries));
    setEntries(newEntries);
  }, []);

  const saveCases = useCallback((newCases: Case[]) => {
    localStorage.setItem(CASES_KEY, JSON.stringify(newCases));
    setCases(newCases);
  }, []);

  const addEntry = useCallback((entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    saveEntries([newEntry, ...entries]);
  }, [entries, saveEntries]);

  const updateEntry = useCallback((id: string, updates: Partial<DiaryEntry>) => {
    const updated = entries.map(e => e.id === id ? { ...e, ...updates } : e);
    saveEntries(updated);
  }, [entries, saveEntries]);

  const deleteEntry = useCallback((id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
  }, [entries, saveEntries]);

  const toggleComplete = useCallback((id: string) => {
    const updated = entries.map(e => 
      e.id === id ? { ...e, isCompleted: !e.isCompleted } : e
    );
    saveEntries(updated);
  }, [entries, saveEntries]);

  const getEntriesByDate = useCallback((date: Date) => {
    const dateStr = date.toDateString();
    return entries.filter(e => new Date(e.date).toDateString() === dateStr);
  }, [entries]);

  const getUpcomingReminders = useCallback(() => {
    const now = new Date();
    const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return entries
      .filter(e => {
        const entryDate = new Date(e.date);
        return entryDate >= now && entryDate <= weekLater && !e.isCompleted;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [entries]);

  const addCase = useCallback((caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCase: Case = {
      ...caseData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveCases([newCase, ...cases]);
  }, [cases, saveCases]);

  const updateCase = useCallback((id: string, updates: Partial<Case>) => {
    const updated = cases.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
    );
    saveCases(updated);
  }, [cases, saveCases]);

  const deleteCase = useCallback((id: string) => {
    saveCases(cases.filter(c => c.id !== id));
    // Also delete related diary entries
    saveEntries(entries.filter(e => e.caseId !== id));
  }, [cases, entries, saveCases, saveEntries]);

  return (
    <DiaryContext.Provider value={{
      entries,
      cases,
      selectedDate,
      addEntry,
      updateEntry,
      deleteEntry,
      toggleComplete,
      setSelectedDate,
      getEntriesByDate,
      getUpcomingReminders,
      addCase,
      updateCase,
      deleteCase,
    }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
}
