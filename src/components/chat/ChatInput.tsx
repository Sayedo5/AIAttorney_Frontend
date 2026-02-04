import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Globe, Paperclip, X, FileText } from "lucide-react";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  disabled, 
  placeholder = "Ask AI Attorney..." 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<"EN" | "UR">("EN");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const { 
    isRecording, 
    isSupported, 
    fullTranscript,
    toggleRecording,
    setLanguage: setRecordingLanguage,
    clearTranscript
  } = useVoiceRecording({
    language: language === "EN" ? "en-US" : "ur-PK",
    onError: (error) => {
      toast({
        title: "Voice Error",
        description: error === "not-allowed" 
          ? "Please allow microphone access" 
          : "Voice recording failed",
        variant: "destructive"
      });
    }
  });

  // Update message with transcript when recording
  useEffect(() => {
    if (isRecording && fullTranscript) {
      setMessage(fullTranscript);
    }
  }, [isRecording, fullTranscript]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage("");
      setAttachments([]);
      clearTranscript();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceClick = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice recording is not supported in this browser",
        variant: "destructive"
      });
      return;
    }

    const result = toggleRecording();
    if (result && !isRecording) {
      // Recording stopped, we have the final transcript
      setMessage(prev => prev || result);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files]);
      toast({
        title: "File Added",
        description: `${files.length} file(s) attached`,
      });
    }
    e.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const toggleLanguage = (lang: "EN" | "UR") => {
    setLanguage(lang);
    setRecordingLanguage(lang === "EN" ? "en-US" : "ur-PK");
  };

  const hasContent = message.trim() || attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 bg-background border-t border-border"
    >
      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 mb-2 overflow-x-auto pb-1"
          >
            {attachments.map((file, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border min-w-max"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground truncate max-w-[120px]">
                  {file.name}
                </span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="w-4 h-4 rounded-full bg-muted-foreground/20 hover:bg-destructive/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Container */}
      <div className="relative rounded-2xl border-2 border-border bg-card shadow-sm overflow-hidden">
        {/* Text Input Area */}
        <div className="px-4 pt-3 pb-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? "Listening..." : placeholder}
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background hover:bg-secondary transition-colors"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Search</span>
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              multiple
            />
            <button
              type="button"
              onClick={handleFileClick}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Language Toggle */}
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleLanguage("EN")}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === "EN" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:bg-secondary"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => toggleLanguage("UR")}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === "UR" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:bg-secondary"
                }`}
              >
                UR
              </button>
            </div>

            {/* Voice Recording */}
            <button
              type="button"
              onClick={handleVoiceClick}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? "bg-destructive text-destructive-foreground animate-pulse" 
                  : "hover:bg-secondary"
              }`}
            >
              <Mic className={`w-4 h-4 ${isRecording ? "" : "text-muted-foreground"}`} />
            </button>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!hasContent || disabled}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                hasContent && !disabled
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
