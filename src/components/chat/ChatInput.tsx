import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Paperclip, Sparkles } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Ask anything about law..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 glass border-t border-border/30"
    >
      <div className="flex items-end gap-2">
        <IconButton
          variant="ghost"
          size="sm"
          icon={<Paperclip className="w-5 h-5" />}
        />
        
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="input-modern resize-none min-h-[44px] max-h-32 pr-12"
            style={{ height: "auto" }}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <motion.div
              animate={{ opacity: message ? 0 : 1 }}
              className="pointer-events-none"
            >
              <Sparkles className="w-4 h-4 text-primary/50" />
            </motion.div>
          </div>
        </div>
        
        <motion.div
          animate={{ scale: message.trim() ? 1 : 0.8, opacity: message.trim() ? 1 : 0.5 }}
        >
          {message.trim() ? (
            <IconButton
              variant="gradient"
              size="default"
              icon={<Send className="w-5 h-5" />}
              onClick={handleSubmit}
              disabled={disabled}
            />
          ) : (
            <IconButton
              variant="soft"
              size="default"
              icon={<Mic className="w-5 h-5" />}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
