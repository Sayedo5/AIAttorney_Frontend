import { useState, useEffect, useCallback } from 'react';

const REMINDER_SETTINGS_KEY = 'ai-attorney-reminder-settings';

interface ReminderSettings {
  enabled: boolean;
}

const defaultSettings: ReminderSettings = {
  enabled: true,
};

export const useReminderSettings = () => {
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    try {
      const stored = localStorage.getItem(REMINDER_SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load reminder settings:', error);
    }
    return defaultSettings;
  });

  const saveSettings = useCallback((newSettings: ReminderSettings) => {
    try {
      localStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save reminder settings:', error);
    }
  }, []);

  const setRemindersEnabled = useCallback((enabled: boolean) => {
    saveSettings({ ...settings, enabled });
  }, [settings, saveSettings]);

  const isRemindersEnabled = settings.enabled;

  return {
    isRemindersEnabled,
    setRemindersEnabled,
    settings,
  };
};
