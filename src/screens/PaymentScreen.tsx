import { useState } from "react";
import { ArrowLeft, Check, Crown, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface PaymentScreenProps {
  onBack?: () => void;
  planId?: string;
}

interface PlanOption {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  icon: React.ReactNode;
  features: string[];
  isPopular?: boolean;
}

const PLANS: PlanOption[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "monthly",
    icon: <Zap className="h-5 w-5" />,
    features: ["5 AI chats/day", "Basic case search", "1 document draft/day", "Limited library access"],
  },
  {
    id: "pro",
    name: "Professional",
    price: 2999,
    interval: "monthly",
    icon: <Crown className="h-5 w-5" />,
    features: ["Unlimited AI chats", "Full case library", "Unlimited drafts", "Document review", "Priority support", "Version history"],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9999,
    interval: "monthly",
    icon: <Shield className="h-5 w-5" />,
    features: ["Everything in Pro", "Team collaboration", "Custom templates", "API access", "Dedicated support", "Analytics dashboard"],
  },
];

export default function PaymentScreen({ onBack, planId }: PaymentScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState(planId || "pro");
  const [isYearly, setIsYearly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Payment API placeholder
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-primary-foreground">Choose Your Plan</h1>
        </div>
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm ${!isYearly ? "text-primary-foreground font-semibold" : "text-primary-foreground/60"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isYearly ? "bg-green-500" : "bg-primary-foreground/30"}`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-primary-foreground transition-transform ${isYearly ? "translate-x-6" : "translate-x-0.5"}`}
            />
          </button>
          <span className={`text-sm ${isYearly ? "text-primary-foreground font-semibold" : "text-primary-foreground/60"}`}>
            Yearly
            <span className="ml-1 text-[10px] bg-green-500/20 text-green-200 px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Plans */}
      <ScrollArea className="flex-1 px-4 pt-4">
        <div className="space-y-4 pb-24">
          {PLANS.map((plan, index) => {
            const displayPrice = isYearly ? Math.round(plan.price * 0.8 * 12) : plan.price;
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-2.5 right-4 text-[10px] font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {plan.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {plan.price === 0 ? "Free" : (
                        <>
                          <span className="text-lg font-bold text-foreground">PKR {displayPrice.toLocaleString()}</span>
                          <span className="text-xs">/{isYearly ? "year" : "month"}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Subscribe Button */}
      <div className="p-4 border-t bg-card">
        <Button
          className="w-full h-12 rounded-xl font-semibold"
          onClick={handleSubscribe}
          disabled={isProcessing || selectedPlan === "free"}
        >
          {isProcessing ? "Processing..." : selectedPlan === "free" ? "Current Plan" : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
}
