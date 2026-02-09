import { motion } from "framer-motion";
import { FileText, Trash2, MessageSquare, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DocumentCardProps {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  onSelect: () => void;
  onDelete: () => void;
  onDownload: () => void;
  isSelected?: boolean;
}

export function DocumentCard({
  id,
  name,
  size,
  uploadedAt,
  onSelect,
  onDelete,
  onDownload,
  isSelected,
}: DocumentCardProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? "bg-primary/10 border-primary"
          : "bg-card border-border hover:border-primary/30"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{formatSize(size)}</span>
            <span>•</span>
            <span>{formatDistanceToNow(uploadedAt, { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Download className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 pt-3 border-t border-border"
        >
          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Start Review Chat
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
