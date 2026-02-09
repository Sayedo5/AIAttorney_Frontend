import { motion } from "framer-motion";
import { FileText, Clock, Star, ChevronRight } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  isStarred?: boolean;
}

interface RecentDraft {
  id: string;
  title: string;
  updatedAt: Date;
}

interface DrafterDrawerProps {
  templates: Template[];
  recentDrafts: RecentDraft[];
  onSelectTemplate: (id: string) => void;
  onSelectDraft: (id: string) => void;
}

export function DrafterDrawer({
  templates,
  recentDrafts,
  onSelectTemplate,
  onSelectDraft,
}: DrafterDrawerProps) {
  const starredTemplates = templates.filter((t) => t.isStarred);

  return (
    <div className="p-4 space-y-6">
      {/* Quick Start Templates */}
      {starredTemplates.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Quick Start
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {starredTemplates.slice(0, 4).map((template) => (
              <motion.button
                key={template.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectTemplate(template.id)}
                className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-left"
              >
                <FileText className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {template.name}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Drafts */}
      {recentDrafts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Drafts
          </h3>
          {recentDrafts.slice(0, 5).map((draft, index) => (
            <motion.button
              key={draft.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectDraft(draft.id)}
              className="w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all flex items-center gap-3"
            >
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground truncate text-left">
                {draft.title}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      )}

      {/* All Templates */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          All Templates
        </h3>
        {templates.slice(0, 8).map((template, index) => (
          <motion.button
            key={template.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTemplate(template.id)}
            className="w-full p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{template.name}</p>
              <p className="text-xs text-muted-foreground">{template.category}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
