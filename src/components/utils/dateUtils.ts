import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";

export const formatDate = (date: Date | string, formatStr: string = "PPP"): string => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr);
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
};

export const formatSmartDate = (date: Date | string): string => {
  const d = typeof date === "string" ? parseISO(date) : date;
  
  if (isToday(d)) {
    return `Today at ${format(d, "h:mm a")}`;
  }
  if (isTomorrow(d)) {
    return `Tomorrow at ${format(d, "h:mm a")}`;
  }
  if (isYesterday(d)) {
    return `Yesterday at ${format(d, "h:mm a")}`;
  }
  
  return format(d, "MMM d, yyyy");
};

export const formatHearingDate = (date: Date | string): string => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "EEEE, MMMM d, yyyy");
};

export const getDaysUntil = (date: Date | string): number => {
  const d = typeof date === "string" ? parseISO(date) : date;
  const now = new Date();
  const diffTime = d.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isUrgent = (date: Date | string, daysThreshold: number = 3): boolean => {
  const days = getDaysUntil(date);
  return days >= 0 && days <= daysThreshold;
};
