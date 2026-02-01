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
  TrendingUp
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/card";

type SearchCategory = "all" | "civil" | "criminal";

interface CaseResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: string;
  category: "civil" | "criminal";
  summary: string;
}

const mockCases: CaseResult[] = [
  {
    id: "1",
    title: "Muhammad Ali vs State",
    citation: "2024 SCMR 123",
    court: "Supreme Court of Pakistan",
    year: "2024",
    category: "criminal",
    summary: "Appeal against conviction under Section 302 PPC. The court examined the evidence and witness testimonies..."
  },
  {
    id: "2",
    title: "Ahmed Industries vs Commissioner Inland Revenue",
    citation: "2024 PTD 456",
    court: "Lahore High Court",
    year: "2024",
    category: "civil",
    summary: "Tax appeal regarding assessment of income tax for the fiscal year 2022-23. The petitioner challenged..."
  },
  {
    id: "3",
    title: "Fatima Bibi vs Provincial Government",
    citation: "2023 CLC 789",
    court: "Sindh High Court",
    year: "2023",
    category: "civil",
    summary: "Constitutional petition under Article 199 challenging the acquisition of land without proper compensation..."
  },
  {
    id: "4",
    title: "State vs Imran Khan",
    citation: "2023 PCrLJ 321",
    court: "Sessions Court Islamabad",
    year: "2023",
    category: "criminal",
    summary: "Trial for offences under Anti-Terrorism Act. The prosecution presented evidence regarding..."
  },
  {
    id: "5",
    title: "Habib Bank Ltd vs Default Borrower",
    citation: "2024 MLD 654",
    court: "Banking Court Karachi",
    year: "2024",
    category: "civil",
    summary: "Recovery suit under Financial Institutions Recovery Ordinance for outstanding loan amount..."
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

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  };

  const filteredCases = mockCases.filter(c => 
    activeCategory === "all" || c.category === activeCategory
  );

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const categories = [
    { id: "all", label: "All Cases", icon: BookOpen },
    { id: "civil", label: "Civil", icon: Scale },
    { id: "criminal", label: "Criminal", icon: Gavel },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Case Research" />

      <div className="px-4 py-4 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powered by 400k+ case laws
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
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
              placeholder="Search by case name, citation, or keywords..."
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

        {/* Category Tabs */}
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
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

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
                    {filteredCases.length} results for "{searchQuery}"
                  </span>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Filter className="w-3 h-3" />
                  Filter
                </button>
              </div>

              {/* Results List */}
              <div className="space-y-3">
                {filteredCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Card className="p-4 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              caseItem.category === "civil" 
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}>
                              {caseItem.category === "civil" ? "Civil" : "Criminal"}
                            </span>
                            <span className="text-xs text-muted-foreground">{caseItem.year}</span>
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
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
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
                  {[
                    "Supreme Court",
                    "Lahore High Court",
                    "Sindh High Court",
                    "Islamabad High Court",
                    "Peshawar High Court",
                    "Balochistan High Court",
                  ].map((court, index) => (
                    <motion.button
                      key={court}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + 0.03 * index }}
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
