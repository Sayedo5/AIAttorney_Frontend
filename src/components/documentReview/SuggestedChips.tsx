import { motion } from "framer-motion";

interface SuggestedChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestedChips({ suggestions, onSelect }: SuggestedChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
}
