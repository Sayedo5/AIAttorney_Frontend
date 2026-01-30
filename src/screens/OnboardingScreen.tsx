import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Briefcase,
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
  gradient: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: <Scale className="w-16 h-16" />,
    title: "Your AI Legal Assistant",
    description: "Get instant access to Pakistani law expertise powered by advanced AI. Navigate complex legal matters with confidence.",
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    icon: <MessageSquare className="w-16 h-16" />,
    title: "Chat with AI Attorney",
    description: "Ask legal questions in plain language and receive accurate, context-aware responses tailored to Pakistani law.",
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
  },
  {
    icon: <BookOpen className="w-16 h-16" />,
    title: "Comprehensive Legal Library",
    description: "Access Pakistan's Constitution, PPC, CrPC, and thousands of case laws. Search and reference legal provisions instantly.",
    gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
  },
  {
    icon: <FileText className="w-16 h-16" />,
    title: "Smart Document Drafting",
    description: "Generate professional legal documents, contracts, and applications with AI assistance. Save hours of manual work.",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
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
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16">
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
            {/* Animated Background Gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-b ${currentSlideData.gradient} pointer-events-none`}
            />

            {/* Icon Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(14, 138, 107, 0.4)",
                      "0 0 0 20px rgba(14, 138, 107, 0)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <div className="text-primary">
                    {currentSlideData.icon}
                  </div>
                </motion.div>
              </div>

              {/* Sparkle decorations */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-primary/60" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute -bottom-1 -left-3"
              >
                <Sparkles className="w-4 h-4 text-primary/40" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={textVariants}
              initial="initial"
              animate="animate"
              custom={0.3}
              className="text-2xl font-bold text-foreground mb-4 relative z-10"
            >
              {currentSlideData.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={textVariants}
              initial="initial"
              animate="animate"
              custom={0.4}
              className="text-muted-foreground leading-relaxed relative z-10"
            >
              {currentSlideData.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="px-8 pb-12 space-y-8">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
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
          <Button
            onClick={handleNext}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg"
          >
            <motion.span
              key={isLastSlide ? "start" : "next"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              {isLastSlide ? (
                <>
                  <Briefcase className="w-5 h-5" />
                  Get Started
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
