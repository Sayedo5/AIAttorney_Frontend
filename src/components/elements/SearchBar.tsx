// Search Bar Component
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SearchBarProps } from '../types';

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onSubmit,
  onClear,
  showVoice = false,
  onVoiceStart,
  className,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary/50 border transition-all duration-300',
          isFocused 
            ? 'border-primary/50 ring-2 ring-primary/20' 
            : 'border-border/50'
        )}
      >
        <Search className={cn(
          'w-5 h-5 transition-colors',
          isFocused ? 'text-primary' : 'text-muted-foreground'
        )} />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        {showVoice && !value && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={onVoiceStart}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
          >
            <Mic className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        )}
      </div>
    </form>
  );
}
