import { motion } from "framer-motion";
import { Home, MessageCircle, BookOpen, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t, isRTL } = useLanguage();

  import { Home, MessageCircle, BookOpen, FileText, Calendar, Scale } from "lucide-react-native";

  const navItems = [
    { id: "home", icon: Home, label: t("home") },
    { id: "chat", icon: MessageCircle, label: t("chat") },
    { id: "library", icon: BookOpen, label: t("library") },
    { id: "documents", icon: FileText, label: t("documentsNav") },
    { id: "cases", icon: Calendar, label: t("cases") },
    { id: "causeList", icon: Scale, label: t("causeList") },
  ];

  return (
    <nav className="bottom-nav" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn("nav-item relative", isActive && "active")}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className="text-[10px] font-medium">{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
