import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Crown, Zap, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useHaptics } from "@/hooks/useHaptics";

interface PricingScreenProps {
  onBack: () => void;
}

type BillingPeriod = "monthly" | "annually" | "custom";

const plans = [
  {
    name: "Student",
    icon: BookOpen,
    monthlyPrice: "1,000",
    yearlyPrice: "10,000",
    originalYearlyPrice: "12,000",
    description: "Get started right away, with AI Attorney's Student every month, including:",
    features: [
      "500 Chat Prompts",
      "Limited Library Access",
      "40 Document Drafts",
      "40 Document Reviews",
    ],
    popular: false,
    buttonText: "Buy Plan",
  },
  {
    name: "Premium",
    icon: Crown,
    monthlyPrice: "5,000",
    yearlyPrice: "60,000",
    originalYearlyPrice: "72,000",
    description: "Get started right away, with AI Attorney's Premium every month, including:",
    features: [
      "1800 Chat Prompts",
      "Library Access",
      "300 Document Drafts",
      "Case Diary Entries",
      "Cause List Access",
      "180 Document Reviews",
      "15 User Templates",
    ],
    popular: true,
    buttonText: "Buy Plan",
  },
  {
    name: "Basic Plan",
    icon: Zap,
    monthlyPrice: "2,500",
    yearlyPrice: "25,000",
    originalYearlyPrice: "30,000",
    description: "Get started right away, with AI Attorney's Basic Plan every month, including:",
    features: [
      "840 Chat Prompts",
      "3600 Library Searches",
      "120 Document Drafts",
      "60 Document Reviews",
      "600 Case Diary Entries",
      "Cause List Access",
      "5 User Templates",
    ],
    popular: false,
    buttonText: "Buy Plan",
  },
];

export function PricingScreen({ onBack }: PricingScreenProps) {
  const { impact } = useHaptics();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("annually");

  const handleBack = async () => {
    await impact("light");
    onBack();
  };

  const handleSelectPlan = async (planName: string) => {
    await impact("medium");
    // Handle plan selection
  };

  const handleBillingChange = async (period: BillingPeriod) => {
    await impact("light");
    setBillingPeriod(period);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-xl font-display font-semibold text-foreground">Pricing</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center bg-card border border-border rounded-full p-1">
            {(["monthly", "annually", "custom"] as BillingPeriod[]).map((period) => (
              <motion.button
                key={period}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBillingChange(period)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === period
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  plan.popular
                    ? "border-2 border-primary shadow-glow"
                    : "border border-border hover:border-primary/30"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-md">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="p-6 pt-8">
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                    {billingPeriod === "annually" && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground whitespace-nowrap">
                        Save 17%
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-muted-foreground">PKR</span>
                      <span className="text-4xl font-display font-bold text-foreground">
                        {billingPeriod === "annually" ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingPeriod === "annually" ? "year" : "month"}
                      </span>
                    </div>
                    {billingPeriod === "annually" && (
                      <span className="text-sm text-muted-foreground line-through">
                        PKR {plan.originalYearlyPrice}
                      </span>
                    )}
                  </div>

                  {/* Buy Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "btn-primary-gradient"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {plan.buttonText}
                  </motion.button>

                  {/* Features */}
                  <ul className="space-y-3 mt-6">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + 0.03 * i }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-4"
        >
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <button className="text-primary hover:text-primary-glow transition-colors font-medium">
              View FAQ
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
