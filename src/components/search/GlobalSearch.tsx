import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  MessageCircle, 
  FileText, 
  Scale, 
  BookOpen,
  Mic,
  ArrowRight,
  Sparkles,
  Star,
  Trash2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchHistory, SearchHistoryItem } from "@/hooks/useSearchHistory";

interface SearchResult {
  id: string;
  type: 'chat' | 'document' | 'case' | 'library';
  title: string;
  subtitle: string;
  icon: typeof MessageCircle;
}

interface GlobalSearchProps {
  onNavigate: (tab: string, query?: string) => void;
  isExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

// Highlight matching text in search results
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-primary/30 text-foreground rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

const typeIcons = {
  chat: MessageCircle,
  document: FileText,
  case: Scale,
  library: BookOpen,
};

const typeColors = {
  chat: 'bg-blue-500/10 text-blue-500',
  document: 'bg-orange-500/10 text-orange-500',
  case: 'bg-primary/10 text-primary',
  library: 'bg-purple-500/10 text-purple-500',
};

const reasonLabels = {
  frequent: { en: 'Frequently searched', ur: 'اکثر تلاش کیا گیا' },
  recent: { en: 'Recent', ur: 'حالیہ' },
  trending: { en: 'Trending', ur: 'مقبول' },
};

export function GlobalSearch({ onNavigate, isExpanded = false, onExpandChange }: GlobalSearchProps) {
  const { t, isRTL, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(isExpanded);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use persistent search history
  const { 
    addSearch, 
    removeSearch, 
    clearHistory, 
    getRecentSearches, 
    getPersonalizedRecommendations,
    getTypePreferences 
  } = useSearchHistory();

  const recentSearches = getRecentSearches(5);
  const recommendations = getPersonalizedRecommendations(4);
  const typePreferences = getTypePreferences();

  const quickActions = [
    { 
      icon: MessageCircle, 
      label: language === 'UR' ? 'نئی چیٹ شروع کریں' : 'Start a new chat', 
      tab: 'chat',
      color: 'bg-blue-500',
      priority: typePreferences.chat
    },
    { 
      icon: FileText, 
      label: language === 'UR' ? 'دستاویز بنائیں' : 'Create document', 
      tab: 'documents',
      color: 'bg-orange-500',
      priority: typePreferences.document
    },
    { 
      icon: Scale, 
      label: language === 'UR' ? 'کیس تلاش کریں' : 'Search cases', 
      tab: 'case-research',
      color: 'bg-primary',
      priority: typePreferences.case
    },
    { 
      icon: BookOpen, 
      label: language === 'UR' ? 'لائبریری دیکھیں' : 'Browse library', 
      tab: 'library',
      color: 'bg-purple-500',
      priority: typePreferences.library
    },
  ].sort((a, b) => b.priority - a.priority);

  const trendingTopics = language === 'UR'
    ? ['سپریم کورٹ کے فیصلے', 'فوجداری قانون', 'دیوانی دعویٰ', 'خاندانی قانون']
    : ['Supreme Court rulings', 'Criminal law', 'Civil litigation', 'Family law'];

  // Mock search results based on query
  const getSearchResults = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const allResults: SearchResult[] = language === 'UR' ? [
      { id: '1', type: 'case', title: 'احمد بمقابلہ ریاست', subtitle: 'فوجداری مقدمہ - 2024', icon: Scale },
      { id: '2', type: 'document', title: 'کرائے کا معاہدہ', subtitle: 'دستاویز ٹیمپلیٹ', icon: FileText },
      { id: '3', type: 'chat', title: 'جائیداد کے بارے میں سوال', subtitle: '2 گھنٹے پہلے', icon: MessageCircle },
      { id: '4', type: 'library', title: 'پاکستانی دستور', subtitle: 'قانونی حوالہ', icon: BookOpen },
    ] : [
      { id: '1', type: 'case', title: 'Ahmad vs State', subtitle: 'Criminal Case - 2024', icon: Scale },
      { id: '2', type: 'document', title: 'Rental Agreement', subtitle: 'Document Template', icon: FileText },
      { id: '3', type: 'chat', title: 'Property Law Query', subtitle: '2 hours ago', icon: MessageCircle },
      { id: '4', type: 'library', title: 'Pakistan Constitution', subtitle: 'Legal Reference', icon: BookOpen },
    ];

    return allResults.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const searchResults = getSearchResults(query);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        onExpandChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onExpandChange]);

  const handleFocus = () => {
    setIsFocused(true);
    onExpandChange?.(true);
  };

  const handleClose = () => {
    setQuery("");
    setIsFocused(false);
    onExpandChange?.(false);
  };

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  const handleResultClick = (result: SearchResult) => {
    // Save search to history
    addSearch(query, result.type);
    onNavigate(result.type === 'case' ? 'case-research' : result.type === 'library' ? 'library' : result.type === 'document' ? 'documents' : 'chat', query);
    handleClose();
  };

