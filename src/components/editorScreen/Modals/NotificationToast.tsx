import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface NotificationToastProps {
  isVisible: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: "bg-green-500/10 border-green-500/30 text-green-600",
  error: "bg-destructive/10 border-destructive/30 text-destructive",
  info: "bg-primary/10 border-primary/30 text-primary",
};

export function NotificationToast({
  isVisible,
  message,
  type = "info",
  onClose,
}: NotificationToastProps) {
  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div
            className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-lg ${styles[type]}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
