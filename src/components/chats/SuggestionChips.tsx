// Suggestion Chips Component
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  className?: string;
}

export function SuggestionChips({ suggestions, onSelect, className }: SuggestionChipsProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2 px-4', className)}>
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-secondary rounded-full text-sm text-foreground whitespace-nowrap hover:bg-secondary/80 transition-colors"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
}
