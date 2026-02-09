// Chat Header Component
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, History, Sparkles } from 'lucide-react';
import { IconButton } from '@/components/ui/icon-button';

interface ChatHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onHistoryClick?: () => void;
  onMenuClick?: () => void;
  isStreaming?: boolean;
}

export function ChatHeader({
  title = 'AI Attorney',
  showBack = false,
  onBack,
  onHistoryClick,
  onMenuClick,
  isStreaming,
}: ChatHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between glass border-b border-border/30 safe-top"
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <IconButton
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={onBack}
          />
        )}
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-display font-semibold text-foreground">
              {title}
            </h1>
            {isStreaming && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-primary"
              >
                Typing...
              </motion.p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onHistoryClick && (
          <IconButton
            variant="ghost"
            size="sm"
            icon={<History className="w-5 h-5" />}
            onClick={onHistoryClick}
          />
        )}
        
        {onMenuClick && (
          <IconButton
            variant="ghost"
            size="sm"
            icon={<MoreVertical className="w-5 h-5" />}
            onClick={onMenuClick}
          />
        )}
      </div>
    </motion.header>
  );
}
