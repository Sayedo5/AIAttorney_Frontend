import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, History, Scale } from "lucide-react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { Header } from "@/components/navigation/Header";
import { IconButton } from "@/components/ui/icon-button";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
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

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar pb-20"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-start pt-8 h-full text-center px-2"
          >
            {/* Welcome Card - Compact for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xs bg-primary rounded-2xl p-5 mb-5 shadow-lg"
            >
              {/* Avatar */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center">
                  <Scale className="w-7 h-7 text-primary" />
                </div>
              </motion.div>

              <h2 className="text-lg font-display font-bold text-primary-foreground mb-1">
                Welcome to AI Attorney
              </h2>
              <p className="text-primary-foreground/80 text-xs">
                Powered by Latest AI Technology
              </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4"
            >
              <p className="text-muted-foreground text-sm">
                Start by typing your message below
              </p>
            </motion.div>

            {/* Quick Prompts */}
            <div className="w-full space-y-2">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + 0.1 * index }}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card-elevated transition-all text-left group"
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
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
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
