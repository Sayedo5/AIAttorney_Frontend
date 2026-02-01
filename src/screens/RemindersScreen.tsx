import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  BellOff, 
  Calendar, 
  Clock, 
  Trash2, 
  ArrowLeft,
  BellRing,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLocalNotifications } from "@/hooks/useLocalNotifications";
import { toast } from "sonner";

interface RemindersScreenProps {
  onBack: () => void;
}

interface ReminderDisplay {
  id: number;
  title: string;
  body: string;
  scheduledAt: Date;
  caseNumber?: string;
  reminderType?: string;
}

export function RemindersScreen({ onBack }: RemindersScreenProps) {
  const [reminders, setReminders] = useState<ReminderDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    getPendingNotifications, 
    cancelHearingReminder, 
    cancelAllReminders,
    permissionStatus,
    checkPermissions 
  } = useLocalNotifications();

  const loadReminders = async () => {
    setIsLoading(true);
    try {
      const pending = await getPendingNotifications();
      
      const formattedReminders: ReminderDisplay[] = pending.map((notification) => ({
        id: notification.id,
        title: notification.title || "Scheduled Reminder",
        body: notification.body || "",
        scheduledAt: notification.schedule?.at ? new Date(notification.schedule.at) : new Date(),
        caseNumber: notification.extra?.caseNumber,
        reminderType: notification.extra?.reminderType,
      }));
      
      // Sort by scheduled time
      formattedReminders.sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
      
      setReminders(formattedReminders);
    } catch (error) {
      console.error("Failed to load reminders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPermissions();
    loadReminders();
  }, []);

  const handleCancelReminder = async (id: number) => {
    const success = await cancelHearingReminder(id);
    if (success) {
      toast.success("Reminder cancelled");
      loadReminders();
    } else {
      toast.error("Failed to cancel reminder");
    }
  };

  const handleCancelAll = async () => {
    const success = await cancelAllReminders();
    if (success) {
      toast.success("All reminders cancelled");
      setReminders([]);
    } else {
      toast.error("Failed to cancel reminders");
    }
  };

  const formatScheduledTime = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `in ${minutes} minutes`;
    } else {
      return "very soon";
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-display font-bold">Reminders</h1>
              <p className="text-xs text-muted-foreground">
                {reminders.length} scheduled
              </p>
            </div>
          </div>
          
          {reminders.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelAll}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Permission Warning */}
      {permissionStatus === 'denied' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4"
        >
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Notifications Disabled</p>
                <p className="text-xs text-muted-foreground">
                  Enable notifications in your device settings to receive reminders.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4 space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground mt-3">Loading reminders...</p>
            </div>
          ) : reminders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BellOff className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Reminders Set</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Set reminders for your upcoming hearings from the Cases screen by tapping the bell icon.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {reminders.map((reminder, index) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <BellRing className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground line-clamp-1">
                              {reminder.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                              {reminder.body}
                            </p>
                            
                            <Separator className="my-3" />
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDateTime(reminder.scheduledAt)}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="w-3.5 h-3.5 text-primary" />
                              <span className="text-xs font-medium text-primary">
                                {formatScheduledTime(reminder.scheduledAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCancelReminder(reminder.id)}
                          className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
