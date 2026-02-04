import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Upload, 
  Edit3, 
  Eye, 
  MoreVertical,
  CheckCircle2,
  X,
  Loader2
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { IconButton } from "@/components/ui/icon-button";
import { useToast } from "@/hooks/use-toast";

interface DocumentsScreenProps {
  onSettingsClick?: () => void;
  onSupport?: () => void;
  onNotificationsClick?: () => void;
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
];

const quickActions = [
  { icon: Edit3, label: "Draft", description: "Create new document", color: "bg-primary" },
  { icon: Eye, label: "Review", description: "Analyze document", color: "bg-primary" },
  { icon: Upload, label: "Upload", description: "Import file", color: "bg-primary" },
];

export function DocumentsScreen({ onSettingsClick, onSupport, onNotificationsClick }: DocumentsScreenProps) {
  const [activeType, setActiveType] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadedFiles(prev => [...prev, ...files]);
    setIsUploading(false);
    
    toast({
      title: "Files Uploaded",
      description: `Successfully uploaded ${files.length} file(s)`,
    });
    
    e.target.value = "";
  };

  const handleActionClick = (action: string) => {
    if (action === "Upload") {
      handleUploadClick();
    } else {
      toast({
        title: action,
        description: `${action} feature coming soon`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title="Documents" 
        onSettingsClick={onSettingsClick}
        onNotificationsClick={onNotificationsClick}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        multiple
      />

      {/* Quick Actions Section */}
      <section className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
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
                  onClick={() => handleActionClick(action.label)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all"
                  whileTap={{ scale: 0.95 }}
                  disabled={isUploading && action.label === "Upload"}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center shadow-sm`}>
                    {isUploading && action.label === "Upload" ? (
                      <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm text-foreground">{action.label}</p>
                    <p className="text-[10px] text-muted-foreground">{action.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <section className="px-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-4"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3">Recently Uploaded</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB • Just now
                    </p>
                  </div>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="w-8 h-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Search Section */}
      <section className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full px-4 py-3 pl-10 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {documentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeType === type.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Documents List Section */}
      <section className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Recent Documents</h3>
            <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
              View all
            </button>
          </div>

          <div className="space-y-2">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/20 transition-all cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    doc.status === "completed" 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : "bg-primary/10"
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      doc.status === "completed" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-primary"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">{doc.title}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
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
          </div>
        </motion.div>
      </section>
    </div>
  );
}
