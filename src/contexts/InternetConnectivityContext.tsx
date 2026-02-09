// Internet Connectivity Context
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InternetContextType {
  isOnline: boolean;
  showOfflineModal: boolean;
  dismissOfflineModal: () => void;
}

const InternetContext = createContext<InternetContextType | undefined>(undefined);

export function InternetConnectivityProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineModal, setShowOfflineModal] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineModal(false);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineModal(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const dismissOfflineModal = () => {
    setShowOfflineModal(false);
  };

  return (
    <InternetContext.Provider value={{
      isOnline,
      showOfflineModal,
      dismissOfflineModal,
    }}>
      {children}
    </InternetContext.Provider>
  );
}

export function useInternet() {
  const context = useContext(InternetContext);
  if (!context) {
    throw new Error('useInternet must be used within an InternetConnectivityProvider');
  }
  return context;
}
