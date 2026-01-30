import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Moon, 
  Sun, 
  LogOut, 
  ChevronRight, 
  Shield, 
  HelpCircle,
  FileText,
  Star,
  Mail,
  Phone,
  ArrowLeft
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

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    caseUpdates: true,
    newsletter: false,
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle the theme
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
            onClick={onBack}
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
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">Advocate User</h2>
                <p className="text-sm text-muted-foreground">advocate@aiattorney.com</p>
                <p className="text-xs text-primary mt-1">Premium Plan</p>
              </div>
              <Button variant="outline" size="sm" className="border-primary/30 text-primary">
                Edit
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
          <Card>
            <SettingItem 
              icon={isDarkMode ? Moon : Sun} 
              label="Dark Mode" 
              toggle={isDarkMode}
              onToggle={toggleDarkMode}
            />
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
            <SettingItem 
              icon={Bell} 
              label="Push Notifications" 
              toggle={notifications.push}
              onToggle={(checked) => setNotifications({ ...notifications, push: checked })}
            />
            <SettingItem 
              icon={Mail} 
              label="Email Notifications" 
              toggle={notifications.email}
              onToggle={(checked) => setNotifications({ ...notifications, email: checked })}
            />
            <SettingItem 
              icon={FileText} 
              label="Case Updates" 
              toggle={notifications.caseUpdates}
              onToggle={(checked) => setNotifications({ ...notifications, caseUpdates: checked })}
            />
            <SettingItem 
              icon={Star} 
              label="Newsletter" 
              toggle={notifications.newsletter}
              onToggle={(checked) => setNotifications({ ...notifications, newsletter: checked })}
            />
          </Card>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Support</h3>
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
