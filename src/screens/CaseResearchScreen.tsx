import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Scale, 
  Gavel, 
  ArrowLeft,
  ChevronRight,
  Filter,
  Clock,
  BookOpen,
  FileText,
  Zap,
  TrendingUp,
  X,
  ChevronDown,
  ArrowUpDown,
  Calendar,
  Building2,
  Bookmark
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/card";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useToast } from "@/hooks/use-toast";

type SearchCategory = "all" | "civil" | "criminal";
type SortOption = "relevance" | "newest" | "oldest" | "cited";

interface CaseResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: string;
  category: "civil" | "criminal";
  summary: string;
  citations?: number;
}

interface Filters {
  court: string;
  yearFrom: string;
  yearTo: string;
  sortBy: SortOption;
}

const courts = [
  "All Courts",
  "Supreme Court of Pakistan",
  "Lahore High Court",
  "Sindh High Court",
  "Islamabad High Court",
  "Peshawar High Court",
  "Balochistan High Court",
  "Federal Shariat Court",
  "Sessions Courts",
  "Banking Courts",
];

const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "cited", label: "Most Cited" },
];

const mockCases: CaseResult[] = [
  {
    id: "1",
    title: "Muhammad Ali vs State",
    citation: "2024 SCMR 123",
    court: "Supreme Court of Pakistan",
    year: "2024",
    category: "criminal",
    summary: "Appeal against conviction under Section 302 PPC. The court examined the evidence and witness testimonies...",
    citations: 45
  },
  {
    id: "2",
    title: "Ahmed Industries vs Commissioner Inland Revenue",
    citation: "2024 PTD 456",
    court: "Lahore High Court",
    year: "2024",
    category: "civil",
    summary: "Tax appeal regarding assessment of income tax for the fiscal year 2022-23. The petitioner challenged...",
    citations: 23
  },
  {
    id: "3",
    title: "Fatima Bibi vs Provincial Government",
    citation: "2023 CLC 789",
    court: "Sindh High Court",
    year: "2023",
    category: "civil",
    summary: "Constitutional petition under Article 199 challenging the acquisition of land without proper compensation...",
    citations: 67
  },
  {
    id: "4",
    title: "State vs Imran Khan",
    citation: "2023 PCrLJ 321",
    court: "Islamabad High Court",
    year: "2023",
    category: "criminal",
    summary: "Trial for offences under Anti-Terrorism Act. The prosecution presented evidence regarding...",
    citations: 112
  },
  {
    id: "5",
    title: "Habib Bank Ltd vs Default Borrower",
    citation: "2024 MLD 654",
    court: "Banking Courts",
    year: "2024",
    category: "civil",
    summary: "Recovery suit under Financial Institutions Recovery Ordinance for outstanding loan amount...",
    citations: 8
  },
  {
    id: "6",
    title: "Khan Brothers vs Revenue Department",
    citation: "2022 PTD 987",
    court: "Peshawar High Court",
    year: "2022",
    category: "civil",
    summary: "Appeal against assessment order. The petitioner challenged the additional tax levy imposed...",
    citations: 34
  },
];

const recentSearches = [
  "Section 302 PPC murder case",
  "Property dispute inheritance",
  "Cheque bounce case",
  "Constitutional petition Article 199",
];

const trendingTopics = [
  { label: "Anti-Terrorism Cases", count: 156 },
  { label: "Property Disputes", count: 243 },
  { label: "Banking Recovery", count: 89 },
  { label: "Family Law Matters", count: 178 },
];

