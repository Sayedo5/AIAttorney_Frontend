import { useEffect, useState, useCallback } from 'react';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

interface NotificationState {
  token: string | null;
  notifications: PushNotificationSchema[];
  isRegistered: boolean;
  permissionStatus: 'prompt' | 'granted' | 'denied' | null;
}

export const usePushNotifications = () => {
  const [state, setState] = useState<NotificationState>({
    token: null,
    notifications: [],
    isRegistered: false,
    permissionStatus: null,
  });

  const checkPermissions = useCallback(async () => {
    try {
      const status = await PushNotifications.checkPermissions();
      setState(prev => ({ ...prev, permissionStatus: status.receive as any }));
      return status.receive;
    } catch (error) {
      console.log('Push notification permissions check failed:', error);
      return null;
    }
  }, []);

  const requestPermissions = useCallback(async () => {
    try {
      const status = await PushNotifications.requestPermissions();
      setState(prev => ({ ...prev, permissionStatus: status.receive as any }));
      return status.receive === 'granted';
    } catch (error) {
      console.log('Push notification permissions request failed:', error);
      return false;
    }
  }, []);

  const register = useCallback(async () => {
    try {
      // Check/request permissions first
      const permStatus = await checkPermissions();
      
      if (permStatus !== 'granted') {
        const granted = await requestPermissions();
        if (!granted) {
          console.log('Push notification permission denied');
          return false;
        }
      }

      // Register for push notifications
      await PushNotifications.register();
      setState(prev => ({ ...prev, isRegistered: true }));
      return true;
    } catch (error) {
      console.log('Push notification registration failed:', error);
      return false;
    }
  }, [checkPermissions, requestPermissions]);

  const addListeners = useCallback(() => {
    // On registration success
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token:', token.value);
      setState(prev => ({ ...prev, token: token.value }));
    });

    // On registration error
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Push registration error:', error);
    });

    // When a notification is received while app is in foreground
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push notification received:', notification);
      setState(prev => ({
        ...prev,
        notifications: [...prev.notifications, notification],
      }));
    });

    // When user taps on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Push notification action performed:', action);
    });
  }, []);

  const removeAllListeners = useCallback(async () => {
    await PushNotifications.removeAllListeners();
  }, []);

  const clearNotifications = useCallback(() => {
    setState(prev => ({ ...prev, notifications: [] }));
  }, []);

  // Setup listeners on mount
  useEffect(() => {
    addListeners();
    return () => {
      removeAllListeners();
    };
  }, [addListeners, removeAllListeners]);

  return {
    ...state,
    register,
    checkPermissions,
    requestPermissions,
    clearNotifications,
  };
};
