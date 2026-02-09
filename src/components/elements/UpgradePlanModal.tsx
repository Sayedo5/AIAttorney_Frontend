// Upgrade Plan Modal Component
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientButton } from './GradientButton';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  onUpgrade?: () => void;
}

const proFeatures = [
  '100 AI chat messages per day',
  'Unlimited document drafting',
  'Full case research access',
  'Cause list integration',
  'Priority support',
  'PDF & DOCX export',
  'Voice input support',
  'Web search integration',
];

export function UpgradePlanModal({ isOpen, onClose, feature, onUpgrade }: UpgradePlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
          >
            <div className="bg-card rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-primary p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Upgrade to Pro</h2>
                    <p className="text-white/80 text-sm">Unlock all premium features</p>
                  </div>
                </div>
                
                {feature && (
                  <div className="mt-4 p-3 bg-white/10 rounded-xl">
                    <p className="text-sm">
                      <Sparkles className="w-4 h-4 inline mr-2" />
                      <strong>{feature}</strong> is a premium feature
                    </p>
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Get access to all features:
                </p>
                
                <ul className="space-y-3 mb-6">
                  {proFeatures.map((featureItem, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{featureItem}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-foreground">PKR 2,999</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cancel anytime
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <GradientButton onClick={onUpgrade} className="w-full">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </GradientButton>
                  
                  <Button variant="ghost" onClick={onClose} className="w-full">
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
