import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  imageSrc?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export function UserAvatar({
  firstName = "",
  lastName = "",
  imageSrc,
  size = "md",
  className,
  onClick,
}: UserAvatarProps) {
  const getInitials = () => {
    const first = firstName.charAt(0).toUpperCase();
    const last = lastName.charAt(0).toUpperCase();
    return `${first}${last}`;
  };

  if (imageSrc) {
    return (
      <motion.div
        whileTap={onClick ? { scale: 0.95 } : undefined}
        onClick={onClick}
        className={cn(
          "rounded-full overflow-hidden bg-primary/10 flex items-center justify-center cursor-pointer",
          sizeClasses[size],
          className
        )}
      >
        <img
          src={imageSrc}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={cn(
        "rounded-full bg-primary flex items-center justify-center font-semibold text-primary-foreground cursor-pointer transition-all duration-200 hover:shadow-glow",
        sizeClasses[size],
        className
      )}
    >
      {getInitials() || "U"}
    </motion.div>
  );
}
