// Case Card Component
import { motion } from 'framer-motion';
import { Calendar, Building, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../StatusBadge';
import type { CaseCardProps } from '../types';

export function CaseCard({
  caseNumber,
  title,
  court,
  status,
  date,
  isBookmarked,
  onBookmarkToggle,
  onClick,
  className,
}: CaseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'feature-card cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-primary mb-1">{caseNumber}</p>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px]">{court}</span>
            </span>
            
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(date).toLocaleDateString('en-PK', { 
                  day: 'numeric', 
                  month: 'short' 
                })}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={status} size="sm" />
          
          {onBookmarkToggle && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle();
              }}
              className="p-1.5 rounded-full hover:bg-secondary transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-muted-foreground" />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Animated version with entrance animation
export function AnimatedCaseCard(props: CaseCardProps & { index?: number }) {
  const { index = 0, ...cardProps } = props;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <CaseCard {...cardProps} />
    </motion.div>
  );
}
