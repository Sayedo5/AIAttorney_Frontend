import { useState } from "react";
import { ArrowLeft, Search, Scale, ChevronRight, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface CodesScreenProps {
  onBack?: () => void;
}

interface CodeItem {
  id: string;
  title: string;
  abbreviation: string;
  chaptersCount: number;
  sectionsCount: number;
  isBookmarked: boolean;
}

const MOCK_CODES: CodeItem[] = [
  { id: "1", title: "Pakistan Penal Code", abbreviation: "PPC", chaptersCount: 23, sectionsCount: 511, isBookmarked: true },
  { id: "2", title: "Code of Criminal Procedure", abbreviation: "CrPC", chaptersCount: 46, sectionsCount: 565, isBookmarked: false },
  { id: "3", title: "Code of Civil Procedure", abbreviation: "CPC", chaptersCount: 12, sectionsCount: 158, isBookmarked: false },
  { id: "4", title: "Qanun-e-Shahadat Order", abbreviation: "QSO", chaptersCount: 11, sectionsCount: 166, isBookmarked: true },
  { id: "5", title: "West Pakistan Family Courts Act", abbreviation: "WPFCA", chaptersCount: 5, sectionsCount: 25, isBookmarked: false },
  { id: "6", title: "Control of Narcotic Substances Act", abbreviation: "CNSA", chaptersCount: 8, sectionsCount: 78, isBookmarked: false },
];

export default function CodesScreen({ onBack }: CodesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [codes, setCodes] = useState<CodeItem[]>(MOCK_CODES);

  const filteredCodes = codes.filter((code) =>
    code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBookmark = (id: string) => {
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, isBookmarked: !c.isBookmarked } : c)));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-primary-foreground">Legal Codes</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/90 border-0"
          />
        </div>
      </div>

      {/* Codes List */}
      <ScrollArea className="flex-1 px-4 pt-4">
        <div className="space-y-3 pb-6">
          {filteredCodes.map((code, index) => (
            <motion.div
              key={code.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl border bg-card"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-foreground truncate">{code.title}</p>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                    {code.abbreviation}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{code.chaptersCount} Chapters · {code.sectionsCount} Sections</p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => toggleBookmark(code.id)}>
                <Star className={`h-4 w-4 ${code.isBookmarked ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
              </Button>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
