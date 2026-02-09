import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

interface Court {
  id: string;
  name: string;
  location: string;
}

interface CauseListDrawerProps {
  courts: Court[];
  selectedCourt?: string;
  selectedDate?: Date;
  onSelectCourt: (courtId: string) => void;
  onSelectDate: (date: Date) => void;
}

const courts: Court[] = [
  { id: "sc", name: "Supreme Court", location: "Islamabad" },
  { id: "lhc", name: "Lahore High Court", location: "Lahore" },
  { id: "ihc", name: "Islamabad High Court", location: "Islamabad" },
  { id: "shc", name: "Sindh High Court", location: "Karachi" },
  { id: "phc", name: "Peshawar High Court", location: "Peshawar" },
];

export function CauseListDrawer({
  selectedCourt,
  selectedDate,
  onSelectCourt,
  onSelectDate,
}: CauseListDrawerProps) {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Date Selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Select Date
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((date, index) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            const isToday = today.toDateString() === date.toDateString();
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectDate(date)}
                className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/30"
                }`}
              >
                <p className="text-xs text-inherit opacity-70">
                  {date.toLocaleDateString("en", { weekday: "short" })}
                </p>
                <p className="text-lg font-semibold">{date.getDate()}</p>
                {isToday && (
                  <p className="text-[10px] text-inherit opacity-70">Today</p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Court Selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Select Court
        </h3>
        <div className="space-y-2">
          {courts.map((court, index) => (
            <motion.button
              key={court.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCourt(court.id)}
              className={`w-full p-4 rounded-xl transition-all flex items-center gap-3 ${
                selectedCourt === court.id
                  ? "bg-primary/10 border border-primary"
                  : "bg-card border border-border hover:border-primary/30"
              }`}
            >
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{court.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {court.location}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
