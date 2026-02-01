import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Monitor,
  LogOut, 
  ChevronRight, 
  Shield, 
  HelpCircle,
  FileText,
  Star,
  Mail,
  Phone,
  ArrowLeft,
  Check,
  Smartphone,
  CreditCard,
  Info,
  MessageCircle,
  Crown,
  Zap,
  Clock,
  TrendingUp
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useHaptics } from "@/hooks/useHaptics";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useToast } from "@/hooks/use-toast";

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onEditProfile: () => void;
  onPricing: () => void;
  onAbout: () => void;
  onContact: () => void;
}

export const SettingsScreen = ({ onBack, onLogout, onEditProfile, onPricing, onAbout, onContact }: SettingsScreenProps) => {
  const { theme, setTheme } = useTheme();
  const { impact, notification } = useHaptics();
  const { register, isRegistered, permissionStatus } = usePushNotifications();
  const { toast } = useToast();
  const isDarkMode = theme === "dark";
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    caseUpdates: true,
    newsletter: false,
  });

  const handleThemeChange = async (newTheme: string) => {
    await impact('light');
    setTheme(newTheme);
  };

  const handleToggle = async (key: keyof typeof notifications, checked: boolean) => {
    await impact('light');
    setNotifications({ ...notifications, [key]: checked });
  };

  const handleRegisterPushNotifications = async () => {
    await impact('medium');
    const success = await register();
    if (success) {
      await notification('success');
      toast({
        title: "Push Notifications Enabled",
        description: "You'll now receive notifications on this device.",
      });
    } else {
      await notification('error');
      toast({
        title: "Permission Denied",
        description: "Please enable notifications in your device settings.",
        variant: "destructive",
      });
    }
  };

  const handleBackWithHaptic = async () => {
    await impact('light');
    onBack();
  };

  const handleEditProfileWithHaptic = async () => {
    await impact('light');
    onEditProfile();
  };

  const SettingItem = ({ 
    icon: Icon, 
    label, 
    value, 
    onClick,
    toggle,
    onToggle,
    danger = false
  }: { 
    icon: any; 
    label: string; 
    value?: string; 
    onClick?: () => void;
    toggle?: boolean;
    onToggle?: (checked: boolean) => void;
    danger?: boolean;
  }) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
        danger 
          ? "hover:bg-destructive/10" 
          : "hover:bg-muted/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          danger 
            ? "bg-destructive/10" 
            : "bg-primary/10"
        }`}>
          <Icon className={`w-5 h-5 ${danger ? "text-destructive" : "text-primary"}`} />
        </div>
        <span className={`font-medium ${danger ? "text-destructive" : "text-foreground"}`}>
          {label}
        </span>
      </div>
      {toggle !== undefined ? (
        <Switch 
          checked={toggle} 
          onCheckedChange={onToggle}
          onClick={(e) => e.stopPropagation()}
        />
      ) : value ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">{value}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBackWithHaptic}
            className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground shadow-lg"
              >
                AU
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-display font-bold text-foreground">Advocate User</h2>
                <p className="text-sm text-muted-foreground">advocate@aiattorney.com</p>
                <div className="flex items-center gap-1 mt-1">
                  <Crown className="w-3 h-3 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-500">Premium Plan</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={handleEditProfileWithHaptic}
              >
                Edit
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Subscription</h3>
          <Card className="overflow-hidden">
            {/* Plan Header */}
            <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Premium Plan</h4>
                    <p className="text-xs text-muted-foreground">Active • Renews Feb 28, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">PKR 2,999</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">AI Queries</span>
                </div>
                <span className="text-sm font-medium text-foreground">Unlimited</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Documents Drafted</span>
                  </div>
                  <span className="font-medium text-foreground">23 / ∞</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Case Research</span>
                  </div>
                  <span className="font-medium text-foreground">156 this month</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Billing cycle resets in 28 days</span>
              </div>
            </div>

            {/* Plan Actions */}
            <div className="p-4 pt-0 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-xl border-border/50"
                onClick={onPricing}
              >
                Change Plan
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-xl border-border/50"
              >
                Billing History
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Account</h3>
          <Card className="divide-y divide-border/50">
            <SettingItem icon={Mail} label="Email" value="advocate@..." />
            <SettingItem icon={Phone} label="Phone" value="+92 XXX..." />
            <SettingItem icon={Shield} label="Security" />
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Appearance</h3>
          <Card className="p-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "light", icon: Sun, label: "Light" },
                { value: "dark", icon: Moon, label: "Dark" },
                { value: "system", icon: Monitor, label: "System" },
              ].map(({ value, icon: Icon, label }) => (
                <motion.button
                  key={value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeChange(value)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    theme === value
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted/30 border-2 border-transparent hover:bg-muted/50"
                  }`}
                >
                  {theme === value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    theme === value ? "bg-primary/20" : "bg-muted/50"
                  }`}>
                    <Icon className={`w-5 h-5 ${theme === value ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`text-sm font-medium ${theme === value ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Notifications</h3>
          <Card className="divide-y divide-border/50">
            {/* Native Push Registration Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleRegisterPushNotifications}
              className="w-full flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground block">Device Notifications</span>
                  <span className="text-xs text-muted-foreground">
                    {isRegistered ? "Registered ✓" : permissionStatus === 'denied' ? "Permission denied" : "Tap to enable"}
                  </span>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${isRegistered ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
            </motion.button>
            
            <SettingItem 
              icon={Bell} 
              label="Push Notifications" 
              toggle={notifications.push}
              onToggle={(checked) => handleToggle('push', checked)}
            />
            <SettingItem 
              icon={Mail} 
              label="Email Notifications" 
              toggle={notifications.email}
              onToggle={(checked) => handleToggle('email', checked)}
            />
            <SettingItem 
              icon={FileText} 
              label="Case Updates" 
              toggle={notifications.caseUpdates}
              onToggle={(checked) => handleToggle('caseUpdates', checked)}
            />
            <SettingItem 
              icon={Star} 
              label="Newsletter" 
              toggle={notifications.newsletter}
              onToggle={(checked) => handleToggle('newsletter', checked)}
            />
          </Card>
        </motion.div>

        {/* More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">More</h3>
          <Card className="divide-y divide-border/50">
            <SettingItem icon={CreditCard} label="Pricing Plans" onClick={onPricing} />
            <SettingItem icon={Info} label="About Us" onClick={onAbout} />
            <SettingItem icon={MessageCircle} label="Contact & Support" onClick={onContact} />
          </Card>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Legal</h3>
          <Card className="divide-y divide-border/50">
            <SettingItem icon={HelpCircle} label="Help Center" />
            <SettingItem icon={FileText} label="Terms of Service" />
            <SettingItem icon={Shield} label="Privacy Policy" />
            <SettingItem icon={Star} label="Rate App" />
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Card className="overflow-hidden">
                <SettingItem icon={LogOut} label="Logout" danger />
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90%] rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout? You'll need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={onLogout}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-4"
        >
          <p className="text-xs text-muted-foreground">AI Attorney v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">© 2024 AI Attorney Pakistan</p>
        </motion.div>
      </div>
    </div>
  );
};
