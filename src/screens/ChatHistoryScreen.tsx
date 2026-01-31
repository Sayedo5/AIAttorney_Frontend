import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Search, Plus, MessageCircle, Trash2, MoreVertical } from "lucide-react";
import { Header } from "@/components/navigation/Header";

interface ChatHistoryScreenProps {
  onSelectChat?: (chatId: string) => void;
  onBack?: () => void;
}

const chatHistory = [
  {
    id: "1",
    title: "Please build a basic file car...",
    preview: "Explain the legal implications of starting an e-commerce business",
    date: "Today",
    time: "2:30 PM",
    status: "entity",
  },
  {
    id: "2",
    title: "Explain the legal implicatio...",
    preview: "What regulations do I need to comply with for my startup?",
    date: "Today",
    time: "11:15 AM",
    status: "done!",
  },
  {
    id: "3",
    title: "Contract drafting help",
    preview: "I need help drafting a rental agreement for my property",
    date: "Yesterday",
    time: "4:45 PM",
    status: "entity",
  },
  {
    id: "4",
    title: "Inheritance laws query",
    preview: "How does Islamic inheritance law work in Pakistan?",
    date: "Yesterday",
    time: "10:00 AM",
    status: "done!",
  },
  {
    id: "5",
    title: "Company Registration",
    preview: "What documents are needed to register a private limited company?",
    date: "Jan 27, 2026",
    time: "3:20 PM",
    status: "entity",
  },
];

export function ChatHistoryScreen({ onSelectChat, onBack }: ChatHistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState(chatHistory);
  const [deleteMode, setDeleteMode] = useState(false);

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (chatId: string) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId));
  };

  const handleDeleteAll = () => {
    setChats([]);
    setDeleteMode(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header - AI Lawyer Style */}
      <div className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-display font-bold text-primary-foreground">
            All The Conversations
          </h1>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* New Chat Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onBack?.()}
          className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-medium text-primary-foreground">New chat</span>
        </motion.button>
      </div>

      {/* Delete All Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4"
      >
        <button
          onClick={handleDeleteAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm font-medium">Delete All Chats</span>
        </button>
      </motion.div>

      {/* Chat List */}
      <div className="px-4 pt-4 space-y-2">
        <AnimatePresence>
          {filteredChats.map((chat, index) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              index={index}
              onClick={() => onSelectChat?.(chat.id)}
              onDelete={() => handleDelete(chat.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredChats.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center px-6 py-12 text-center"
        >
          <MessageCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No conversations yet</p>
          <p className="text-muted-foreground/70 text-sm mt-1">Start a new chat to begin</p>
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
    status: string;
  };
  index: number;
  onClick?: () => void;
  onDelete?: () => void;
}

function ChatHistoryItem({ chat, index, onClick, onDelete }: ChatHistoryItemProps) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: 0.03 * index }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Delete Button Background */}
      <div className="absolute inset-y-0 right-0 w-20 bg-destructive flex items-center justify-center rounded-r-2xl">
        <button onClick={onDelete} className="p-2">
          <Trash2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Card Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -80, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: showDelete ? -80 : 0 }}
        onClick={() => !showDelete && onClick?.()}
        className="relative flex items-start gap-3 p-4 bg-card border border-border rounded-2xl cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground line-clamp-1 flex-1">
              {chat.title}
            </h3>
            <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
              {chat.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {chat.preview}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            {chat.date} • {chat.time}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
