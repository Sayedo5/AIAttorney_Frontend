import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Plus, 
  Search, 
  Upload, 
  Edit3, 
  Eye, 
  Download,
  MoreVertical,
  Folder,
  File,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { IconButton } from "@/components/ui/icon-button";

interface DocumentsScreenProps {
  onSettingsClick?: () => void;
  onSupport?: () => void;
}

const documentTypes = [
  { id: "all", label: "All" },
  { id: "drafts", label: "Drafts" },
  { id: "reviewed", label: "Reviewed" },
  { id: "templates", label: "Templates" },
];

const documents = [
  {
    id: 1,
    title: "Rental Agreement - Plot 45",
    type: "Draft",
    status: "in_progress",
    date: "Today, 2:30 PM",
    icon: Edit3,
  },
  {
    id: 2,
    title: "Power of Attorney",
    type: "Template",
    status: "completed",
    date: "Yesterday",
    icon: FileText,
  },
  {
    id: 3,
    title: "Sale Deed Review",
    type: "Reviewed",
    status: "completed",
    date: "Jan 28, 2026",
    icon: CheckCircle2,
  },
  {
    id: 4,
    title: "Employment Contract",
    type: "Draft",
    status: "in_progress",
    date: "Jan 27, 2026",
    icon: Edit3,
  },
  {
    id: 5,
    title: "Partnership Agreement",
    type: "Template",
    status: "completed",
    date: "Jan 25, 2026",
    icon: FileText,
  },
];

const quickActions = [
  { icon: Edit3, label: "Draft", description: "Create new document" },
  { icon: Eye, label: "Review", description: "Analyze document" },
  { icon: Upload, label: "Upload", description: "Import file" },
];

export function DocumentsScreen({ onSettingsClick, onSupport }: DocumentsScreenProps) {
  const [activeType, setActiveType] = useState("all");

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header 
        title="Documents" 
        onSettingsClick={onSettingsClick}
      />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4"
      >
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all"
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 pt-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            className="input-modern pl-12"
          />
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-4 pt-4"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {documentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeType === type.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 pt-4 space-y-3"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Recent Documents</h3>
          <button className="text-sm text-primary hover:text-primary-glow transition-colors">
            View all
          </button>
        </div>

        {documents.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                doc.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "bg-accent"
              }`}>
                <Icon className={`w-6 h-6 ${
                  doc.status === "completed" ? "text-green-600 dark:text-green-400" : "text-primary"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-1">{doc.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-primary font-medium">{doc.type}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                </div>
              </div>
              <IconButton
                variant="ghost"
                size="sm"
                icon={<MoreVertical className="w-4 h-4" />}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
