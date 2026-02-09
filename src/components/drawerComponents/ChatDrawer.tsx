import { motion } from "framer-motion";
import { MessageSquare, Plus, Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
}

interface ChatDrawerProps {
  sessions: ChatSession[];
  currentSessionId?: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}

export function ChatDrawer({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: ChatDrawerProps) {
  return (
    <div className="p-4 space-y-4">
      {/* New Chat Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNewChat}
        className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        New Chat
      </motion.button>

      {/* Sessions List */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          Recent Chats
        </h3>
        {sessions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No chat history yet
          </p>
        ) : (
          sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                currentSessionId === session.id
                  ? "bg-primary/10 border border-primary"
                  : "bg-secondary/50 border border-transparent hover:border-primary/30"
              }`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {session.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {session.lastMessage}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
