import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, History, Scale, FileText, Image, File, FileSpreadsheet } from "lucide-react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { Header } from "@/components/navigation/Header";
import { IconButton } from "@/components/ui/icon-button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChatHistory, ChatMessage } from "@/hooks/useChatHistory";

interface Attachment {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface ChatScreenProps {
  onHistoryClick?: () => void;
  conversationId?: string | null;
  onConversationChange?: (id: string) => void;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf')) return FileText;
  if (type.includes('spreadsheet') || type.includes('excel')) return FileSpreadsheet;
  if (type.includes('document') || type.includes('word')) return FileText;
  return File;
};

const getFileColor = (type: string) => {
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

export function ChatScreen({ onHistoryClick, conversationId, onConversationChange }: ChatScreenProps) {
  const { t, isRTL, getAIResponse, language } = useLanguage();
  const { 
    createConversation, 
    addMessage, 
    getConversation 
  } = useChatHistory();
  
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load existing conversation if ID provided
  useEffect(() => {
    if (conversationId) {
      const conv = getConversation(conversationId);
      if (conv) {
        setMessages(conv.messages);
        setCurrentConversationId(conversationId);
      }
    }
  }, [conversationId, getConversation]);

  // Quick prompts with translations
  const quickPrompts = [
    { key: 'prompt1', text: t('prompt1') },
    { key: 'prompt2', text: t('prompt2') },
    { key: 'prompt3', text: t('prompt3') },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string, files?: File[]) => {
    // Process files to create attachment objects with previews
    const attachments: Attachment[] = [];
    
    if (files) {
      for (const file of files) {
        const attachment: Attachment = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
        
        // Generate preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          const preview = await new Promise<string>((resolve) => {
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
          attachment.preview = preview;
        }
        
        attachments.push(attachment);
      }
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text || "",
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    
    // Create new conversation or add to existing
    let convId = currentConversationId;
    if (!convId) {
      convId = createConversation(userMessage);
      setCurrentConversationId(convId);
      onConversationChange?.(convId);
    } else {
      addMessage(convId, userMessage);
    }
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response in the current language
    setTimeout(() => {
      setIsTyping(false);
      const baseResponse = getAIResponse();
      const responseText = attachments.length > 0 
        ? (language === 'UR' 
            ? `میں نے آپ کی ${attachments.length} فائل(یں) وصول کر لی ہیں۔ ${baseResponse}`
            : `I've received your ${attachments.length} file(s). ${baseResponse}`)
        : baseResponse;
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      
      if (convId) {
        addMessage(convId, aiMessage);
      }
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  const renderAttachments = (attachments: Attachment[], isUser: boolean) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
      >
        <div className={`grid gap-2 max-w-[85%] ${attachments.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {attachments.map((file, idx) => {
            const FileIcon = getFileIcon(file.type);
            const isImage = file.type.startsWith('image/');
            
            return (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="overflow-hidden"
              >
                {isImage && file.preview ? (
                  <div className="relative rounded-xl overflow-hidden border border-border shadow-sm">
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="w-full max-w-[200px] h-auto object-cover rounded-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-[10px] text-white truncate">{file.name}</p>
                      <p className="text-[9px] text-white/70">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-center gap-3 p-3 rounded-xl border shadow-sm min-w-[180px] ${
                    isUser 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-secondary border-border'
                  }`}>
                    <div className={`w-10 h-10 rounded-lg ${getFileColor(file.type)} flex items-center justify-center flex-shrink-0`}>
                      <FileIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header
        title={t('aiAttorney')}
        rightAction={
          <div className="flex items-center gap-2">
            <IconButton
              variant="ghost"
              size="sm"
              icon={<History className="w-5 h-5" />}
              onClick={onHistoryClick}
            />
            <IconButton
              variant="soft"
              size="sm"
              icon={<Plus className="w-5 h-5" />}
              onClick={startNewChat}
            />
          </div>
        }
      />

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar pb-20"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-start pt-6 h-full text-center"
          >
            {/* Welcome Card Section */}
            <section className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-card rounded-2xl border border-border shadow-sm p-6 mb-4"
              >
                {/* Avatar */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Scale className="w-6 h-6 text-primary-foreground" />
                  </div>
                </motion.div>

                <h2 className="text-lg font-display font-bold text-foreground mb-1">
                  {t('welcomeToAIAttorney')}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {t('poweredByAI')}
                </p>
              </motion.div>
            </section>

            {/* Instructions */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-sm mb-4"
            >
              {t('startTyping')}
            </motion.p>

            {/* Quick Prompts Section */}
            <section className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl border border-border shadow-sm p-4"
              >
                <p className="text-xs font-medium text-muted-foreground mb-3">{t('quickPrompts')}</p>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={prompt.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + 0.1 * index }}
                      onClick={() => handleSend(prompt.text)}
                      className="w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all text-left group"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {prompt.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </section>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <div key={message.id}>
                {/* Show attachments if any */}
                {message.attachments && message.attachments.length > 0 && (
                  renderAttachments(message.attachments, message.isUser)
                )}
                {/* Only show chat bubble if there's text */}
                {message.text && (
                  <ChatBubble
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                )}
              </div>
            ))}
            {isTyping && (
              <ChatBubble
                key="typing"
                message=""
                isUser={false}
                isTyping
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Input */}
      <div className="pb-16">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
