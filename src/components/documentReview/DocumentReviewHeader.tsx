import { motion } from "framer-motion";
import { ArrowLeft, FileText, MoreVertical } from "lucide-react";

interface DocumentReviewHeaderProps {
  title?: string;
  documentName?: string;
  onBack?: () => void;
  onMenuClick?: () => void;
}

export function DocumentReviewHeader({
  title = "Document Review",
  documentName,
  onBack,
  onMenuClick,
}: DocumentReviewHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {documentName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <FileText className="w-3 h-3" />
                <span className="truncate max-w-[180px]">{documentName}</span>
              </div>
            )}
          </div>
        </div>

        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        )}
      </div>
    </motion.header>
  );
}
