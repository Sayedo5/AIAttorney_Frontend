import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ message, isUser, timestamp, isTyping }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "flex",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        <div className={cn(
          "max-w-[85%]",
          isUser ? "chat-bubble-user" : "chat-bubble-ai"
        )}>
          {isTyping ? (
            <div className="flex items-center gap-1.5 py-1">
              <motion.span
                className="w-2 h-2 rounded-full bg-current opacity-60"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-current opacity-60"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-current opacity-60"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          )}
          {timestamp && !isTyping && (
            <span className={cn(
              "text-[10px] mt-1 block",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {timestamp}
            </span>
          )}
        </div>
      </motion.div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";
