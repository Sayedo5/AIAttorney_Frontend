import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHaptics } from "@/hooks/useHaptics";

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: <Scale className="w-12 h-12" />,
    title: "Your AI Legal Assistant",
    description: "Get instant access to Pakistani law expertise powered by advanced AI. Navigate complex legal matters with confidence.",
    accentColor: "primary",
  },
  {
    icon: <MessageSquare className="w-12 h-12" />,
    title: "Chat with AI Attorney",
    description: "Ask legal questions in plain language and receive accurate, context-aware responses tailored to Pakistani law.",
    accentColor: "primary",
  },
  {
    icon: <BookOpen className="w-12 h-12" />,
    title: "Comprehensive Legal Library",
    description: "Access Pakistan's Constitution, PPC, CrPC, and thousands of case laws. Search and reference legal provisions instantly.",
    accentColor: "primary",
  },
  {
    icon: <FileText className="w-12 h-12" />,
    title: "Smart Document Drafting",
    description: "Generate professional legal documents, contracts, and applications with AI assistance. Save hours of manual work.",
    accentColor: "primary",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { impact, notification } = useHaptics();

  const handleNext = async () => {
    await impact('light');
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      await notification('success');
      onComplete();
    }
  };

  const handleSkip = async () => {
    await impact('light');
    onComplete();
  };

  const handleDotClick = async (index: number) => {
    await impact('light');
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          Skip
        </Button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            {/* Icon Container with Glassmorphism */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mb-10"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsl(var(--primary) / 0.3)",
                    "0 0 0 20px hsl(var(--primary) / 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-glow"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <div className="text-primary-foreground">
                    {currentSlideData.icon}
                  </div>
                </div>
              </motion.div>

              {/* Sparkle decorations */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.7,
                }}
                className="absolute -bottom-1 -left-3"
              >
                <Sparkles className="w-4 h-4 text-primary/60" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-display font-bold text-foreground mb-4"
            >
              {currentSlideData.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground leading-relaxed"
            >
              {currentSlideData.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-10 space-y-8">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary shadow-glow"
                  : "w-2 bg-muted hover:bg-muted-foreground/50"
              }`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleNext}
            className="w-full btn-primary-gradient py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              key={isLastSlide ? "start" : "next"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              {isLastSlide ? (
                <>
                  <Scale className="w-5 h-5" />
                  Get Started
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-muted-foreground text-xs"
        >
          <span>INSTANT</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span>ACCURATE</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span>SECURE</span>
        </motion.div>
      </div>
    </div>
  );
};