  const handleQuickAction = (tab: string) => {
    onNavigate(tab);
    handleClose();
  };

  return (
    <div ref={containerRef} className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Search Input */}
      <motion.div
        layout
        className={`relative bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          isFocused 
            ? 'border-primary shadow-lg shadow-primary/10' 
            : 'border-border hover:border-primary/30'
        }`}
      >
        {/* Input Area */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Search className={`w-5 h-5 flex-shrink-0 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder={language === 'UR' ? 'کیسز، دستاویزات، چیٹس تلاش کریں...' : 'Search cases, documents, chats...'}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
            dir={isRTL ? 'rtl' : 'ltr'}
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}

          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-destructive text-destructive-foreground animate-pulse' 
                : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border"
            >
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {/* Search Results */}
                {query && searchResults.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {language === 'UR' ? 'نتائج' : 'Results'}
                    </h3>
                    <div className="space-y-1">
                      {searchResults.map((result) => {
                        const Icon = typeIcons[result.type];
                        return (
                          <motion.button
                            key={result.id}
                            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => handleResultClick(result)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/80 transition-colors text-left group"
                          >
                            <div className={`w-10 h-10 rounded-xl ${typeColors[result.type]} flex items-center justify-center`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                <HighlightedText text={result.title} query={query} />
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                <HighlightedText text={result.subtitle} query={query} />
                              </p>
                            </div>
                            <ArrowRight className={`w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'rotate-180' : ''}`} />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {query && searchResults.length === 0 && (
                  <div className="text-center py-6">
                    <Search className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'UR' ? 'کوئی نتیجہ نہیں ملا' : 'No results found'}
                    </p>
                    <button
                      onClick={() => onNavigate('chat', query)}
                      className="mt-3 text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      {language === 'UR' ? 'AI سے پوچھیں' : 'Ask AI instead'}
                    </button>
                  </div>
                )}

                {/* Quick Actions - Show when no query */}
                {!query && (
                  <>
                    {/* Quick Actions Grid */}
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {language === 'UR' ? 'فوری کارروائیاں' : 'Quick Actions'}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <motion.button
                            key={action.tab}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleQuickAction(action.tab)}
                            className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all text-left"
                          >
                            <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                              <action.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-foreground truncate">{action.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Personalized Recommendations */}
                    {recommendations.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5" />
                          {language === 'UR' ? 'آپ کے لیے تجویز کردہ' : 'Recommended for You'}
                        </h3>
                        <div className="space-y-1">
                          {recommendations.map((rec, index) => {
                            const Icon = typeIcons[rec.type];
                            return (
                              <motion.button
                                key={`${rec.query}-${index}`}
                                initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                  handleSearch(rec.query);
                                  addSearch(rec.query, rec.type);
                                }}
                                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors text-left group"
                              >
                                <div className={`w-8 h-8 rounded-lg ${typeColors[rec.type]} flex items-center justify-center`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm text-foreground block truncate">{rec.query}</span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {language === 'UR' ? reasonLabels[rec.reason].ur : reasonLabels[rec.reason].en}
                                  </span>
                                </div>
                                <ArrowRight className={`w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'rotate-180' : ''}`} />
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {language === 'UR' ? 'حالیہ تلاش' : 'Recent Searches'}
                          </h3>
                          <button
                            onClick={clearHistory}
                            className="text-[10px] text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            {language === 'UR' ? 'صاف کریں' : 'Clear'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="group relative"
                            >
                              <button
                                onClick={() => {
                                  handleSearch(item.query);
                                  addSearch(item.query, item.type);
                                }}
                                className="px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/50 text-xs text-foreground transition-colors flex items-center gap-1.5"
                              >
                                {item.clickCount > 1 && (
                                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center">
                                    {item.clickCount}
                                  </span>
                                )}
                                {item.query}
                              </button>
                              <button
                                onClick={() => removeSearch(item.id)}
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Topics */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {language === 'UR' ? 'مقبول موضوعات' : 'Trending Topics'}
                      </h3>
                      <div className="space-y-1">
                        {trendingTopics.map((topic, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSearch(topic)}
                            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors text-left group"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                              {index + 1}
                            </div>
                            <span className="text-sm text-foreground flex-1">{topic}</span>
                            <ArrowRight className={`w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'rotate-180' : ''}`} />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-secondary/30">
                <p className="text-[10px] text-muted-foreground text-center">
                  {language === 'UR' 
                    ? 'کیسز، دستاویزات، چیٹ ہسٹری اور لائبریری میں تلاش کریں'
                    : 'Search across cases, documents, chat history & library'
                  }
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop when expanded */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
