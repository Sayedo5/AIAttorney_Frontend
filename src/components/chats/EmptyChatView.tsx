// Empty Chat View Component
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, FileText, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyChatViewProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function EmptyChatView({ onSuggestionClick }: EmptyChatViewProps) {
  const { t, isRTL } = useLanguage();

  const suggestions = [
    { key: 'prompt1', icon: MessageCircle },
    { key: 'prompt2', icon: FileText },
    { key: 'prompt3', icon: Search },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          {t('welcomeToAIAttorney')}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t('poweredByAI')}
        </p>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <p className="text-sm text-muted-foreground mb-3 text-center">
          {t('quickPrompts')}
        </p>
        
        <div className="space-y-2">
          {suggestions.map(({ key, icon: Icon }, index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestionClick(t(key))}
              className="w-full flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 text-left hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-foreground">{t(key)}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Start typing hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground mt-6 text-center"
      >
        {t('startTyping')}
      </motion.p>
    </div>
  );
}
