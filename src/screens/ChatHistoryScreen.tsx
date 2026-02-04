import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  Plus, 
  MessageCircle, 
  Trash2, 
  MoreVertical,
  Calendar,
  Clock,
  ChevronDown,
  Search,
  X
} from "lucide-react";
import { useChatHistory, ChatConversation } from "@/hooks/useChatHistory";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatHistoryScreenProps {
  onSelectChat?: (chatId: string) => void;
  onBack?: () => void;
  onNewChat?: () => void;
}

const dateLabels: Record<string, { en: string; ur: string }> = {
  Today: { en: "Today", ur: "آج" },
  Yesterday: { en: "Yesterday", ur: "کل" },
  "This Week": { en: "This Week", ur: "اس ہفتے" },
  "This Month": { en: "This Month", ur: "اس مہینے" },
  Older: { en: "Older", ur: "پرانے" },
};

export function ChatHistoryScreen({ onSelectChat, onBack, onNewChat }: ChatHistoryScreenProps) {
  const { language, isRTL } = useLanguage();
  const { 
    getGroupedConversations, 
    deleteConversation, 
    clearAllConversations,
    conversations 
  } = useChatHistory();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Today", "Yesterday", "This Week"]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const groupedConversations = getGroupedConversations();

  // Filter conversations based on search
  const filteredGroups = groupedConversations.map(([label, items]) => [
    label,
    items.filter(
      (conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  ]).filter(([_, items]) => (items as ChatConversation[]).length > 0) as [string, ChatConversation[]][];

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleDeleteAll = () => {
    clearAllConversations();
    setShowDeleteConfirm(false);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header - Following AI Lawyer reference design */}
      <div className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <svg 
              className={`w-5 h-5 text-primary-foreground ${isRTL ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-display font-bold text-primary-foreground">
            {language === "UR" ? "تمام گفتگو" : "All Conversations"}
          </h1>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* New Chat Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat || onBack}
          className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-medium text-primary-foreground">
            {language === "UR" ? "نئی چیٹ" : "New chat"}
          </span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === "UR" ? "گفتگو تلاش کریں..." : "Search conversations..."}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted flex items-center justify-center"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Delete All Button */}
      {conversations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pt-4"
        >
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === "UR" ? "سب حذف کریں" : "Delete All Chats"}
            </span>
          </button>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border shadow-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {language === "UR" ? "تصدیق کریں" : "Confirm Delete"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "UR" 
                  ? "کیا آپ واقعی تمام گفتگو حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں ہو سکتا۔"
                  : "Are you sure you want to delete all conversations? This action cannot be undone."
                }
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm"
                >
                  {language === "UR" ? "منسوخ" : "Cancel"}
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="flex-1 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-medium text-sm"
                >
                  {language === "UR" ? "حذف کریں" : "Delete All"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grouped Chat List */}
      <div className="px-4 pt-4 space-y-4">
        {filteredGroups.map(([label, items]) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(label)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-sm text-foreground">
                    {language === "UR" ? dateLabels[label]?.ur : dateLabels[label]?.en || label}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({items.length})
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedGroups.includes(label) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </button>

            {/* Group Items */}
            <AnimatePresence>
              {expandedGroups.includes(label) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2">
                    {items.map((conv, index) => (
                      <ChatHistoryItem
                        key={conv.id}
                        conversation={conv}
                        index={index}
                        onClick={() => onSelectChat?.(conv.id)}
                        onDelete={() => deleteConversation(conv.id)}
                        formatTime={formatTime}
                        formatDate={formatDate}
                        language={language}
                        isRTL={isRTL}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center px-6 py-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <p className="text-foreground font-medium mb-1">
            {language === "UR" ? "ابھی کوئی گفتگو نہیں" : "No conversations yet"}
          </p>
          <p className="text-muted-foreground text-sm">
            {language === "UR" ? "شروع کرنے کے لیے نئی چیٹ بنائیں" : "Start a new chat to begin"}
          </p>
        </motion.div>
      )}

      {/* No Search Results */}
      {conversations.length > 0 && filteredGroups.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center px-6 py-12 text-center"
        >
          <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            {language === "UR" ? "کوئی نتیجہ نہیں ملا" : "No results found"}
          </p>
        </motion.div>
      )}
    </div>
  );
}

interface ChatHistoryItemProps {
  conversation: ChatConversation;
  index: number;
  onClick?: () => void;
  onDelete?: () => void;
  formatTime: (date: string) => string;
  formatDate: (date: string) => string;
  language: string;
  isRTL: boolean;
}

function ChatHistoryItem({ 
  conversation, 
  index, 
  onClick, 
  onDelete,
  formatTime,
  formatDate,
  language,
  isRTL
}: ChatHistoryItemProps) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setShowDelete(info.offset.x < 0 ? true : false);
    } else {
      setShowDelete(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
      transition={{ delay: 0.03 * index }}
      className="relative overflow-hidden rounded-xl"
    >
      {/* Delete Button Background */}
      <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} w-20 bg-destructive flex items-center justify-center rounded-xl`}>
        <button onClick={onDelete} className="p-2">
          <Trash2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Card Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: isRTL ? 0 : -80, right: isRTL ? 80 : 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: showDelete ? (isRTL ? 80 : -80) : 0 }}
        onClick={() => !showDelete && onClick?.()}
        className="relative flex items-start gap-3 p-4 bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/20 rounded-xl cursor-pointer transition-colors"
      >
        {/* Chat Icon */}
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title and Status */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground line-clamp-1 flex-1 text-sm">
              {conversation.title}
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              conversation.status === "completed" 
                ? "bg-green-500/10 text-green-600" 
                : "bg-primary/10 text-primary"
            }`}>
              {conversation.status === "completed" 
                ? (language === "UR" ? "مکمل" : "done!")
                : (language === "UR" ? "فعال" : "active")
              }
            </span>
          </div>

          {/* Preview */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {conversation.preview}
          </p>

          {/* Time */}
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
            <Clock className="w-3 h-3" />
            <span>{formatDate(conversation.updatedAt)} • {formatTime(conversation.updatedAt)}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
