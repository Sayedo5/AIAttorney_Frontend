import { motion } from "framer-motion";
import { History, RotateCcw, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Version {
  id: string;
  name: string;
  createdAt: Date;
  createdBy?: string;
}

interface VersionDrawerProps {
  versions: Version[];
  currentVersionId?: string;
  onPreview: (versionId: string) => void;
  onRestore: (versionId: string) => void;
}

export function VersionDrawer({
  versions,
  currentVersionId,
  onPreview,
  onRestore,
}: VersionDrawerProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <History className="w-5 h-5" />
        <span className="font-medium">Version History</span>
      </div>

      {versions.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No versions saved yet
        </p>
      ) : (
        <div className="space-y-2">
          {versions.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl transition-all ${
                currentVersionId === version.id
                  ? "bg-primary/10 border border-primary"
                  : "bg-card border border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{version.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(version.createdAt, { addSuffix: true })}
                  </p>
                  {version.createdBy && (
                    <p className="text-xs text-muted-foreground">
                      by {version.createdBy}
                    </p>
                  )}
                </div>
                {currentVersionId === version.id && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                    Current
                  </span>
                )}
              </div>

              {currentVersionId !== version.id && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onPreview(version.id)}
                    className="flex-1 py-2 rounded-lg bg-secondary text-muted-foreground text-sm font-medium flex items-center justify-center gap-1 hover:text-foreground transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => onRestore(version.id)}
                    className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restore
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
