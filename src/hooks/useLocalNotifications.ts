import { useCallback, useState } from 'react';
import { LocalNotifications, ScheduleOptions, PendingLocalNotificationSchema } from '@capacitor/local-notifications';

interface CaseHearing {
  id: number;
  title: string;
  caseNumber: string;
  court: string;
  date: string;
  time: string;
}

export const useLocalNotifications = () => {
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | null>(null);
  const [pendingNotifications, setPendingNotifications] = useState<PendingLocalNotificationSchema[]>([]);

  const checkPermissions = useCallback(async () => {
    try {
      const status = await LocalNotifications.checkPermissions();
      setPermissionStatus(status.display as any);
      return status.display;
    } catch (error) {
      console.log('Local notification permissions check failed:', error);
      return null;
    }
  }, []);

  const requestPermissions = useCallback(async () => {
    try {
      const status = await LocalNotifications.requestPermissions();
      setPermissionStatus(status.display as any);
      return status.display === 'granted';
    } catch (error) {
      console.log('Local notification permissions request failed:', error);
      return false;
    }
  }, []);

  const parseDateTime = (dateStr: string, timeStr: string): Date => {
    // Parse date like "Feb 1, 2026" and time like "10:00 AM"
    const date = new Date(dateStr);
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) {
      hour24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      hour24 = 0;
    }
    
    date.setHours(hour24, minutes, 0, 0);
    return date;
  };

  const scheduleHearingReminder = useCallback(async (hearing: CaseHearing, reminderMinutes: number = 60) => {
    try {
      // Check/request permissions first
      const permStatus = await checkPermissions();
      
      if (permStatus !== 'granted') {
        const granted = await requestPermissions();
        if (!granted) {
          console.log('Local notification permission denied');
          return false;
        }
      }

      const hearingDateTime = parseDateTime(hearing.date, hearing.time);
      const reminderTime = new Date(hearingDateTime.getTime() - reminderMinutes * 60 * 1000);

      // Don't schedule if reminder time has already passed
      if (reminderTime <= new Date()) {
        console.log('Reminder time has already passed');
        return false;
      }

      const options: ScheduleOptions = {
        notifications: [
          {
            id: hearing.id,
            title: `Upcoming Hearing: ${hearing.title}`,
            body: `${hearing.caseNumber} at ${hearing.court}\nScheduled for ${hearing.time}`,
            schedule: { at: reminderTime },
            sound: 'default',
            extra: {
              caseId: hearing.id,
              caseNumber: hearing.caseNumber,
            },
          },
        ],
      };

      await LocalNotifications.schedule(options);
      console.log(`Scheduled reminder for case ${hearing.caseNumber} at ${reminderTime}`);
      return true;
    } catch (error) {
      console.error('Failed to schedule hearing reminder:', error);
      return false;
    }
  }, [checkPermissions, requestPermissions]);

  const scheduleMultipleReminders = useCallback(async (hearing: CaseHearing) => {
    try {
      const permStatus = await checkPermissions();
      
      if (permStatus !== 'granted') {
        const granted = await requestPermissions();
        if (!granted) {
          return false;
        }
      }

      const hearingDateTime = parseDateTime(hearing.date, hearing.time);
      const now = new Date();

      // Schedule reminders at: 1 day before, 1 hour before, 15 minutes before
      const reminderTimes = [
        { minutes: 24 * 60, label: '1 day' },
        { minutes: 60, label: '1 hour' },
        { minutes: 15, label: '15 minutes' },
      ];

      const notifications = reminderTimes
        .map((reminder, index) => {
          const reminderTime = new Date(hearingDateTime.getTime() - reminder.minutes * 60 * 1000);
          
          if (reminderTime <= now) return null;

          return {
            id: hearing.id * 100 + index, // Unique ID for each reminder
            title: `Hearing in ${reminder.label}: ${hearing.title}`,
            body: `${hearing.caseNumber} at ${hearing.court}\nScheduled for ${hearing.time}`,
            schedule: { at: reminderTime },
            sound: 'default',
            extra: {
              caseId: hearing.id,
              caseNumber: hearing.caseNumber,
              reminderType: reminder.label,
            },
          };
        })
        .filter(Boolean) as any[];

      if (notifications.length > 0) {
        await LocalNotifications.schedule({ notifications });
        console.log(`Scheduled ${notifications.length} reminders for case ${hearing.caseNumber}`);
      }

      return true;
    } catch (error) {
      console.error('Failed to schedule multiple reminders:', error);
      return false;
    }
  }, [checkPermissions, requestPermissions]);

  const cancelHearingReminder = useCallback(async (hearingId: number) => {
    try {
      // Cancel all possible reminder IDs for this hearing
      const notificationIds = [hearingId, hearingId * 100, hearingId * 100 + 1, hearingId * 100 + 2];
      await LocalNotifications.cancel({ notifications: notificationIds.map(id => ({ id })) });
      console.log(`Cancelled reminders for hearing ${hearingId}`);
      return true;
    } catch (error) {
      console.error('Failed to cancel hearing reminder:', error);
      return false;
    }
  }, []);

  const getPendingNotifications = useCallback(async () => {
    try {
      const result = await LocalNotifications.getPending();
      setPendingNotifications(result.notifications);
      return result.notifications;
    } catch (error) {
      console.error('Failed to get pending notifications:', error);
      return [];
    }
  }, []);

  const cancelAllReminders = useCallback(async () => {
    try {
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ notifications: pending.notifications });
      }
      setPendingNotifications([]);
      console.log('Cancelled all reminders');
      return true;
    } catch (error) {
      console.error('Failed to cancel all reminders:', error);
      return false;
    }
  }, []);

  return {
    permissionStatus,
    pendingNotifications,
    checkPermissions,
    requestPermissions,
    scheduleHearingReminder,
    scheduleMultipleReminders,
    cancelHearingReminder,
    cancelAllReminders,
    getPendingNotifications,
  };
};
