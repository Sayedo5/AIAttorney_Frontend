import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, MessageCircle, ChevronRight, Trash2, Pin } from "lucide-react";
import { Header } from "@/components/navigation/Header";

interface ChatHistoryScreenProps {
  onSelectChat?: (chatId: string) => void;
  onBack?: () => void;
}

const chatHistory = [
  {
    id: "1",
    title: "Property Transfer Query",
    preview: "Can you explain the process of property transfer in Pakistan...",
    date: "Today",
    time: "2:30 PM",
    isPinned: true,
  },
  {
    id: "2",
    title: "Contract Law Question",
    preview: "What are the essential elements of a valid contract under...",
    date: "Today",
    time: "11:15 AM",
    isPinned: false,
  },
  {
    id: "3",
    title: "Criminal Procedure Help",
    preview: "I need to understand the bail procedure in Pakistan...",
    date: "Yesterday",
    time: "4:45 PM",
    isPinned: true,
  },
  {
    id: "4",
    title: "Inheritance Laws",
    preview: "How does Islamic inheritance law work in Pakistan...",
    date: "Yesterday",
    time: "10:00 AM",
    isPinned: false,
  },
  {
    id: "5",
    title: "Company Registration",
    preview: "What documents are needed to register a private limited...",
    date: "Jan 27, 2026",
    time: "3:20 PM",
    isPinned: false,
  },
  {
    id: "6",
    title: "Employment Law",
    preview: "What are the rights of employees under labor laws...",
    date: "Jan 26, 2026",
    time: "9:00 AM",
    isPinned: false,
  },
];

export function ChatHistoryScreen({ onSelectChat, onBack }: ChatHistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter((c) => c.isPinned);
  const recentChats = filteredChats.filter((c) => !c.isPinned);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Chat History" showBack onBack={onBack} />

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="input-modern pl-12"
          />
        </div>
      </motion.div>

      {/* Pinned Chats */}
      {pinnedChats.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-4 pt-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Pin className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Pinned</h3>
          </div>
          <div className="space-y-2">
            {pinnedChats.map((chat, index) => (
              <ChatHistoryItem 
                key={chat.id} 
                chat={chat} 
                index={index}
                onClick={() => onSelectChat?.(chat.id)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Chats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-4 pt-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">Recent</h3>
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {recentChats.map((chat, index) => (
              <ChatHistoryItem 
                key={chat.id} 
                chat={chat} 
                index={index}
                onClick={() => onSelectChat?.(chat.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredChats.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center px-6 py-12 text-center"
        >
          <MessageCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No conversations found</p>
        </motion.div>
      )}
    </div>
  );
}

interface ChatHistoryItemProps {
  chat: {
    id: string;
    title: string;
    preview: string;
    date: string;
    time: string;
    isPinned: boolean;
  };
  index: number;
  onClick?: () => void;
}

function ChatHistoryItem({ chat, index, onClick }: ChatHistoryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: 0.03 * index }}
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{chat.title}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{chat.preview}</p>
        <p className="text-xs text-muted-foreground mt-1">{chat.date}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
