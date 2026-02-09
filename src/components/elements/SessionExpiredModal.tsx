// Session Expired Modal Component
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, LogIn } from 'lucide-react';
import { GradientButton } from './GradientButton';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onLogin: () => void;
}

export function SessionExpiredModal({ isOpen, onLogin }: SessionExpiredModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto"
          >
            <div className="bg-card rounded-3xl p-8 text-center shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              
              <h2 className="text-xl font-bold text-foreground mb-2">
                Session Expired
              </h2>
              <p className="text-muted-foreground mb-6">
                Your session has expired for security reasons. Please log in again to continue.
              </p>
              
              <GradientButton onClick={onLogin} className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Log In Again
              </GradientButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
