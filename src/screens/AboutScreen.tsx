import { motion } from "framer-motion";
import { ArrowLeft, Shield, Zap, Users, Award, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useHaptics } from "@/hooks/useHaptics";
import appIcon from "@/assets/app-icon.png";

interface AboutScreenProps {
  onBack: () => void;
}

const stats = [
  { label: "Case Laws", value: "400K+", icon: () => <img src={appIcon} alt="" className="w-5 h-5" /> },
  { label: "Users", value: "10K+", icon: Users },
  { label: "Legal Documents", value: "50K+", icon: Award },
];

const features = [
  {
    icon: () => <img src={appIcon} alt="" className="w-5 h-5" />,
    title: "AI-Powered Legal Research",
    description: "Access 400K+ Pakistani case laws and statutes instantly with intelligent search.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data is encrypted and secure. We never share your confidential information.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get accurate legal insights in seconds, not hours. Save time on research.",
  },
  {
    icon: Globe,
    title: "Pakistani Law Focus",
    description: "Built specifically for Pakistani legal system with local expertise.",
  },
];

const team = [
  { name: "Legal Experts", count: "15+" },
  { name: "AI Engineers", count: "10+" },
  { name: "Support Staff", count: "24/7" },
];

export function AboutScreen({ onBack }: AboutScreenProps) {
  const { impact } = useHaptics();

  const handleBack = async () => {
    await impact("light");
    onBack();
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
          <h1 className="text-xl font-semibold text-foreground">About Us</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow mx-auto mb-4 overflow-hidden">
            <img src={appIcon} alt="AI Attorney" className="w-12 h-12 object-contain" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            AI Attorney
          </h2>
          <p className="text-primary font-medium">The Ultimate AI Co-Counsel</p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI Attorney is a transformative legal intelligence platform designed to reshape 
              how legal professionals work in Pakistan. We deliver instant, accurate, and 
              secure legal assistance powered by advanced AI technology.
            </p>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose Us</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Our Team</h3>
          <Card className="p-4">
            <div className="flex justify-around">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + index * 0.05 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold text-primary">{member.count}</p>
                  <p className="text-xs text-muted-foreground">{member.name}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <p className="text-xs text-muted-foreground">AI Attorney v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">© 2024 AI Attorney Pakistan</p>
          <p className="text-xs text-primary mt-2">Instant | Accurate | Secure</p>
        </motion.div>
      </div>
    </div>
  );
}
