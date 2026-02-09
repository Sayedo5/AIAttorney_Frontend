import { motion } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";

interface VersionHeaderProps {
  versionName: string;
  onBack: () => void;
  onRestore: () => void;
  onCancel: () => void;
}

export function VersionHeader({
  versionName,
  onBack,
  onRestore,
  onCancel,
}: VersionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-yellow-500/10 backdrop-blur-lg border-b border-yellow-500/30"
    >
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <p className="text-xs text-yellow-600 font-medium">Previewing Version</p>
            <h1 className="text-sm font-semibold text-foreground">{versionName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={onRestore}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            Restore
          </button>
        </div>
      </div>
    </motion.header>
  );
}
