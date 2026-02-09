// No Internet Modal Component
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoInternetModalProps {
  isOpen: boolean;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function NoInternetModal({ isOpen, onRetry, onDismiss }: NoInternetModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <WifiOff className="w-10 h-10 text-destructive" />
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-2">
              No Internet Connection
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              Please check your network connection and try again.
            </p>
            
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button onClick={onRetry} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              
              {onDismiss && (
                <Button variant="ghost" onClick={onDismiss}>
                  Continue Offline
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
