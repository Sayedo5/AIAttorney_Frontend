import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Scale, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  Star, 
  ArrowLeft,
  Bookmark
} from "lucide-react";
import { Header } from "@/components/navigation/Header";

interface LibraryScreenProps {
  onSettingsClick?: () => void;
  onLogout?: () => void;
  onBookmarkedCasesClick?: () => void;
}

interface Category {
  id: string;
  label: string;
  items: CategoryItem[];
}

interface CategoryItem {
  id: string;
  label: string;
  description?: string;
  date?: string;
}

const libraryCategories: Category[] = [
  {
    id: "bookmarks",
    label: "Bookmarks",
    items: [
      { id: "bm1", label: "Saved Cases", description: "Your bookmarked cases" },
      { id: "bm2", label: "Saved Statutes", description: "Your bookmarked statutes" },
    ],
  },
  {
    id: "cases",
    label: "Cases",
    items: [
      { id: "pk-cases", label: "Pakistan Cases", description: "Supreme Court & High Courts" },
      { id: "uk-cases", label: "UK Cases", description: "UK Precedents" },
    ],
  },
  {
    id: "acts",
    label: "Acts",
    items: [
      { id: "civil-acts", label: "The Civil Major Acts", description: "Civil law statutes" },
      { id: "criminal-acts", label: "The Criminal Major Acts", description: "Criminal law statutes" },
      { id: "parliament-acts", label: "Acts of Parliament", description: "Parliamentary legislation" },
      { id: "finance-acts", label: "Finance Acts", description: "Financial legislation" },
    ],
  },
  {
    id: "codes",
    label: "Codes",
    items: [
      { id: "kpk-code", label: "Khyber Pakhtunkhwa Code", description: "KPK provincial laws" },
      { id: "punjab-code", label: "Punjab Code", description: "Punjab provincial laws" },
      { id: "sindh-code", label: "Sindh Code", description: "Sindh provincial laws" },
      { id: "balochistan-code", label: "Balochistan Code", description: "Balochistan provincial laws" },
    ],
  },
];

const sampleDocuments = [
  {
    id: 1,
    title: "THE KHYBER PAKHTUNKHWA, MINISTERS (SALARIES, ALLOWANCES AND PRIVILEGES) ACT, 1975",
    department: "Administration Department",
    year: "1975",
    date: "23-06-1975",
  },
  {
    id: 2,
    title: "THE KHYBER PAKHTUNKHWA CIVIL SERVANTS ACT, 1973",
    department: "Administration Department",
    year: "1973",
    date: "15-03-1973",
  },
  {
    id: 3,
    title: "THE KHYBER PAKHTUNKHWA LOCAL GOVERNMENT ACT, 2013",
    department: "Local Government Department",
    year: "2013",
    date: "08-11-2013",
  },
];

export function LibraryScreen({ onSettingsClick, onLogout, onBookmarkedCasesClick }: LibraryScreenProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["cases", "acts", "codes"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleItemClick = (item: CategoryItem) => {
    // Check if it's the "Saved Cases" bookmark item
    if (item.id === "bm1" && onBookmarkedCasesClick) {
      onBookmarkedCasesClick();
      return;
    }
    setSelectedItem(item);
    setSelectedCategory(item.id);
  };

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
      setSelectedCategory(null);
    }
  };

  // Detail view when an item is selected
  if (selectedItem) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="Library" onSettingsClick={onSettingsClick} />
        
        <div className="px-4 py-4">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
            <span className="text-primary">Library</span>
            <span>/</span>
            <span className="text-primary">{selectedItem.label}</span>
            <span>/</span>
            <span className="text-foreground">Administration Department</span>
          </div>

          {/* Department Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary text-primary-foreground rounded-xl p-4 mb-6"
          >
            <h2 className="text-lg font-semibold">Administration Department</h2>
          </motion.div>

          {/* Search in this section */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in this section..."
              className="input-modern pl-12"
            />
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            {sampleDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all cursor-pointer"
              >
                <h3 className="font-medium text-foreground text-sm leading-relaxed line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {doc.department} | {doc.year} | Promulgation Date: {doc.date}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
            >
              Previous
            </motion.button>
            <span className="text-sm text-muted-foreground">Page 1</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Main library view with sidebar categories
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Legal Library" onSettingsClick={onSettingsClick} />

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases, statutes, articles..."
            className="input-modern pl-12"
          />
        </div>
      </motion.div>

      {/* Collapsible Categories */}
      <div className="px-4 pt-6 space-y-2">
        {libraryCategories.map((category, catIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * catIndex }}
            className="rounded-2xl bg-card border border-border/50 overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {category.id === "bookmarks" && <Bookmark className="w-5 h-5 text-primary" />}
                {category.id === "cases" && <Scale className="w-5 h-5 text-primary" />}
                {category.id === "acts" && <FileText className="w-5 h-5 text-primary" />}
                {category.id === "codes" && <BookOpen className="w-5 h-5 text-primary" />}
                <span className="font-semibold text-foreground">{category.label}</span>
              </div>
              <motion.div
                animate={{ rotate: expandedCategories.includes(category.id) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </button>

            {/* Category Items */}
            <AnimatePresence>
              {expandedCategories.includes(category.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * itemIndex }}
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                          selectedCategory === item.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border/50 hover:border-primary/50 hover:bg-accent/30"
                        }`}
                      >
                        <span className={`font-medium text-sm ${
                          selectedCategory === item.id ? "text-primary-foreground" : "text-foreground"
                        }`}>
                          {item.label}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${
                          selectedCategory === item.id ? "text-primary-foreground" : "text-muted-foreground"
                        }`} />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 pt-6"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
            <p className="text-2xl font-display font-bold text-primary">400K+</p>
            <p className="text-xs text-muted-foreground mt-1">Case Laws</p>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
            <p className="text-2xl font-display font-bold text-primary">5K+</p>
            <p className="text-xs text-muted-foreground mt-1">Statutes</p>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
            <p className="text-2xl font-display font-bold text-primary">50+</p>
            <p className="text-xs text-muted-foreground mt-1">Acts</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
