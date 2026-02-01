import { motion } from "framer-motion";
import { ArrowLeft, Bell, Settings } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { ProfileDropdown } from "@/components/navigation/ProfileDropdown";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  onSettingsClick?: () => void;
  showProfile?: boolean;
  userName?: { firstName: string; lastName: string };
  onProfileClick?: () => void;
  onUpgradePlan?: () => void;
  onLogout?: () => void;
  onFeedback?: () => void;
  onSupport?: () => void;
  notificationCount?: number;
}

export function Header({ 
  title, 
  showBack = false, 
  onBack, 
  rightAction,
  transparent = false,
  onSettingsClick,
  showProfile = false,
  userName = { firstName: "User", lastName: "" },
  onProfileClick,
  onUpgradePlan,
  onLogout,
  onFeedback,
  onSupport,
  notificationCount,
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
          <h1 className="text-lg font-display font-semibold text-foreground">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {rightAction || (
          <>
            <IconButton
              variant="ghost"
              size="sm"
              icon={<Bell className="w-5 h-5" />}
              badge={notificationCount && notificationCount > 0 ? notificationCount : undefined}
              className="hover:bg-accent/50 transition-colors"
            />
            {showProfile ? (
              <ProfileDropdown
                firstName={userName.firstName}
                lastName={userName.lastName}
                onProfile={onProfileClick}
                onUpgradePlan={onUpgradePlan}
                onFeedback={onFeedback}
                onSupport={onSupport}
                onLogout={onLogout}
              />
            ) : (
              <IconButton
                variant="ghost"
                size="sm"
                icon={<Settings className="w-5 h-5" />}
                onClick={onSettingsClick}
                className="hover:bg-accent/50 transition-colors"
              />
            )}
          </>
        )}
      </div>
    </motion.header>
  );
}
