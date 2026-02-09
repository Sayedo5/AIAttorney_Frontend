import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, disabled }: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <motion.div
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={() => !disabled && onChange(!checked)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
          checked
            ? "bg-primary border-primary"
            : "bg-transparent border-muted-foreground/30"
        }`}
      >
        <motion.div
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        >
          <Check className="w-3 h-3 text-primary-foreground" />
        </motion.div>
      </motion.div>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
}
