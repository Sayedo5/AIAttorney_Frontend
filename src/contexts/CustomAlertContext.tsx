// Custom Alert Context
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AlertOptions {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
  alertVisible: boolean;
  alertOptions: AlertOptions | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function CustomAlertProvider({ children }: { children: ReactNode }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions(options);
    setAlertVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setAlertVisible(false);
    setAlertOptions(null);
  }, []);

  return (
    <AlertContext.Provider value={{
      showAlert,
      hideAlert,
      alertVisible,
      alertOptions,
    }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within a CustomAlertProvider');
  }
  return context;
}
