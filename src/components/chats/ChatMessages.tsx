// Chat Messages Container
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from '@/types';
import { MessageItem } from './MessageItem';

interface ChatMessagesProps {
  messages: Message[];
  isStreaming?: boolean;
  streamingContent?: string;
  onCopyMessage?: (content: string) => void;
  onLikeMessage?: (messageId: string) => void;
  onPinMessage?: (messageId: string) => void;
  onRegenerateMessage?: (messageId: string) => void;
}

export function ChatMessages({
  messages,
  isStreaming,
  streamingContent,
  onCopyMessage,
  onLikeMessage,
  onPinMessage,
  onRegenerateMessage,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
            streamingContent={streamingContent}
            onCopy={() => onCopyMessage?.(message.content)}
            onLike={() => onLikeMessage?.(message.id)}
            onPin={() => onPinMessage?.(message.id)}
            onRegenerate={() => onRegenerateMessage?.(message.id)}
          />
        ))}
      </AnimatePresence>

      {/* Streaming indicator for new AI response */}
      {isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 px-4"
        >
          <div className="chat-bubble-ai">
            <div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
