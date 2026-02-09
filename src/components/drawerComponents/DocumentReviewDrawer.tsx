import { motion } from "framer-motion";
import { FileText, Upload, Clock, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

interface DocumentReviewDrawerProps {
  documents: Document[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onUpload: () => void;
  onDelete: (id: string) => void;
}

export function DocumentReviewDrawer({
  documents,
  selectedId,
  onSelect,
  onUpload,
  onDelete,
}: DocumentReviewDrawerProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="p-4 space-y-4">
      {/* Upload Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onUpload}
        className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
      >
        <Upload className="w-5 h-5" />
        Upload Document
      </motion.button>

      {/* Documents List */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          Your Documents
        </h3>
        {documents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No documents uploaded yet
          </p>
        ) : (
          documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(doc.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                selectedId === doc.id
                  ? "bg-primary/10 border border-primary"
                  : "bg-card border border-border hover:border-primary/30"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{doc.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatSize(doc.size)}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{formatDistanceToNow(doc.uploadedAt, { addSuffix: true })}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(doc.id);
                }}
                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
