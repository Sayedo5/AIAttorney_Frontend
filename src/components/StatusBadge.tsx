// Status Badge Component
import { cn } from '@/lib/utils';
import type { StatusBadgeProps } from './types';

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  ongoing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  decided: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  disposed: 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400',
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400',
  urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  ongoing: 'Ongoing',
  decided: 'Decided',
  disposed: 'Disposed',
  active: 'Active',
  completed: 'Completed',
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        statusStyles[status],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
