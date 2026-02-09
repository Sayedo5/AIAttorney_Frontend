// Chat Input Component
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Paperclip, X, Globe, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
  showWebSearch?: boolean;
  onWebSearchToggle?: () => void;
  webSearchEnabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading,
  placeholder,
  showWebSearch = false,
  onWebSearchToggle,
  webSearchEnabled,
}: ChatInputProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'UR' : 'EN');
  };

  return (
    <div className="sticky bottom-0 p-4 glass border-t border-border/30 safe-bottom">
      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 mb-3 overflow-x-auto pb-2"
          >
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl text-sm shrink-0"
              >
                <span className="truncate max-w-[100px]">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="p-0.5 rounded-full hover:bg-destructive/20"
                >
                  <X className="w-3 h-3 text-destructive" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex items-end gap-2">
        {/* Left Actions */}
        <div className="flex items-center gap-1">
          {showWebSearch && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWebSearchToggle}
              className={cn(
                'p-2.5 rounded-xl transition-colors',
                webSearchEnabled
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="p-2.5 rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Languages className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || t('askAIAttorney')}
            rows={1}
            dir={isRTL ? 'rtl' : 'ltr'}
            className={cn(
              'w-full px-4 py-3 pr-20 rounded-2xl bg-secondary/50 border border-border/50',
              'text-foreground placeholder:text-muted-foreground resize-none',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50',
              'transition-all duration-200',
              isRTL && 'text-right'
            )}
            style={{ maxHeight: '120px' }}
          />
          
          {/* Right input actions */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {message.trim() || attachments.length > 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={isLoading}
              className="p-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRecording(!isRecording)}
              className={cn(
                'p-3 rounded-xl transition-colors',
                isRecording
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-primary text-primary-foreground'
              )}
            >
              <Mic className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground mt-2 px-4">
        {t('disclaimer')}
      </p>
    </div>
  );
}
