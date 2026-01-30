import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Scale, FileText, ChevronRight, Star, Clock } from "lucide-react";
import { Header } from "@/components/navigation/Header";

interface LibraryScreenProps {}

const categories = [
  { id: "all", label: "All" },
  { id: "cases", label: "Cases" },
  { id: "statutes", label: "Statutes" },
  { id: "articles", label: "Articles" },
];

const libraryItems = [
  {
    id: 1,
    title: "Pakistan Penal Code 1860",
    type: "Statute",
    icon: FileText,
    description: "Complete text with amendments up to 2024",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Contract Act 1872",
    type: "Statute",
    icon: FileText,
    description: "Law of contracts in Pakistan",
    isFavorite: false,
  },
  {
    id: 3,
    title: "PLD 2024 SC 234",
    type: "Case",
    icon: Scale,
    description: "Landmark judgment on fundamental rights",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Constitution of Pakistan",
    type: "Statute",
    icon: BookOpen,
    description: "Complete constitutional text with schedules",
    isFavorite: false,
  },
  {
    id: 5,
    title: "CPC 1908",
    type: "Statute",
    icon: FileText,
    description: "Civil Procedure Code with all amendments",
    isFavorite: false,
  },
  {
    id: 6,
    title: "2023 SCMR 456",
    type: "Case",
    icon: Scale,
    description: "Important precedent on property disputes",
    isFavorite: false,
  },
];

const recentSearches = [
  "Section 302 PPC",
  "Bail provisions",
  "Property transfer",
  "Divorce procedure",
];

export function LibraryScreen({}: LibraryScreenProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = libraryItems.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "cases") return item.type === "Case";
    if (activeCategory === "statutes") return item.type === "Statute";
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Legal Library" />

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

      {/* Recent Searches */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-4 pt-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Recent</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="px-3 py-1.5 text-sm rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-4 pt-6"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Library Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 pt-4 space-y-3"
      >
        {filteredItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
                    <span className="text-xs text-primary font-medium">{item.type}</span>
                  </div>
                  {item.isFavorite && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-3" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
