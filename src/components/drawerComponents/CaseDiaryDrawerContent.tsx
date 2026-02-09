import { motion } from "framer-motion";
import { Calendar, Filter, SortAsc, Plus } from "lucide-react";

interface CaseDiaryDrawerContentProps {
  onAddCase: () => void;
  onFilter: (filter: string) => void;
  onSort: (sort: string) => void;
  activeFilter?: string;
  activeSort?: string;
}

const filters = [
  { id: "all", label: "All Cases" },
  { id: "pending", label: "Pending" },
  { id: "ongoing", label: "Ongoing" },
  { id: "disposed", label: "Disposed" },
  { id: "high", label: "High Priority" },
];

const sorts = [
  { id: "date-asc", label: "Hearing Date (Nearest)" },
  { id: "date-desc", label: "Hearing Date (Farthest)" },
  { id: "priority", label: "Priority" },
  { id: "title", label: "Case Title" },
];

export function CaseDiaryDrawerContent({
  onAddCase,
  onFilter,
  onSort,
  activeFilter = "all",
  activeSort = "date-asc",
}: CaseDiaryDrawerContentProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Add Case Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onAddCase}
        className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Case
      </motion.button>

      {/* Filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter By
        </h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
          <SortAsc className="w-4 h-4" />
          Sort By
        </h3>
        <div className="space-y-1">
          {sorts.map((sort) => (
            <button
              key={sort.id}
              onClick={() => onSort(sort.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                activeSort === sort.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Upcoming Hearings
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border text-center">
            <p className="text-2xl font-bold text-destructive">3</p>
            <p className="text-xs text-muted-foreground">Urgent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
