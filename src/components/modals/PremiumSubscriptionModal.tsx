import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Zap, Star, Shield } from "lucide-react";

interface PremiumSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  featureTitle?: string;
}

const premiumFeatures = [
  { icon: Zap, text: "Unlimited AI queries" },
  { icon: Star, text: "Advanced case research" },
  { icon: Shield, text: "Document drafting & templates" },
  { icon: Check, text: "Priority customer support" },
];

export function PremiumSubscriptionModal({
  isOpen,
  onClose,
  onSubscribe,
  featureTitle = "Case Details",
}: PremiumSubscriptionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
          >
            <div className="bg-card rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-primary via-primary to-primary-glow p-6 pb-12">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Premium Feature</h2>
                    <p className="text-white/80 text-sm">Upgrade to unlock</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 -mt-6">
                <div className="bg-background rounded-2xl p-4 mb-6 border border-border/50">
                  <p className="text-center text-muted-foreground text-sm">
                    <span className="font-semibold text-foreground">{featureTitle}</span> is a premium feature. 
                    Subscribe to get unlimited access to all features.
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-foreground">What you'll get:</p>
                  {premiumFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">PKR</span>
                    <span className="text-4xl font-bold text-foreground">2,999</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onSubscribe}
                    className="w-full py-3.5 rounded-xl btn-primary-gradient font-semibold"
                  >
                    Subscribe Now
                  </motion.button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Terms */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Cancel anytime. No hidden fees.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