export function CaseResearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    court: "All Courts",
    yearFrom: "",
    yearTo: "",
    sortBy: "relevance",
  });
  
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  };

  const applyFilters = (cases: CaseResult[]) => {
    let filtered = cases.filter(c => 
      activeCategory === "all" || c.category === activeCategory
    );

    // Filter by court
    if (filters.court !== "All Courts") {
      filtered = filtered.filter(c => c.court === filters.court);
    }

    // Filter by year range
    if (filters.yearFrom) {
      filtered = filtered.filter(c => parseInt(c.year) >= parseInt(filters.yearFrom));
    }
    if (filters.yearTo) {
      filtered = filtered.filter(c => parseInt(c.year) <= parseInt(filters.yearTo));
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case "oldest":
        filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        break;
      case "cited":
        filtered.sort((a, b) => (b.citations || 0) - (a.citations || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredCases = applyFilters(mockCases);

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleBookmarkToggle = (caseItem: CaseResult, e: React.MouseEvent) => {
    e.stopPropagation();
    const wasBookmarked = isBookmarked(caseItem.id);
    toggleBookmark(caseItem);
    toast({
      title: wasBookmarked ? "Bookmark removed" : "Case bookmarked",
      description: wasBookmarked 
        ? `"${caseItem.title}" removed from bookmarks`
        : `"${caseItem.title}" saved to your bookmarks`,
    });
  };

  const clearFilters = () => {
    setFilters({
      court: "All Courts",
      yearFrom: "",
      yearTo: "",
      sortBy: "relevance",
    });
  };

  const hasActiveFilters = 
    filters.court !== "All Courts" || 
    filters.yearFrom !== "" || 
    filters.yearTo !== "" ||
    filters.sortBy !== "relevance";

  const categories = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "civil", label: "Civil", icon: Scale },
    { id: "criminal", label: "Criminal", icon: Gavel },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Case Research" />

      <div className="px-4 py-4 space-y-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <Zap className="w-4 h-4" />
            Powered by 400k+ case laws
          </div>
          <h1 className="text-xl font-display font-bold text-foreground mb-1">
            Search Case Laws
          </h1>
          <p className="text-muted-foreground text-sm">
            Find relevant precedents instantly
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by case name, citation..."
              className="input-modern pl-12 pr-24"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 transition-all hover:bg-primary/90"
            >
              {isSearching ? "..." : "Search"}
            </motion.button>
          </div>
        </motion.div>

        {/* Category Tabs + Filter Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id as SearchCategory)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
              showFilters || hasActiveFilters
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="w-4 h-4" />
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary-foreground" />
            )}
          </motion.button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    Search Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:text-primary-glow transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Court Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    Court
                  </label>
                  <div className="relative">
                    <select
                      value={filters.court}
                      onChange={(e) => setFilters({ ...filters, court: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    >
                      {courts.map((court) => (
                        <option key={court} value={court}>{court}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Year Range
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <select
                        value={filters.yearFrom}
                        onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      >
                        <option value="">From</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <span className="flex items-center text-muted-foreground">—</span>
                    <div className="relative flex-1">
                      <select
                        value={filters.yearTo}
                        onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      >
                        <option value="">To</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                    Sort By
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {sortOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, sortBy: option.value })}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          filters.sortBy === option.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 rounded-xl btn-primary-gradient font-semibold"
                >
                  Apply Filters
                </motion.button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showResults ? (
            /* Search Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleBack}
                    className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {filteredCases.length} results
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Sorted by: {sortOptions.find(s => s.value === filters.sortBy)?.label}</span>
                </div>
              </div>

              {/* Active Filter Tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {filters.court !== "All Courts" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {filters.court}
                      <button onClick={() => setFilters({ ...filters, court: "All Courts" })}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {(filters.yearFrom || filters.yearTo) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {filters.yearFrom || "Any"} - {filters.yearTo || "Any"}
                      <button onClick={() => setFilters({ ...filters, yearFrom: "", yearTo: "" })}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Results List */}
              <div className="space-y-3">
                {filteredCases.length > 0 ? (
                  filteredCases.map((caseItem, index) => (
                    <motion.div
                      key={caseItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Card className="p-4 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                caseItem.category === "civil" 
                                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                                  : "bg-red-500/10 text-red-600 dark:text-red-400"
                              }`}>
                                {caseItem.category === "civil" ? "Civil" : "Criminal"}
                              </span>
                              <span className="text-xs text-muted-foreground">{caseItem.year}</span>
                              {caseItem.citations && (
                                <span className="text-xs text-muted-foreground">
                                  • {caseItem.citations} citations
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {caseItem.title}
                            </h3>
                            <p className="text-sm text-primary font-medium mt-0.5">
                              {caseItem.citation}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {caseItem.court}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {caseItem.summary}
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleBookmarkToggle(caseItem, e)}
                              className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                            >
                              <Bookmark 
                                className={`w-5 h-5 transition-colors ${
                                  isBookmarked(caseItem.id) 
                                    ? "fill-primary text-primary" 
                                    : "text-muted-foreground group-hover:text-primary"
                                }`} 
                              />
                            </motion.button>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No cases found matching your filters</p>
                    <button 
                      onClick={clearFilters}
                      className="mt-2 text-sm text-primary hover:text-primary-glow"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Initial State - Recent & Trending */
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Recent Searches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Recent Searches</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + 0.05 * index }}
                      onClick={() => {
                        setSearchQuery(search);
                        handleSearch();
                      }}
                      className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:border-primary/50 hover:bg-accent/50 transition-all"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Trending Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Trending Topics</h2>
                </div>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + 0.05 * index }}
                      onClick={() => {
                        setSearchQuery(topic.label);
                        handleSearch();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all group"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {topic.label}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {topic.count} cases
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-3"
              >
                <Card className="p-4 text-center bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
                  <Scale className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-foreground">250K+</p>
                  <p className="text-xs text-muted-foreground">Civil Cases</p>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-red-500/5 to-red-500/10 border-red-500/20">
                  <Gavel className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-foreground">150K+</p>
                  <p className="text-xs text-muted-foreground">Criminal Cases</p>
                </Card>
              </motion.div>

              {/* Featured Courts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Browse by Court</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {courts.slice(1, 7).map((court, index) => (
                    <motion.button
                      key={court}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + 0.03 * index }}
                      onClick={() => {
                        setFilters({ ...filters, court });
                        setSearchQuery("*");
                        handleSearch();
                      }}
                      className="p-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-accent/30 transition-all text-left"
                    >
                      {court}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
