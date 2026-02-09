// Document Card Component
import { motion } from 'framer-motion';
import { FileText, FileType, Image, Download, Trash2, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DocumentCardProps } from '../types';

const fileIcons = {
  pdf: FileText,
  doc: FileType,
  docx: FileType,
  txt: FileText,
  image: Image,
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentCard({
  title,
  type,
  size,
  date,
  isBookmarked,
  onBookmarkToggle,
  onDownload,
  onDelete,
  onClick,
  className,
}: DocumentCardProps) {
  const Icon = fileIcons[type] || FileText;

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
      <div className="flex items-center gap-3">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          type === 'pdf' ? 'bg-red-100 dark:bg-red-900/30' :
          type === 'image' ? 'bg-blue-100 dark:bg-blue-900/30' :
          'bg-primary-light'
        )}>
          <Icon className={cn(
            'w-6 h-6',
            type === 'pdf' ? 'text-red-600 dark:text-red-400' :
            type === 'image' ? 'text-blue-600 dark:text-blue-400' :
            'text-primary'
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="uppercase">{type}</span>
            <span>•</span>
            <span>{formatFileSize(size)}</span>
            <span>•</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onBookmarkToggle && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle();
              }}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.button>
          )}
          
          {onDownload && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          )}
          
          {onDelete && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 rounded-full hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
