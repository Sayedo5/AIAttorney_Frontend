import { motion } from "framer-motion";
import { 
  MessageCircle, 
  FileText, 
  Scale, 
  BookOpen, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Header } from "@/components/navigation/Header";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  userName?: string;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  onFeedback?: () => void;
  onSupport?: () => void;
  onNotificationsClick?: () => void;
}

export function HomeScreen({ onNavigate, userName = "Advocate", onSettingsClick, onLogout, onFeedback, onSupport, onNotificationsClick }: HomeScreenProps) {
  const { t, isRTL, language } = useLanguage();
  
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? t('goodMorning') : currentHour < 18 ? t('goodAfternoon') : t('goodEvening');
  
  const nameParts = userName.split(" ");
  const firstName = nameParts[0] || "User";
  const lastName = nameParts.slice(1).join(" ") || "";

  const quickActions = [
    { icon: MessageCircle, title: t('newChat'), description: t('startLegalConversation'), tab: "chat" },
    { icon: FileText, title: t('draftDocs'), description: t('createLegalDocuments'), tab: "documents" },
    { icon: Scale, title: t('caseResearch'), description: t('searchCaseLaw'), tab: "case-research" },
    { icon: BookOpen, title: t('casesDiary'), description: t('manageYourCases'), tab: "cases" },
  ];

  const suggestions = [
    t('suggestion1'),
    t('suggestion2'),
    t('suggestion3'),
    t('suggestion4'),
  ];

  const recentActivity = [
    { title: language === 'UR' ? 'معاہدے کا جائزہ' : 'Contract Review', time: language === 'UR' ? '2 گھنٹے پہلے' : '2 hours ago', icon: FileText },
    { title: language === 'UR' ? 'جائیداد کے قانون کا سوال' : 'Property Law Query', time: language === 'UR' ? 'کل' : 'Yesterday', icon: MessageCircle },
    { title: language === 'UR' ? 'کیس: احمد بمقابلہ ریاست' : 'Case: Ahmad vs State', time: language === 'UR' ? '2 دن پہلے' : '2 days ago', icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-background pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header 
        transparent 
        onSettingsClick={onSettingsClick}
        showProfile
        userName={{ firstName, lastName }}
        onProfileClick={onSettingsClick}
        onUpgradePlan={() => onNavigate("pricing")}
        onLogout={onLogout}
        onFeedback={onFeedback}
        onSupport={onSupport}
        onNotificationsClick={onNotificationsClick}
      />
      
      {/* Hero Section */}
      <section className="px-4 pt-14 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground text-sm">{greeting},</p>
          <h1 className="text-xl font-display font-bold text-foreground">
            {userName}
          </h1>
        </motion.div>
      </section>

      {/* Global Search Section */}
      <section className="px-4 pt-2 pb-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlobalSearch onNavigate={onNavigate} />
        </motion.div>
      </section>

      {/* Quick Actions Section */}
      <section className="px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
        >
          <h2 className="text-sm font-display font-semibold text-foreground mb-3">{t('quickActions')}</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.tab}
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
        </motion.div>
      </section>

      {/* Suggestions Section */}
      <section className="px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-display font-semibold text-foreground">{t('tryAsking')}</h2>
          </div>
          
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + 0.05 * index }}
                onClick={() => onNavigate("chat")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Recent Activity Section */}
      <section className="px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-display font-semibold text-foreground">{t('recentActivity')}</h2>
            <button 
              onClick={() => onNavigate("chat")}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t('viewAll')}
            </button>
          </div>
          
          <div className="space-y-2">
            {recentActivity.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + 0.05 * index }}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
