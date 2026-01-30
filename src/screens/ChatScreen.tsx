import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, History, Sparkles } from "lucide-react";
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
            className="flex flex-col items-center justify-center h-full text-center px-6"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6"
            >
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              How can I help you today?
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              Ask me anything about Pakistani law, legal procedures, or document drafting.
            </p>

            {/* Quick Prompts */}
            <div className="mt-8 w-full space-y-2">
              {[
                "Explain inheritance laws in Pakistan",
                "How to register a company?",
                "What is the procedure for divorce?",
              ].map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-3 rounded-xl border border-border/50 bg-card hover:bg-accent/50 transition-colors text-left text-sm"
                >
                  {prompt}
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
