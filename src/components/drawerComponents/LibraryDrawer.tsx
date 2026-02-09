import { motion } from "framer-motion";
import { BookOpen, Scale, FileText, Landmark, ChevronRight } from "lucide-react";

interface LibraryCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
}

interface LibraryDrawerProps {
  onSelectCategory: (categoryId: string) => void;
}

const categories: LibraryCategory[] = [
  { id: "case-law", name: "Case Law", icon: Scale, count: 15420 },
  { id: "statutes", name: "Statutes & Acts", icon: Landmark, count: 892 },
  { id: "articles", name: "Legal Articles", icon: FileText, count: 3240 },
  { id: "codes", name: "Legal Codes", icon: BookOpen, count: 156 },
];

export function LibraryDrawer({ onSelectCategory }: LibraryDrawerProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground px-2">
        Browse by Category
      </h3>

      <div className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(category.id)}
            className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <category.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-foreground">{category.name}</h4>
              <p className="text-xs text-muted-foreground">
                {category.count.toLocaleString()} items
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
