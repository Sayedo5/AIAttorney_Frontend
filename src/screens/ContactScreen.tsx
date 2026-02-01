import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Mail, Phone, MapPin, Clock, Send, ExternalLink, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useHaptics } from "@/hooks/useHaptics";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContactScreenProps {
  onBack: () => void;
}

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@aiattorney.com.pk",
    action: "mailto:support@aiattorney.com.pk",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Phone,
    title: "Contact Us",
    value: "+92 370 9250258",
    action: "tel:+923709250258",
    color: "bg-primary/10 text-primary",
  },
];

const faqData = [
  {
    question: "What is AI Attorney, and who can use it?",
    answer: "AI Attorney is an AI-powered legal assistant designed to help individuals, businesses, and legal professionals with legal research, document drafting, and case analysis. Anyone seeking legal guidance can use it."
  },
  {
    question: "What is AI Attorney Legal Assistant?",
    answer: "AI Attorney Legal Assistant is a smart tool that uses artificial intelligence to provide legal information, assist with document preparation, and help users understand legal concepts in simple terms."
  },
  {
    question: "How does AI Attorney provide legal guidance?",
    answer: "AI Attorney analyzes your legal queries using advanced AI models trained on Pakistani law, including case law, statutes, and legal precedents. It provides relevant information and suggestions based on your specific situation."
  },
  {
    question: "How do I start using AI Attorney?",
    answer: "Simply create an account, complete the onboarding process, and start chatting with our AI. You can ask legal questions, research cases, or draft documents right away."
  },
  {
    question: "Which countries does AI Attorney support?",
    answer: "Currently, AI Attorney is primarily focused on Pakistani law, including federal and provincial legislation, Supreme Court and High Court judgments, and local legal practices."
  },
  {
    question: "Can I interact with AI Attorney in languages other than English?",
    answer: "Yes! AI Attorney supports both English and Urdu, making it accessible to a wider audience in Pakistan."
  },
  {
    question: "Can the AI handle complex legal questions, and does it cover all areas of law?",
    answer: "AI Attorney covers major areas of law including civil, criminal, corporate, family, property, and constitutional law. For highly complex matters, we recommend consulting with a licensed attorney."
  },
  {
    question: "Is my data and conversation secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your data. Your conversations are private and confidential."
  },
];

const officeInfo = [
  { icon: MapPin, label: "Location", value: "Lahore, Pakistan" },
  { icon: Clock, label: "Hours", value: "Mon-Sat, 9AM-6PM PKT" },
];

export function ContactScreen({ onBack }: ContactScreenProps) {
  const { impact, notification } = useHaptics();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleBack = async () => {
    await impact("light");
    onBack();
  };

  const handleContactMethod = async (action: string) => {
    await impact("medium");
    window.open(action, "_blank");
  };

  const handleSubmit = async () => {
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof errors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      await notification("error");
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    await notification("success");
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-xl font-semibold text-foreground">Support</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            We're here to help
          </span>
          <h2 className="text-2xl font-display font-bold text-foreground">
            AI Attorney Support
          </h2>
          <p className="text-muted-foreground">
            Get the help you need, when you need it
          </p>
        </motion.div>

        {/* Quick Contact Methods - 2 Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-all text-center h-full"
                  onClick={() => handleContactMethod(method.action)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{method.title}</p>
                      <p className="text-xs text-muted-foreground break-all">{method.value}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-foreground text-center">
              Frequently Asked Questions
            </h3>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="input-modern pl-10"
              />
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left text-sm hover:no-underline text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
              {filteredFaqs.length === 0 && (
                <p className="text-center text-muted-foreground py-4 text-sm">
                  No matching questions found
                </p>
              )}
            </Accordion>
          </Card>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleContactMethod("https://wa.me/923709250258")}
            className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </motion.button>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Send us a Message</h3>
          <Card className="p-4 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`input-modern ${errors.name ? "border-destructive ring-1 ring-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1 px-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`input-modern ${errors.email ? "border-destructive ring-1 ring-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1 px-1">{errors.email}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`input-modern resize-none ${errors.message ? "border-destructive ring-1 ring-destructive" : ""}`}
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1 px-1">{errors.message}</p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full btn-primary-gradient py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </Card>
        </motion.div>

        {/* Office Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Office</h3>
          <Card className="p-4 divide-y divide-border/50">
            {officeInfo.map((info, index) => (
              <div key={info.label} className={`flex items-center gap-3 ${index > 0 ? "pt-3" : ""} ${index < officeInfo.length - 1 ? "pb-3" : ""}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-medium text-foreground">{info.value}</p>
                </div>
              </div>
            ))}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
