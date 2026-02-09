// User Info Context
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User } from '@/types';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'EN' | 'UR';
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
  hapticFeedback: boolean;
}

interface UserInfoContextType {
  userInfo: User | null;
  preferences: UserPreferences;
  updateUserInfo: (updates: Partial<User>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  clearUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

const USER_INFO_KEY = 'ai_attorney_user_info';
const PREFERENCES_KEY = 'ai_attorney_preferences';

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'EN',
  notificationsEnabled: true,
  emailNotifications: true,
  soundEnabled: true,
  hapticFeedback: true,
};

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_INFO_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  });

  const updateUserInfo = useCallback((updates: Partial<User>) => {
    setUserInfo(prev => {
      const updated = prev ? { ...prev, ...updates } : null;
      if (updated) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearUserInfo = useCallback(() => {
    localStorage.removeItem(USER_INFO_KEY);
    setUserInfo(null);
  }, []);

  return (
    <UserInfoContext.Provider value={{
      userInfo,
      preferences,
      updateUserInfo,
      updatePreferences,
      clearUserInfo,
    }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
}
