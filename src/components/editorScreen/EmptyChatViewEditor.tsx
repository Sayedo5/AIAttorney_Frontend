import { motion } from "framer-motion";
import { Sparkles, FileText, Wand2, CheckCircle } from "lucide-react";

interface EmptyChatViewEditorProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: Wand2,
    text: "Improve the writing style",
  },
  {
    icon: FileText,
    text: "Add a professional introduction",
  },
  {
    icon: CheckCircle,
    text: "Check for legal accuracy",
  },
  {
    icon: Sparkles,
    text: "Make it more concise",
  },
];

export function EmptyChatViewEditor({ onSuggestionClick }: EmptyChatViewEditorProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">AI Writing Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Get help with your document
        </p>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/30 transition-all text-left flex items-center gap-3"
          >
            <suggestion.icon className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">{suggestion.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
