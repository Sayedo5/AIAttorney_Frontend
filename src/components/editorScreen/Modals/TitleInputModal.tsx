import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  initialTitle?: string;
  title?: string;
  placeholder?: string;
  confirmText?: string;
}

export function TitleInputModal({
  isOpen,
  onClose,
  onConfirm,
  initialTitle = "",
  title = "Enter Title",
  placeholder = "Enter a title...",
  confirmText = "Save",
}: TitleInputModalProps) {
  const [inputValue, setInputValue] = useState(initialTitle);

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <Label htmlFor="title-input" className="sr-only">
                Title
              </Label>
              <Input
                id="title-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                placeholder={placeholder}
                autoFocus
                className="rounded-xl"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-4 border-t border-border">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!inputValue.trim()}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
