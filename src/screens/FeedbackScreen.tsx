import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Star, 
  Send,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type FeedbackType = "suggestion" | "bug" | "compliment" | "other";

const feedbackTypes: { id: FeedbackType; label: string; emoji: string }[] = [
  { id: "suggestion", label: "Suggestion", emoji: "💡" },
  { id: "bug", label: "Bug Report", emoji: "🐛" },
  { id: "compliment", label: "Compliment", emoji: "❤️" },
  { id: "other", label: "Other", emoji: "📝" },
];

interface FeedbackScreenProps {
  onBack?: () => void;
}

export function FeedbackScreen({ onBack }: FeedbackScreenProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("suggestion");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter your feedback message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Feedback submitted!",
      description: "Thank you for your valuable feedback.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="Feedback" showBack onBack={onBack} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center px-6 py-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">
            Thank You!
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xs">
            Your feedback has been submitted successfully. We appreciate your input!
          </p>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
              setRating(0);
              setFeedbackType("suggestion");
            }}
            className="px-6 py-3 rounded-xl btn-primary-gradient font-semibold"
          >
            Submit Another
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Feedback" showBack onBack={onBack} />

      <div className="px-4 py-4 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            We value your opinion
          </div>
          <h1 className="text-xl font-display font-bold text-foreground mb-1">
            Share Your Feedback
          </h1>
          <p className="text-muted-foreground text-sm">
            Help us improve AI Attorney for you
          </p>
        </motion.div>

        {/* Rating Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5">
            <Label className="text-sm font-medium text-foreground mb-3 block">
              How would you rate your experience?
            </Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground mt-2"
              >
                {rating === 5 && "Excellent! We're glad you love it! 🎉"}
                {rating === 4 && "Great! Thanks for the positive feedback! 😊"}
                {rating === 3 && "Good! We'll work to improve! 👍"}
                {rating === 2 && "We'll do better! Thanks for letting us know."}
                {rating === 1 && "We're sorry! Please tell us how to improve."}
              </motion.p>
            )}
          </Card>
        </motion.div>

        {/* Feedback Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label className="text-sm font-medium text-foreground mb-3 block">
            What type of feedback?
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {feedbackTypes.map((type) => (
              <motion.button
                key={type.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFeedbackType(type.id)}
                className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  feedbackType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <span>{type.emoji}</span>
                {type.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Name <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="rounded-xl bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="rounded-xl bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="Brief subject of your feedback"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="rounded-xl bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Your Feedback <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us what you think..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={5}
              className="rounded-xl bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Contact Alternative */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-center py-4"
        >
          <p className="text-sm text-muted-foreground">
            Need immediate help?{" "}
            <a
              href="https://aiattorney.com.pk/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow font-medium transition-colors"
            >
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
