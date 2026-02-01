import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Plus, 
  Search, 
  Clock, 
  MapPin, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Bell,
  BellRing,
  Settings
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { IconButton } from "@/components/ui/icon-button";
import { PremiumSubscriptionModal } from "@/components/modals/PremiumSubscriptionModal";
import { useLocalNotifications } from "@/hooks/useLocalNotifications";
import { toast } from "sonner";

interface CasesScreenProps {
  onSettingsClick?: () => void;
  onRemindersClick?: () => void;
}

const filterOptions = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
];

const cases = [
  {
    id: 1,
    title: "Ahmad vs State",
    caseNumber: "Cr.A. No. 123/2026",
    court: "Lahore High Court",
    date: "Feb 1, 2026",
    time: "10:00 AM",
    status: "upcoming",
    priority: "high",
  },
  {
    id: 2,
    title: "Property Dispute - Khan Family",
    caseNumber: "C.S. No. 456/2025",
    court: "Civil Court, Islamabad",
    date: "Feb 3, 2026",
    time: "11:30 AM",
    status: "upcoming",
    priority: "medium",
  },
  {
    id: 3,
    title: "Employment Termination Case",
    caseNumber: "W.P. No. 789/2025",
    court: "Labor Court, Karachi",
    date: "Feb 5, 2026",
    time: "09:00 AM",
    status: "pending",
    priority: "low",
  },
  {
    id: 4,
    title: "Contract Breach - ABC Corp",
    caseNumber: "C.S. No. 234/2024",
    court: "High Court, Peshawar",
    date: "Jan 28, 2026",
    time: "02:00 PM",
    status: "completed",
    priority: "medium",
  },
  {
    id: 5,
    title: "Bail Application - Rashid",
    caseNumber: "B.A. No. 567/2026",
    court: "Sessions Court, Multan",
    date: "Feb 2, 2026",
    time: "10:30 AM",
    status: "upcoming",
    priority: "high",
  },
];

const upcomingHearings = [
  { day: "Today", count: 1 },
  { day: "Tomorrow", count: 2 },
  { day: "This Week", count: 5 },
];

export function CasesScreen({ onSettingsClick, onRemindersClick }: CasesScreenProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedCaseTitle, setSelectedCaseTitle] = useState("");

  const { scheduleMultipleReminders, cancelHearingReminder } = useLocalNotifications();

  // Calculate upcoming hearing count for notification badge
  const upcomingCount = cases.filter((c) => c.status === "upcoming").length;

  const filteredCases = cases.filter((c) => {
    if (activeFilter === "all") return true;
    return c.status === activeFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const handleCaseClick = (caseItem: typeof cases[0]) => {
    setSelectedCaseTitle(caseItem.title);
    setShowPremiumModal(true);
  };

  const handleSetReminder = async (e: React.MouseEvent, caseItem: typeof cases[0]) => {
    e.stopPropagation();
    
    const success = await scheduleMultipleReminders({
      id: caseItem.id,
      title: caseItem.title,
      caseNumber: caseItem.caseNumber,
      court: caseItem.court,
      date: caseItem.date,
      time: caseItem.time,
    });

    if (success) {
      toast.success("Reminders set!", {
        description: `You'll be notified before ${caseItem.title}`,
      });
    } else {
      toast.error("Couldn't set reminder", {
        description: "Please enable notifications in settings",
      });
    }
  };

  const handleSubscribe = () => {
    setShowPremiumModal(false);
    // Navigate to pricing or payment flow
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header 
        title="Cases Diary" 
        onSettingsClick={onSettingsClick}
        notificationCount={upcomingCount}
        rightAction={
          <div className="flex items-center gap-2">
            {onRemindersClick && (
              <button
                onClick={onRemindersClick}
                className="p-2 rounded-full hover:bg-secondary transition-colors relative"
                aria-label="View reminders"
              >
                <Bell className="w-5 h-5 text-foreground" />
              </button>
            )}
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          </div>
        }
      />

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4"
      >
        <div className="grid grid-cols-3 gap-3">
          {upcomingHearings.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              className="p-4 rounded-2xl bg-card border border-border/50 text-center"
            >
              <p className="text-2xl font-display font-bold text-primary">{item.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.day}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 pt-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases..."
            className="input-modern pl-12"
          />
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-4 pt-4"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cases List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 pt-4 space-y-3"
      >
        {filteredCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            onClick={() => handleCaseClick(caseItem)}
            className="p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getPriorityIcon(caseItem.priority)}
                  <h3 className="font-semibold text-foreground line-clamp-1">{caseItem.title}</h3>
                </div>
                <p className="text-xs text-primary font-medium">{caseItem.caseNumber}</p>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{caseItem.court}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{caseItem.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{caseItem.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status}
                </span>
                <div className="flex items-center gap-2">
                  {caseItem.status === "upcoming" && (
                    <button
                      onClick={(e) => handleSetReminder(e, caseItem)}
                      className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      aria-label="Set reminder"
                    >
                      <BellRing className="w-4 h-4 text-primary" />
                    </button>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Premium Subscription Modal */}
      <PremiumSubscriptionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribe={handleSubscribe}
        featureTitle={selectedCaseTitle}
      />
    </div>
  );
}
