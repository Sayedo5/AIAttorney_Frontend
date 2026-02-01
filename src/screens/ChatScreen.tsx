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
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar pb-24"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-start pt-8 h-full text-center px-4"
          >
            {/* Welcome Card - AI Lawyer Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm bg-primary rounded-3xl p-6 mb-6 shadow-lg"
            >
              {/* Avatar */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center relative overflow-hidden">
                  {/* Simplified avatar face */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scale className="w-10 h-10 text-primary" />
                  </div>
                </div>
              </motion.div>

              <h2 className="text-xl font-display font-bold text-primary-foreground mb-1">
                Welcome to AI Attorney
              </h2>
              <p className="text-primary-foreground/80 text-sm">
                Powered by Latest AI Technology
              </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <p className="text-muted-foreground text-sm">
                Start by typing your message below
              </p>
              <p className="text-muted-foreground/70 text-xs mt-2 italic">
                E.g. Explain the legal implications of starting an e-commerce business
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
                  className="w-full p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-card-elevated transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
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
      <div className="pb-20">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
