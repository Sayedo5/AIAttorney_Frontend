import { motion } from "framer-motion";
import { ArrowLeft, Save, Download, MoreVertical, History } from "lucide-react";

interface EditorHeaderProps {
  title: string;
  isSaving?: boolean;
  hasChanges?: boolean;
  onBack?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
  onVersionHistory?: () => void;
  onMenuClick?: () => void;
}

export function EditorHeader({
  title,
  isSaving,
  hasChanges,
  onBack,
  onSave,
  onDownload,
  onVersionHistory,
  onMenuClick,
}: EditorHeaderProps) {
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
            <h1 className="text-lg font-semibold text-foreground truncate max-w-[180px]">
              {title}
            </h1>
            {isSaving && (
              <p className="text-xs text-muted-foreground">Saving...</p>
            )}
            {hasChanges && !isSaving && (
              <p className="text-xs text-yellow-500">Unsaved changes</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onVersionHistory && (
            <button
              onClick={onVersionHistory}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <History className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <Download className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          {onSave && (
            <button
              onClick={onSave}
              disabled={isSaving || !hasChanges}
              className="p-2 rounded-xl hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5 text-primary" />
            </button>
          )}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
