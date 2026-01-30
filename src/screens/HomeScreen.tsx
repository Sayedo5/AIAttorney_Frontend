import { motion } from "framer-motion";
import { 
  MessageCircle, 
  FileText, 
  Scale, 
  BookOpen, 
  Calendar, 
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Settings
} from "lucide-react";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Header } from "@/components/navigation/Header";

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  userName?: string;
  onSettingsClick?: () => void;
}

const quickActions = [
  { icon: MessageCircle, title: "New Chat", description: "Start a legal conversation", tab: "chat" },
  { icon: FileText, title: "Draft Document", description: "Create legal documents", tab: "documents" },
  { icon: Scale, title: "Case Research", description: "Search case law", tab: "library" },
  { icon: Calendar, title: "Cases Diary", description: "Manage your cases", tab: "cases" },
];

const suggestions = [
  "How to file a civil suit in Pakistan?",
  "What are tenant rights under Rent Act?",
  "Draft a rental agreement",
  "Explain Section 420 PPC",
];

export function HomeScreen({ onNavigate, userName = "Advocate", onSettingsClick }: HomeScreenProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header transparent onSettingsClick={onSettingsClick} />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-2 pb-6"
      >
        <p className="text-muted-foreground text-sm">{greeting},</p>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {userName}
        </h1>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <div 
            onClick={() => onNavigate("chat")}
            className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 cursor-pointer hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground">Ask AI Attorney anything...</p>
            </div>
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <FeatureCard
                icon={action.icon}
                title={action.title}
                description={action.description}
                onClick={() => onNavigate(action.tab)}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Suggestions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-display font-semibold">Try asking</h2>
        </div>
        
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + 0.05 * index }}
              onClick={() => onNavigate("chat")}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors text-left group"
            >
              <span className="text-sm text-foreground">{suggestion}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Recent Activity */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold">Recent Activity</h2>
          <button 
            onClick={() => onNavigate("chat")}
            className="text-sm text-primary hover:text-primary-glow transition-colors"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-3">
          {[
            { title: "Contract Review", time: "2 hours ago", icon: FileText },
            { title: "Property Law Query", time: "Yesterday", icon: MessageCircle },
            { title: "Case: Ahmad vs State", time: "2 days ago", icon: Scale },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + 0.05 * index }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
