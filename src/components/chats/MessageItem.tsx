// Chat Message Item Component
import { motion } from 'framer-motion';
import { Copy, ThumbsUp, Pin, Volume2, RefreshCw, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from '@/types';

interface MessageItemProps {
  message: Message;
  isStreaming?: boolean;
  streamingContent?: string;
  onCopy?: () => void;
  onLike?: () => void;
  onPin?: () => void;
  onSpeak?: () => void;
  onRegenerate?: () => void;
}

export function MessageItem({
  message,
  isStreaming,
  streamingContent,
  onCopy,
  onLike,
  onPin,
  onSpeak,
  onRegenerate,
}: MessageItemProps) {
  const isUser = message.role === 'user';
  const content = isStreaming && message.role === 'assistant' ? streamingContent : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex gap-3 px-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={cn(
        'max-w-[85%] space-y-2',
        isUser ? 'items-end' : 'items-start'
      )}>
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl text-sm"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span className="truncate max-w-[120px]">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            isUser ? 'chat-bubble-user ml-auto' : 'chat-bubble-ai'
          )}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {content}
            {isStreaming && <span className="typing-cursor" />}
          </div>
        </div>

        {/* Actions (AI messages only) */}
        {!isUser && !isStreaming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 px-1"
          >
            <ActionButton
              icon={<Copy className="w-3.5 h-3.5" />}
              onClick={onCopy}
              tooltip="Copy"
            />
            <ActionButton
              icon={<ThumbsUp className="w-3.5 h-3.5" />}
              onClick={onLike}
              isActive={message.isLiked}
              tooltip="Like"
            />
            <ActionButton
              icon={<Pin className="w-3.5 h-3.5" />}
              onClick={onPin}
              isActive={message.isPinned}
              tooltip="Pin"
            />
            <ActionButton
              icon={<Volume2 className="w-3.5 h-3.5" />}
              onClick={onSpeak}
              tooltip="Read aloud"
            />
            <ActionButton
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={onRegenerate}
              tooltip="Regenerate"
            />
          </motion.div>
        )}

        {/* Timestamp */}
        <p className={cn(
          'text-xs text-muted-foreground px-1',
          isUser && 'text-right'
        )}>
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  );
}

// Action Button Component
function ActionButton({
  icon,
  onClick,
  isActive,
  tooltip,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  tooltip?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        'p-1.5 rounded-lg transition-colors',
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      )}
      title={tooltip}
    >
      {icon}
    </motion.button>
  );
}
