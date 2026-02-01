import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scale, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export const SplashScreen = ({ onComplete, duration = 2500 }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5 pointer-events-none" />
      
      {/* Animated background rings */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 4, opacity: [0, 0.1, 0] }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute w-32 h-32 rounded-full border border-primary/30"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 3, opacity: [0, 0.15, 0] }}
        transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
        className="absolute w-32 h-32 rounded-full border border-primary/40"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: [0, 0.2, 0] }}
        transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
        className="absolute w-32 h-32 rounded-full border border-primary/50"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="relative mb-8"
        >
          {/* Outer glow */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px 0 hsl(var(--primary) / 0.3)",
                "0 0 40px 10px hsl(var(--primary) / 0.2)",
                "0 0 20px 0 hsl(var(--primary) / 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
          >
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Scale className="w-10 h-10 text-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-2 -right-2"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-1 -left-3"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-primary/60" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-display font-bold text-foreground mb-2"
        >
          AI Attorney
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-muted-foreground text-sm"
        >
          The Ultimate AI Co-Counsel
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex items-center gap-2 text-muted-foreground text-xs"
      >
        <span>INSTANT</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
        <span>ACCURATE</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
        <span>SECURE</span>
      </motion.div>

      {/* Powered by text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-4 text-muted-foreground/50 text-xs"
      >
        ⚡ Powered by 400k case laws and statutes
      </motion.p>
    </motion.div>
  );
};
