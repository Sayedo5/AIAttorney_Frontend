// Feature Access Context - Premium feature gating
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

type Feature = 
  | 'chat_unlimited'
  | 'document_upload'
  | 'drafter_premium'
  | 'case_research'
  | 'cause_list'
  | 'diary_reminders'
  | 'export_pdf'
  | 'export_docx'
  | 'voice_input'
  | 'web_search'
  | 'priority_support';

interface FeatureLimits {
  chatMessagesPerDay: number;
  documentsPerMonth: number;
  casesPerMonth: number;
  storageGB: number;
}

interface FeatureAccessContextType {
  hasAccess: (feature: Feature) => boolean;
  checkLimit: (feature: 'chat' | 'documents' | 'cases') => { allowed: boolean; remaining: number };
  limits: FeatureLimits;
  isPremium: boolean;
  showUpgradePrompt: (feature: string) => void;
  upgradePromptVisible: boolean;
  upgradeFeature: string | null;
  hideUpgradePrompt: () => void;
}

const FeatureAccessContext = createContext<FeatureAccessContextType | undefined>(undefined);

const FREE_LIMITS: FeatureLimits = {
  chatMessagesPerDay: 10,
  documentsPerMonth: 5,
  casesPerMonth: 3,
  storageGB: 0.5,
};

const PRO_LIMITS: FeatureLimits = {
  chatMessagesPerDay: 100,
  documentsPerMonth: 50,
  casesPerMonth: 25,
  storageGB: 5,
};

const ENTERPRISE_LIMITS: FeatureLimits = {
  chatMessagesPerDay: -1, // unlimited
  documentsPerMonth: -1,
  casesPerMonth: -1,
  storageGB: 50,
};

const FREE_FEATURES: Feature[] = [
  'document_upload',
  'case_research',
];

const PRO_FEATURES: Feature[] = [
  ...FREE_FEATURES,
  'chat_unlimited',
  'drafter_premium',
  'cause_list',
  'diary_reminders',
  'export_pdf',
  'export_docx',
  'voice_input',
  'web_search',
];

const ENTERPRISE_FEATURES: Feature[] = [
  ...PRO_FEATURES,
  'priority_support',
];

export function FeatureAccessProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [upgradePromptVisible, setUpgradePromptVisible] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<string | null>(null);

  const plan = user?.plan || 'free';
  const isPremium = plan === 'pro' || plan === 'enterprise';

  const limits = plan === 'enterprise' 
    ? ENTERPRISE_LIMITS 
    : plan === 'pro' 
      ? PRO_LIMITS 
      : FREE_LIMITS;

  const hasAccess = useCallback((feature: Feature): boolean => {
    if (plan === 'enterprise') return ENTERPRISE_FEATURES.includes(feature);
    if (plan === 'pro') return PRO_FEATURES.includes(feature);
    return FREE_FEATURES.includes(feature);
  }, [plan]);

  const checkLimit = useCallback((feature: 'chat' | 'documents' | 'cases'): { allowed: boolean; remaining: number } => {
    // In a real app, this would check actual usage from the backend
    const usageKey = `ai_attorney_usage_${feature}`;
    const currentUsage = parseInt(localStorage.getItem(usageKey) || '0', 10);
    
    let limit: number;
    switch (feature) {
      case 'chat':
        limit = limits.chatMessagesPerDay;
        break;
      case 'documents':
        limit = limits.documentsPerMonth;
        break;
      case 'cases':
        limit = limits.casesPerMonth;
        break;
    }
    
    if (limit === -1) {
      return { allowed: true, remaining: -1 };
    }
    
    const remaining = Math.max(0, limit - currentUsage);
    return { allowed: remaining > 0, remaining };
  }, [limits]);

  const showUpgradePrompt = useCallback((feature: string) => {
    setUpgradeFeature(feature);
    setUpgradePromptVisible(true);
  }, []);

  const hideUpgradePrompt = useCallback(() => {
    setUpgradePromptVisible(false);
    setUpgradeFeature(null);
  }, []);

  return (
    <FeatureAccessContext.Provider value={{
      hasAccess,
      checkLimit,
      limits,
      isPremium,
      showUpgradePrompt,
      upgradePromptVisible,
      upgradeFeature,
      hideUpgradePrompt,
    }}>
      {children}
    </FeatureAccessContext.Provider>
  );
}

export function useFeatureAccess() {
  const context = useContext(FeatureAccessContext);
  if (!context) {
    throw new Error('useFeatureAccess must be used within a FeatureAccessProvider');
  }
  return context;
}
