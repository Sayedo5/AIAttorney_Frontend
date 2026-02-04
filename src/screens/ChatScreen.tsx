import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, History, Scale, FileText, X } from "lucide-react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { Header } from "@/components/navigation/Header";
import { IconButton } from "@/components/ui/icon-button";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  attachments?: { name: string; size: number }[];
}

interface ChatScreenProps {
  onHistoryClick?: () => void;
}

const sampleResponses = [
  "Based on Pakistani law, I can help you understand this legal matter. The relevant provisions under the Contract Act 1872 state that...",
  "According to the precedent set in PLD 2020 SC 456, the Supreme Court held that...",
  "For your query regarding property law in Pakistan, Section 54 of the Transfer of Property Act applies here...",
  "The procedure for filing a civil suit involves several steps. First, you need to file a plaint under Order VII of CPC...",
];

const quickPrompts = [
  "Explain the legal implications of starting an e-commerce business",
  "What regulations do I need to comply with?",
  "Draft a basic rental agreement",
];

export function ChatScreen({ onHistoryClick }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string, attachments?: File[]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text || (attachments ? `Sent ${attachments.length} file(s)` : ""),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachments: attachments?.map(f => ({ name: f.name, size: f.size })),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        title="AI Attorney"
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
                  Welcome to AI Attorney
                </h2>
                <p className="text-muted-foreground text-sm">
                  Powered by Latest AI Technology
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
              Start by typing your message below
            </motion.p>

            {/* Quick Prompts Section */}
            <section className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl border border-border shadow-sm p-4"
              >
                <p className="text-xs font-medium text-muted-foreground mb-3">Quick prompts</p>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + 0.1 * index }}
                      onClick={() => handleSend(prompt)}
                      className="w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {prompt}
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-1`}
                  >
                    <div className="flex flex-wrap gap-2 max-w-[85%]">
                      {message.attachments.map((file, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border"
                        >
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-foreground truncate max-w-[100px]">
                            {file.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                <ChatBubble
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
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
