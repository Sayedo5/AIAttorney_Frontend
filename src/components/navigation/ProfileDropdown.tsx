import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Crown, 
  Headphones, 
  MessageSquare, 
  LogOut,
  Clock
} from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ProfileDropdownProps {
  firstName?: string;
  lastName?: string;
  imageSrc?: string | null;
  daysRemaining?: number;
  onProfile?: () => void;
  onUpgradePlan?: () => void;
  onSupport?: () => void;
  onFeedback?: () => void;
  onLogout?: () => void;
}

const menuItems = [
  { icon: User, label: "Profile", action: "profile" },
  { icon: Crown, label: "Upgrade Plan", action: "upgrade" },
  { icon: Headphones, label: "Support", action: "support" },
  { icon: MessageSquare, label: "Feedback", action: "feedback" },
  { icon: LogOut, label: "Logout", action: "logout" },
];

export function ProfileDropdown({
  firstName = "User",
  lastName = "",
  imageSrc,
  daysRemaining = 26,
  onProfile,
  onUpgradePlan,
  onSupport,
  onFeedback,
  onLogout,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: string) => {
    setIsOpen(false);
    switch (action) {
      case "profile":
        onProfile?.();
        break;
      case "upgrade":
        onUpgradePlan?.();
        break;
      case "support":
        onSupport?.();
        break;
      case "feedback":
        onFeedback?.();
        break;
      case "logout":
        onLogout?.();
        break;
    }
  };

  return (
    <div className="relative">
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        imageSrc={imageSrc}
        size="md"
        onClick={() => setIsOpen(!isOpen)}
      />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-56 z-50 bg-card border border-border/50 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.02 * index }}
                    onClick={() => handleAction(item.action)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground hover:bg-accent/50 transition-colors group"
                  >
                    <span className="font-medium text-sm">{item.label}</span>
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.button>
                ))}
              </div>

              {/* Days Remaining */}
              <div className="p-2 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{daysRemaining} days remaining</span>
                </div>
              </div>

              {/* User Avatar at bottom */}
              <div className="p-3 border-t border-border/50 flex justify-center">
                <UserAvatar
                  firstName={firstName}
                  lastName={lastName}
                  imageSrc={imageSrc}
                  size="lg"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
