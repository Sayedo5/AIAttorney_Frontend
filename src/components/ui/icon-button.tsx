import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary-glow",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        gradient:
          "bg-gradient-primary text-primary-foreground shadow-md hover:shadow-glow",
        soft:
          "bg-primary/10 text-primary hover:bg-primary/20",
        glass:
          "glass border border-border/30 text-foreground hover:bg-accent/50",
      },
      size: {
        sm: "h-9 w-9",
        default: "h-11 w-11",
        lg: "h-14 w-14",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  badge?: number | string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, badge, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }), "relative")}
        ref={ref}
        {...props}
      >
        {icon}
        {badge !== undefined && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center px-1.5 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
