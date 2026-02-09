import { motion } from "framer-motion";
import { FileSearch, MessageSquare, Lightbulb, Scale } from "lucide-react";

interface EmptyChatViewProps {
  documentName?: string;
  onSuggestionClick?: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: FileSearch,
    text: "Summarize this document",
  },
  {
    icon: Scale,
    text: "What are the legal implications?",
  },
  {
    icon: Lightbulb,
    text: "Identify key clauses and terms",
  },
  {
    icon: MessageSquare,
    text: "What are the risks in this agreement?",
  },
];

export function EmptyChatView({ documentName, onSuggestionClick }: EmptyChatViewProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <FileSearch className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Document Review
        </h2>
        {documentName ? (
          <p className="text-muted-foreground text-sm">
            Ask questions about <span className="font-medium">{documentName}</span>
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Upload a document to start reviewing
          </p>
        )}
      </motion.div>

      {documentName && (
        <div className="w-full max-w-md space-y-3">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Try asking:
          </p>
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestionClick?.(suggestion.text)}
              className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-left flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <suggestion.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-foreground">{suggestion.text}</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
