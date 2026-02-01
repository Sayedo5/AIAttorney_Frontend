import { motion } from "framer-motion";
import { 
  Bookmark, 
  Scale, 
  Gavel, 
  ChevronRight, 
  Trash2,
  Search
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/card";
import { useBookmarks, BookmarkedCase } from "@/hooks/useBookmarks";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface BookmarkedCasesScreenProps {
  onBack?: () => void;
}

export function BookmarkedCasesScreen({ onBack }: BookmarkedCasesScreenProps) {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { toast } = useToast();

  const handleRemoveBookmark = (caseItem: BookmarkedCase, e: React.MouseEvent) => {
    e.stopPropagation();
    removeBookmark(caseItem.id);
    toast({
      title: "Bookmark removed",
      description: `"${caseItem.title}" removed from bookmarks`,
    });
  };

  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Bookmarked Cases" showBack onBack={onBack} />

      <div className="px-4 py-4 space-y-4">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bookmark className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {bookmarks.length} Saved {bookmarks.length === 1 ? "Case" : "Cases"}
            </p>
            <p className="text-sm text-muted-foreground">
              Your bookmarked legal cases
            </p>
          </div>
        </motion.div>

        {/* Bookmarks List */}
        {sortedBookmarks.length > 0 ? (
          <div className="space-y-3">
            {sortedBookmarks.map((caseItem, index) => (
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
                          {caseItem.category === "civil" ? (
                            <span className="flex items-center gap-1">
                              <Scale className="w-3 h-3" /> Civil
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Gavel className="w-3 h-3" /> Criminal
                            </span>
                          )}
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
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        Saved {format(new Date(caseItem.bookmarkedAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleRemoveBookmark(caseItem, e)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors group/btn"
                      >
                        <Trash2 className="w-5 h-5 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
                      </motion.button>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Bookmarks Yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Save cases from Case Research to access them quickly here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
