import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, Users, CreditCard, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TermsOfServiceScreenProps {
  onBack: () => void;
}

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: `By accessing or using AI Attorney ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.

These terms apply to all users, including visitors, registered users, and subscribers. We reserve the right to update these terms at any time, and continued use of the App constitutes acceptance of any modifications.`
  },
  {
    icon: Scale,
    title: "2. Nature of Service",
    content: `AI Attorney provides AI-powered legal information and document drafting assistance. Important disclaimers:

• The App provides general legal information, NOT legal advice
• AI-generated content should be reviewed by a qualified legal professional
• We do not establish an attorney-client relationship
• The App is designed to assist Pakistani legal practitioners and law students
• Information provided is based on Pakistani law and may not apply to other jurisdictions`
  },
  {
    icon: Users,
    title: "3. User Accounts",
    content: `To access certain features, you must create an account. You agree to:

• Provide accurate and complete registration information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account
• Not share your account with others or create multiple accounts`
  },
  {
    icon: Shield,
    title: "4. Acceptable Use",
    content: `You agree NOT to use the App to:

• Violate any applicable laws or regulations
• Infringe upon intellectual property rights
• Transmit harmful, offensive, or illegal content
• Attempt to gain unauthorized access to our systems
• Use automated systems to access the App without permission
• Misrepresent AI-generated content as professional legal advice
• Use the service for any fraudulent or deceptive purposes`
  },
  {
    icon: CreditCard,
    title: "5. Subscription & Payments",
    content: `Premium features require a paid subscription:

• Subscription fees are billed monthly in Pakistani Rupees (PKR)
• Payments are non-refundable except as specified in our refund policy
• We offer a 7-day money-back guarantee for first-time subscribers
• You may cancel your subscription at any time
• Access continues until the end of your current billing period
• We reserve the right to modify pricing with 30 days notice`
  },
  {
    icon: FileText,
    title: "6. Intellectual Property",
    content: `All content, features, and functionality of the App are owned by AI Attorney and protected by intellectual property laws:

• You retain ownership of content you create using our tools
• You grant us a license to process your content to provide services
• You may not copy, modify, or distribute our proprietary content
• Our trademarks and branding may not be used without permission
• Document templates are for personal/professional use only`
  },
  {
    icon: AlertTriangle,
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by law:

• The App is provided "as is" without warranties of any kind
• We do not guarantee accuracy of AI-generated content
• We are not liable for decisions made based on App information
• Our liability is limited to the amount paid for subscription fees
• We are not responsible for third-party services or content
• You assume all risks associated with using AI-generated legal content`
  },
  {
    icon: XCircle,
    title: "8. Termination",
    content: `We may suspend or terminate your access if:

• You violate these Terms of Service
• You engage in fraudulent or illegal activity
• Your account remains inactive for an extended period
• Required by law or court order

Upon termination, your right to use the App ceases immediately. Provisions regarding intellectual property, limitation of liability, and dispute resolution survive termination.`
  },
  {
    icon: Scale,
    title: "9. Dispute Resolution",
    content: `Any disputes arising from these terms or use of the App shall be:

• Governed by the laws of Pakistan
• Subject to the exclusive jurisdiction of courts in Lahore, Pakistan
• First attempted to be resolved through good-faith negotiation
• Submitted to mediation before pursuing litigation

Class action lawsuits and class-wide arbitration are not permitted.`
  },
];

export function TermsOfServiceScreen({ onBack }: TermsOfServiceScreenProps) {
  const lastUpdated = "January 15, 2026";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-display font-bold">Terms of Service</h1>
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-4">
          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Welcome to AI Attorney</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please read these terms carefully before using our services. By using AI Attorney, you agree to be bound by these terms and conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <section.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground pt-1">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed pl-11">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-foreground mb-2">Questions About These Terms?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you have any questions about these Terms of Service, please contact us.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: <span className="text-primary">legal@aiattorney.com.pk</span></p>
                  <p>Phone: <span className="text-primary">+92 42 1234 5678</span></p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Version Info */}
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground">
              Terms of Service v2.0 • Effective Date: January 15, 2026
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © 2026 AI Attorney. All rights reserved.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
