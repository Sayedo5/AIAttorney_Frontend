import { useState } from "react";
import { ArrowLeft, Search, BookOpen, ChevronRight, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface ActsScreenProps {
  onBack?: () => void;
}

interface ActItem {
  id: string;
  title: string;
  year: string;
  category: string;
  sectionsCount: number;
  isBookmarked: boolean;
}

const MOCK_ACTS: ActItem[] = [
  { id: "1", title: "Pakistan Penal Code", year: "1860", category: "Criminal", sectionsCount: 511, isBookmarked: false },
  { id: "2", title: "Code of Criminal Procedure", year: "1898", category: "Criminal", sectionsCount: 565, isBookmarked: true },
  { id: "3", title: "Code of Civil Procedure", year: "1908", category: "Civil", sectionsCount: 158, isBookmarked: false },
  { id: "4", title: "Contract Act", year: "1872", category: "Civil", sectionsCount: 238, isBookmarked: false },
  { id: "5", title: "Evidence Act", year: "1984", category: "Evidence", sectionsCount: 166, isBookmarked: true },
  { id: "6", title: "Limitation Act", year: "1908", category: "Civil", sectionsCount: 31, isBookmarked: false },
  { id: "7", title: "Specific Relief Act", year: "1877", category: "Civil", sectionsCount: 57, isBookmarked: false },
  { id: "8", title: "Transfer of Property Act", year: "1882", category: "Property", sectionsCount: 137, isBookmarked: false },
];

const CATEGORIES = ["All", "Criminal", "Civil", "Evidence", "Property", "Constitutional"];

export default function ActsScreen({ onBack }: ActsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [acts, setActs] = useState<ActItem[]>(MOCK_ACTS);

  const filteredActs = acts.filter((act) => {
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || act.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setActs((prev) => prev.map((a) => (a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a)));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-primary-foreground">Acts & Statutes</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search acts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/90 border-0"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="whitespace-nowrap rounded-full text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Acts List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-3 pb-6">
          {filteredActs.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl border bg-card"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{act.title}</p>
                <p className="text-xs text-muted-foreground">{act.year} · {act.sectionsCount} Sections</p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => toggleBookmark(act.id)}>
                <Star className={`h-4 w-4 ${act.isBookmarked ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
              </Button>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
