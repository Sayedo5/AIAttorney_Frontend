import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  { icon: Headphones, label: "Support", action: "support", url: "https://aiattorney.com.pk/contact" },
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
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  const menuWidth = 224; // w-56
  const menuGap = 8;
  const viewportPadding = 12;

  useLayoutEffect(() => {
    if (!isOpen) return;
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const preferredLeft = rect.right - menuWidth;
    const left = Math.max(
      viewportPadding,
      Math.min(preferredLeft, window.innerWidth - menuWidth - viewportPadding),
    );
    const top = rect.bottom + menuGap;
    setMenuPos({ top, left });
  }, [isOpen]);

  const portalRoot = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  const handleAction = (action: string, url?: string) => {
    // Handle external URLs
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setIsOpen(false);
      return;
    }
    
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

    // Close the dropdown after the action is fired
    setIsOpen(false);
  };

  return (
    <div ref={triggerRef} className="relative">
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        imageSrc={imageSrc}
        size="md"
        onClick={() => setIsOpen((v) => !v)}
      />

      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-50"
                />

                {/* Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{ top: menuPos?.top ?? 0, left: menuPos?.left ?? 0 }}
                  className="fixed z-[60] w-56 bg-card border border-border/50 rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Menu Items */}
                  <div className="p-2">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.action}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 * index }}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAction(item.action, item.url);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                          item.action === "logout"
                            ? "text-destructive hover:bg-destructive/10"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                      >
                        <span className="font-medium text-sm">{item.label}</span>
                        <item.icon
                          className={`w-5 h-5 transition-colors ${
                            item.action === "logout"
                              ? "text-destructive"
                              : "text-muted-foreground group-hover:text-primary"
                          }`}
                        />
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
          </AnimatePresence>,
          portalRoot,
        )}
    </div>
  );
}
