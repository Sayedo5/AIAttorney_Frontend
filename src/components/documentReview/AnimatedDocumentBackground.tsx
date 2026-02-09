import { motion } from "framer-motion";

export function AnimatedDocumentBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />

      {/* Floating document icons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [-20, -100],
            x: Math.sin(i) * 20,
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}
          className="absolute bottom-0"
          style={{ left: `${15 + i * 18}%` }}
        >
          <div className="w-8 h-10 rounded bg-primary/10 border border-primary/20" />
        </motion.div>
      ))}
    </div>
  );
}
