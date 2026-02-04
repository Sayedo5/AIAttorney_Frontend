import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Globe, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceRecord?: () => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  onVoiceRecord,
  onFileUpload,
  disabled, 
  placeholder = "Ask AI Attorney..." 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<"EN" | "UR">("EN");
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleVoiceClick = () => {
    setIsRecording(!isRecording);
    onVoiceRecord?.();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload?.(file);
      e.target.value = "";
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "EN" ? "UR" : "EN");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 bg-background border-t border-border/30"
    >
      {/* Main Input Container */}
      <div className="relative rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Text Input Area */}
        <div className="px-4 pt-3 pb-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm resize-none outline-none min-h-[24px] max-h-24"
          />
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          {/* Left Side - Search Button */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Search</span>
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={handleFileClick}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Language Toggle */}
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              <button
                type="button"
                onClick={toggleLanguage}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === "EN" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={toggleLanguage}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === "UR" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                UR
              </button>
            </div>

            {/* Voice Recording */}
            <button
              type="button"
              onClick={handleVoiceClick}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isRecording 
                  ? "bg-destructive text-destructive-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              <Mic className={`w-4 h-4 ${isRecording ? "animate-pulse" : "text-muted-foreground"}`} />
            </button>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                message.trim() && !disabled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer Text */}
      <p className="text-[10px] text-muted-foreground text-center mt-2">
        Authentic citations. Verify applicability. Avoid web searches for Pakistani cases.
      </p>
    </motion.div>
  );
}
