import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Globe, Paperclip, X, FileText, Image, File, FileSpreadsheet } from "lucide-react";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  disabled?: boolean;
}

const getFileIcon = (file: File) => {
  const type = file.type;
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf')) return FileText;
  if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet;
  if (type.includes('document') || type.includes('word')) return FileText;
  return File;
};

const getFileColor = (file: File) => {
  const type = file.type;
  if (type.startsWith('image/')) return 'bg-blue-500';
  if (type.includes('pdf')) return 'bg-red-500';
  if (type.includes('spreadsheet') || type.includes('excel')) return 'bg-green-500';
  if (type.includes('document') || type.includes('word')) return 'bg-blue-600';
  return 'bg-gray-500';
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function ChatInput({ 
  onSend, 
  disabled
}: ChatInputProps) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});
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
        title: t('voiceError'),
        description: error === "not-allowed" 
          ? t('allowMicrophone')
          : t('voiceRecordingFailed'),
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

  // Generate image previews
  useEffect(() => {
    attachments.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => ({
            ...prev,
            [index]: e.target?.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  }, [attachments]);

  const handleSubmit = () => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage("");
      setAttachments([]);
      setImagePreviews({});
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
        title: t('notSupported'),
        description: t('voiceNotSupported'),
        variant: "destructive"
      });
      return;
    }

    const result = toggleRecording();
    if (result && !isRecording) {
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
        title: t('fileAdded'),
        description: `${files.length} ${t('filesAttached')}`,
      });
    }
    e.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const toggleLanguageSelection = (lang: "EN" | "UR") => {
    setLanguage(lang);
    setRecordingLanguage(lang === "EN" ? "en-US" : "ur-PK");
  };

  const hasContent = message.trim() || attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 bg-background border-t border-border"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3"
          >
            <div className="bg-card rounded-xl border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {attachments.length} {t('filesAttached')}
                </span>
                <button
                  onClick={() => {
                    setAttachments([]);
                    setImagePreviews({});
                  }}
                  className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                >
                  {t('removeAll')}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {attachments.map((file, index) => {
                  const FileIcon = getFileIcon(file);
                  const isImage = file.type.startsWith('image/');
                  const preview = imagePreviews[index];
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="relative group"
                    >
                      {isImage && preview ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-secondary">
                          <img 
                            src={preview} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => removeAttachment(index)}
                              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-[10px] text-white truncate">{file.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors">
                          <div className={`w-10 h-10 rounded-lg ${getFileColor(file)} flex items-center justify-center flex-shrink-0`}>
                            <FileIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                            <p className="text-[10px] text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="w-6 h-6 rounded-full bg-muted-foreground/10 hover:bg-destructive/20 flex items-center justify-center transition-colors flex-shrink-0"
                          >
                            <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
            placeholder={isRecording ? t('listening') : t('askAIAttorney')}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm resize-none outline-none min-h-[24px] max-h-24"
            dir={isRTL ? 'rtl' : 'ltr'}
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
            <span className="text-xs font-medium text-foreground">{t('search')}</span>
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
              multiple
            />
            <button
              type="button"
              onClick={handleFileClick}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                attachments.length > 0 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-secondary text-muted-foreground'
              }`}
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Language Toggle */}
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleLanguageSelection("EN")}
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
                onClick={() => toggleLanguageSelection("UR")}
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
        {t('disclaimer')}
      </p>
    </motion.div>
  );
}
