import { motion } from "framer-motion";
import { ArrowLeft, MoreVertical, Bell } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export function Header({ 
  title, 
  showBack = false, 
  onBack, 
  rightAction,
  transparent = false 
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 px-4 py-3 flex items-center justify-between safe-top ${
        transparent ? "bg-transparent" : "glass border-b border-border/30"
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <IconButton
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={onBack}
          />
        )}
        {title && (
          <h1 className="text-lg font-display font-semibold">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {rightAction || (
          <>
            <IconButton
              variant="ghost"
              size="sm"
              icon={<Bell className="w-5 h-5" />}
            />
            <IconButton
              variant="ghost"
              size="sm"
              icon={<MoreVertical className="w-5 h-5" />}
            />
          </>
        )}
      </div>
    </motion.header>
  );
}
