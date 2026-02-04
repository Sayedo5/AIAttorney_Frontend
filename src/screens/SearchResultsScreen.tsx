import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  FileText, 
  Scale, 
  BookOpen,
  ChevronRight,
  Filter,
  X,
  Clock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fuzzySearch, highlightFuzzyMatch } from "@/lib/fuzzySearch";

interface SearchResultsScreenProps {
  query: string;
  onBack: () => void;
  onNavigate: (tab: string, query?: string) => void;
}

interface SearchResult {
  id: string;
  type: 'chat' | 'document' | 'case' | 'library';
  title: string;
  subtitle: string;
  description?: string;
  date?: string;
}

const typeIcons = {
  chat: MessageCircle,
  document: FileText,
  case: Scale,
  library: BookOpen,
};

const typeColors = {
  chat: 'bg-blue-500',
  document: 'bg-orange-500',
  case: 'bg-primary',
  library: 'bg-purple-500',
};

const typeLabels = {
  chat: { en: 'Chat', ur: 'چیٹ' },
  document: { en: 'Document', ur: 'دستاویز' },
  case: { en: 'Case', ur: 'کیس' },
  library: { en: 'Library', ur: 'لائبریری' },
};

// Fuzzy-aware highlight component
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  const parts = highlightFuzzyMatch(text, query);
  
  return (
    <>
      {parts.map((part, index) => 
        part.isMatch ? (
          <mark key={index} className="bg-primary/30 text-foreground rounded-sm px-0.5">
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  );
}

// Mock data - In real app, this would come from a search API or local storage
const generateMockResults = (query: string, language: string): SearchResult[] => {
  const allResults: SearchResult[] = language === 'UR' ? [
    { id: '1', type: 'case', title: 'احمد بمقابلہ ریاست', subtitle: 'فوجداری مقدمہ', description: 'اس مقدمے میں جائیداد کے تنازعے پر فیصلہ سنایا گیا', date: '2024' },
    { id: '2', type: 'document', title: 'کرائے کا معاہدہ', subtitle: 'معاہدہ ٹیمپلیٹ', description: 'رہائشی جائیداد کے لیے معیاری کرائے کا معاہدہ', date: '2024' },
    { id: '3', type: 'chat', title: 'جائیداد کے بارے میں سوال', subtitle: 'گفتگو', description: 'جائیداد کی منتقلی کے قانونی پہلوؤں پر بات چیت', date: '2 گھنٹے پہلے' },
    { id: '4', type: 'library', title: 'پاکستانی دستور', subtitle: 'قانونی حوالہ', description: '1973 کے دستور کی دفعات', date: '1973' },
    { id: '5', type: 'case', title: 'خان بمقابلہ حکومت', subtitle: 'دیوانی مقدمہ', description: 'حکومتی زمین کے حصول کا مقدمہ', date: '2023' },
    { id: '6', type: 'document', title: 'وکیل نامہ', subtitle: 'قانونی دستاویز', description: 'عمومی وکالت نامہ', date: '2024' },
    { id: '7', type: 'library', title: 'تعزیرات پاکستان', subtitle: 'فوجداری قانون', description: 'پاکستان کا تعزیراتی قانون', date: '1860' },
    { id: '8', type: 'chat', title: 'طلاق کے قوانین', subtitle: 'گفتگو', description: 'مسلم خاندانی قانون کے تحت طلاق کے طریقے', date: 'کل' },
  ] : [
    { id: '1', type: 'case', title: 'Ahmad vs State', subtitle: 'Criminal Case', description: 'Property dispute case judgment delivered in this matter', date: '2024' },
    { id: '2', type: 'document', title: 'Rental Agreement', subtitle: 'Contract Template', description: 'Standard rental agreement for residential property', date: '2024' },
    { id: '3', type: 'chat', title: 'Property Law Query', subtitle: 'Conversation', description: 'Discussion on legal aspects of property transfer', date: '2 hours ago' },
    { id: '4', type: 'library', title: 'Pakistan Constitution', subtitle: 'Legal Reference', description: 'Articles of the 1973 Constitution', date: '1973' },
    { id: '5', type: 'case', title: 'Khan vs Government', subtitle: 'Civil Case', description: 'Government land acquisition case', date: '2023' },
    { id: '6', type: 'document', title: 'Power of Attorney', subtitle: 'Legal Document', description: 'General power of attorney document', date: '2024' },
    { id: '7', type: 'library', title: 'Pakistan Penal Code', subtitle: 'Criminal Law', description: 'Pakistan\'s penal code statutes', date: '1860' },
    { id: '8', type: 'chat', title: 'Divorce Laws Discussion', subtitle: 'Conversation', description: 'Methods of divorce under Muslim Family Law', date: 'Yesterday' },
    { id: '9', type: 'case', title: 'Property Dispute Resolution', subtitle: 'Supreme Court', description: 'Landmark judgment on property rights', date: '2024' },
    { id: '10', type: 'document', title: 'Employment Contract', subtitle: 'HR Template', description: 'Standard employment agreement template', date: '2024' },
    { id: '11', type: 'library', title: 'Contract Act 1872', subtitle: 'Civil Law', description: 'Law of contracts in Pakistan', date: '1872' },
    { id: '12', type: 'chat', title: 'Inheritance Rights Query', subtitle: 'Conversation', description: 'Discussion on Islamic inheritance law', date: '3 days ago' },
  ];

  if (!query.trim()) return allResults;
  
  const fuzzyResults = fuzzySearch(allResults, query, {
    threshold: 0.3,
    keys: ['title', 'subtitle', 'description']
  });
  
  return fuzzyResults.map(r => r.item);
};

export function SearchResultsScreen({ query, onBack, onNavigate }: SearchResultsScreenProps) {
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(query);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const results = generateMockResults(searchQuery, language);
  
  const filteredResults = activeFilter 
    ? results.filter(r => r.type === activeFilter)
    : results;

  const filterTabs = [
    { key: null, label: language === 'UR' ? 'سب' : 'All' },
    { key: 'chat', label: language === 'UR' ? 'چیٹس' : 'Chats' },
    { key: 'document', label: language === 'UR' ? 'دستاویزات' : 'Documents' },
    { key: 'case', label: language === 'UR' ? 'کیسز' : 'Cases' },
    { key: 'library', label: language === 'UR' ? 'لائبریری' : 'Library' },
  ];

  const handleResultClick = (result: SearchResult) => {
    const tabMap: Record<string, string> = {
      chat: 'chat',
      document: 'documents',
      case: 'case-research',
      library: 'library',
    };
    onNavigate(tabMap[result.type], searchQuery);
  };

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ArrowLeft className={`w-5 h-5 text-primary-foreground ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          <h1 className="text-xl font-display font-bold text-primary-foreground flex-1">
            {language === 'UR' ? 'تلاش کے نتائج' : 'Search Results'}
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'UR' ? 'تلاش کریں...' : 'Search...'}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/20 text-sm text-primary-foreground placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-primary-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.key || 'all'}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 pt-4">
        <p className="text-sm text-muted-foreground">
          {language === 'UR' 
            ? `${filteredResults.length} نتائج ملے "${searchQuery}" کے لیے`
            : `${filteredResults.length} results found for "${searchQuery}"`
          }
        </p>
      </div>

      {/* Results List */}
      <div className="px-4 pt-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredResults.map((result, index) => {
            const Icon = typeIcons[result.type];
            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleResultClick(result)}
                className="bg-card rounded-2xl border border-border shadow-sm p-4 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${typeColors[result.type]} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Type Badge */}
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium mb-1 ${typeColors[result.type]}/10 text-${result.type === 'case' ? 'primary' : result.type === 'chat' ? 'blue-600' : result.type === 'document' ? 'orange-600' : 'purple-600'}`}>
                      {language === 'UR' ? typeLabels[result.type].ur : typeLabels[result.type].en}
                    </span>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-foreground text-sm mb-0.5 line-clamp-1">
                      <HighlightedText text={result.title} query={searchQuery} />
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-xs text-muted-foreground mb-1">
                      <HighlightedText text={result.subtitle} query={searchQuery} />
                    </p>
                    
                    {/* Description */}
                    {result.description && (
                      <p className="text-xs text-muted-foreground/80 line-clamp-2">
                        <HighlightedText text={result.description} query={searchQuery} />
                      </p>
                    )}
                    
                    {/* Date */}
                    {result.date && (
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground/70">
                        <Clock className="w-3 h-3" />
                        <span>{result.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredResults.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center px-6 py-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium mb-1">
            {language === 'UR' ? 'کوئی نتیجہ نہیں ملا' : 'No results found'}
          </p>
          <p className="text-muted-foreground text-sm">
            {language === 'UR' 
              ? 'مختلف الفاظ کے ساتھ دوبارہ تلاش کریں'
              : 'Try searching with different keywords'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}
