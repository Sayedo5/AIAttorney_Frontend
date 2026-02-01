import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  iconColor?: string;
  badge?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  onClick,
  className,
  iconColor = "text-primary",
  badge,
}: FeatureCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "text-left w-full p-4 rounded-2xl bg-card border border-border/50 transition-all duration-300",
        "hover:border-primary/40 hover:shadow-md hover:-translate-y-1",
        "active:scale-[0.98] active:translate-y-0",
        "group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2.5 rounded-xl bg-primary/10 transition-all duration-300",
          "group-hover:bg-primary/20 group-hover:shadow-sm",
          iconColor
        )}>
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
