import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Crown, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useHaptics } from "@/hooks/useHaptics";

interface PricingScreenProps {
  onBack: () => void;
}

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    icon: Zap,
    description: "Perfect for getting started",
    features: [
      "5 AI queries per day",
      "Basic case law search",
      "Document templates",
      "Email support",
    ],
    popular: false,
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "Professional",
    price: "2,999",
    period: "month",
    icon: Crown,
    description: "For practicing advocates",
    features: [
      "Unlimited AI queries",
      "Advanced case research",
      "Document drafting",
      "Priority support",
      "Case management",
      "Export to PDF/Word",
    ],
    popular: true,
    buttonText: "Upgrade Now",
    disabled: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    icon: Building2,
    description: "For law firms & teams",
    features: [
      "Everything in Professional",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "Training sessions",
      "SLA guarantee",
    ],
    popular: false,
    buttonText: "Contact Sales",
    disabled: false,
  },
];

export function PricingScreen({ onBack }: PricingScreenProps) {
  const { impact } = useHaptics();

  const handleBack = async () => {
    await impact("light");
    onBack();
  };

  const handleSelectPlan = async (planName: string) => {
    await impact("medium");
    // Handle plan selection
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
          <h1 className="text-xl font-semibold text-foreground">Pricing</h1>
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
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground">
            Unlock the full power of AI Attorney
          </p>
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
                className={`p-6 relative overflow-hidden ${
                  plan.popular
                    ? "border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10"
                    : "border border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.popular ? "bg-primary/20" : "bg-secondary"
                    }`}
                  >
                    <plan.icon
                      className={`w-6 h-6 ${
                        plan.popular ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price === "Custom" ? "" : "PKR "}
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPlan(plan.name)}
                  disabled={plan.disabled}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "btn-primary-gradient"
                      : plan.disabled
                      ? "bg-secondary text-muted-foreground cursor-not-allowed"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  {plan.buttonText}
                </motion.button>
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
            <button className="text-primary hover:text-primary-glow transition-colors">
              View FAQ
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
