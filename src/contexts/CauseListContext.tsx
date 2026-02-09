// Cause List Context - Manages cause list data
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { CauseListItem } from '@/types';

interface CauseListContextType {
  causeListItems: CauseListItem[];
  selectedCourt: string;
  selectedDate: Date;
  selectedBench: string | null;
  isLoading: boolean;
  courts: string[];
  benches: string[];
  
  // Actions
  setCourt: (court: string) => void;
  setDate: (date: Date) => void;
  setBench: (bench: string | null) => void;
  refreshCauseList: () => Promise<void>;
  getCauseListDetails: (id: string) => CauseListItem | undefined;
}

const CauseListContext = createContext<CauseListContextType | undefined>(undefined);

const courts = [
  'Supreme Court of Pakistan',
  'Federal Shariat Court',
  'Islamabad High Court',
  'Lahore High Court',
  'Sindh High Court',
  'Peshawar High Court',
  'Balochistan High Court',
];

const benchOptions: Record<string, string[]> = {
  'Supreme Court of Pakistan': ['Bench 1', 'Bench 2', 'Bench 3', 'Full Bench'],
  'Lahore High Court': ['Bench A', 'Bench B', 'Bench C', 'Division Bench'],
  'Islamabad High Court': ['Bench 1', 'Bench 2', 'Division Bench'],
  'Sindh High Court': ['Karachi Bench', 'Hyderabad Bench', 'Sukkur Bench'],
  'Peshawar High Court': ['Principal Seat', 'Mingora Bench', 'D.I. Khan Bench'],
};

// Mock cause list data
const mockCauseList: CauseListItem[] = [
  {
    id: '1',
    caseNumber: 'CMA 1234/2024',
    caseTitle: 'Khan vs Federation of Pakistan',
    court: 'Supreme Court of Pakistan',
    bench: 'Bench 1',
    serialNumber: 1,
    hearingDate: new Date(),
    status: 'listed',
  },
  {
    id: '2',
    caseNumber: 'WP 5678/2024',
    caseTitle: 'Ahmad vs Punjab Government',
    court: 'Lahore High Court',
    bench: 'Bench A',
    serialNumber: 2,
    hearingDate: new Date(),
    status: 'listed',
  },
  {
    id: '3',
    caseNumber: 'CP 9012/2024',
    caseTitle: 'State vs Rashid Ali',
    court: 'Islamabad High Court',
    bench: 'Bench 1',
    serialNumber: 3,
    hearingDate: new Date(),
    status: 'listed',
  },
];

export function CauseListProvider({ children }: { children: ReactNode }) {
  const [causeListItems, setCauseListItems] = useState<CauseListItem[]>(mockCauseList);
  const [selectedCourt, setSelectedCourt] = useState(courts[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBench, setSelectedBench] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const benches = benchOptions[selectedCourt] || [];

  const setCourt = useCallback((court: string) => {
    setSelectedCourt(court);
    setSelectedBench(null);
  }, []);

  const setDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const setBench = useCallback((bench: string | null) => {
    setSelectedBench(bench);
  }, []);

  const refreshCauseList = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock data based on selections
    const filtered = mockCauseList.filter(item => {
      if (item.court !== selectedCourt) return false;
      if (selectedBench && item.bench !== selectedBench) return false;
      return true;
    });
    
    setCauseListItems(filtered);
    setIsLoading(false);
  }, [selectedCourt, selectedBench]);

  const getCauseListDetails = useCallback((id: string) => {
    return causeListItems.find(item => item.id === id);
  }, [causeListItems]);

  return (
    <CauseListContext.Provider value={{
      causeListItems,
      selectedCourt,
      selectedDate,
      selectedBench,
      isLoading,
      courts,
      benches,
      setCourt,
      setDate,
      setBench,
      refreshCauseList,
      getCauseListDetails,
    }}>
      {children}
    </CauseListContext.Provider>
  );
}

export function useCauseList() {
  const context = useContext(CauseListContext);
  if (!context) {
    throw new Error('useCauseList must be used within a CauseListProvider');
  }
  return context;
}
