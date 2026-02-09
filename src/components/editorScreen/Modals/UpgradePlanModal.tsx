import { motion, AnimatePresence } from "framer-motion";
import { Crown, X, Check, Sparkles } from "lucide-react";

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  feature?: string;
}

const premiumFeatures = [
  "Unlimited document drafts",
  "AI-powered writing assistant",
  "Version history & restoration",
  "Export to PDF & Word",
  "Priority support",
];

export function UpgradePlanModal({
  isOpen,
  onClose,
  onUpgrade,
  feature,
}: UpgradePlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-b border-border">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-background/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground text-center">
                Upgrade to Premium
              </h2>
              {feature && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Unlock "{feature}" and more
                </p>
              )}
            </div>

            {/* Features */}
            <div className="p-6 space-y-3">
              {premiumFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border space-y-2">
              <button
                onClick={onUpgrade}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Upgrade Now
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
