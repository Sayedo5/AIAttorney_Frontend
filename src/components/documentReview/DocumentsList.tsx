import { motion } from "framer-motion";
import { DocumentCard } from "./DocumentCard";

interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

interface DocumentsListProps {
  documents: Document[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
}

export function DocumentsList({
  documents,
  selectedId,
  onSelect,
  onDelete,
  onDownload,
}: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground">No documents uploaded yet</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <DocumentCard
            {...doc}
            isSelected={selectedId === doc.id}
            onSelect={() => onSelect(doc.id)}
            onDelete={() => onDelete(doc.id)}
            onDownload={() => onDownload(doc.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}
