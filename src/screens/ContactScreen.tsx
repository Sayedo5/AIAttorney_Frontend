import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Mail, Phone, MapPin, Clock, Send, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useHaptics } from "@/hooks/useHaptics";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

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
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+92 370 9250258",
    action: "https://wa.me/923709250258",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@aiattorney.com.pk",
    action: "mailto:support@aiattorney.com.pk",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+92 370 9250258",
    action: "tel:+923709250258",
    color: "bg-purple-500/10 text-purple-600",
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
    
    // Simulate submission
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
          <h1 className="text-xl font-semibold text-foreground">Contact & Support</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Get in Touch
          </h2>
          <p className="text-muted-foreground">
            We're here to help with any questions
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid gap-3">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleContactMethod(method.action)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{method.title}</p>
                        <p className="text-sm text-muted-foreground">{method.value}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
