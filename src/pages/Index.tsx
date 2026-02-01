import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Screens
import { LoginScreen } from "@/screens/LoginScreen";
import { SignupScreen } from "@/screens/SignupScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { ChatScreen } from "@/screens/ChatScreen";
import { LibraryScreen } from "@/screens/LibraryScreen";
import { DocumentsScreen } from "@/screens/DocumentsScreen";
import { CasesScreen } from "@/screens/CasesScreen";
import { ChatHistoryScreen } from "@/screens/ChatHistoryScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { ProfileEditScreen } from "@/screens/ProfileEditScreen";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { SplashScreen } from "@/screens/SplashScreen";
import { ForgotPasswordScreen } from "@/screens/ForgotPasswordScreen";
import { PricingScreen } from "@/screens/PricingScreen";
import { AboutScreen } from "@/screens/AboutScreen";
import { ContactScreen } from "@/screens/ContactScreen";

// Navigation
import { BottomNav } from "@/components/navigation/BottomNav";

type AuthScreen = "login" | "signup" | "forgot-password";
type AppScreen = "home" | "chat" | "library" | "documents" | "cases" | "history" | "settings" | "profile-edit" | "pricing" | "about" | "contact";
type AppPhase = "splash" | "onboarding" | "auth" | "main";

const ONBOARDING_KEY = "ai-attorney-onboarding-complete";

// Smooth transition variants for major screen changes
const screenTransition = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const
    }
  },
};

// Auth screen transitions (slide effect)
const authTransition = {
  initial: { opacity: 0, x: 30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const
    }
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: {
      duration: 0.25,
      ease: "easeIn" as const
    }
  },
};

// Page navigation transitions
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === "true";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [activeTab, setActiveTab] = useState<AppScreen>("home");
  const [showHistory, setShowHistory] = useState(false);
  
  // Determine current app phase
  const [showSplash, setShowSplash] = useState(true);

  const getCurrentPhase = (): AppPhase => {
    if (showSplash) return "splash";
    if (!hasCompletedOnboarding) return "onboarding";
    if (!isAuthenticated) return "auth";
    return "main";
  };

  const currentPhase = getCurrentPhase();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setHasCompletedOnboarding(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveTab("home");
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setActiveTab("home");
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as AppScreen);
    setShowHistory(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
  };

  const handleSettingsClick = () => {
    setActiveTab("settings");
  };

  const handleBackFromSettings = () => {
    setActiveTab("home");
  };

  const handleProfileEditClick = () => {
    setActiveTab("profile-edit");
  };

  const handleBackFromProfileEdit = () => {
    setActiveTab("settings");
  };

  const handlePricingClick = () => {
    setActiveTab("pricing");
  };

  const handleAboutClick = () => {
    setActiveTab("about");
  };

  const handleContactClick = () => {
    setActiveTab("contact");
  };

  const handleBackFromPricing = () => {
    setActiveTab("settings");
  };

  const handleBackFromAbout = () => {
    setActiveTab("settings");
  };

  const handleBackFromContact = () => {
    setActiveTab("settings");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen("login");
    setActiveTab("home");
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {/* Splash Screen */}
        {currentPhase === "splash" && (
          <motion.div
            key="splash"
            variants={screenTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {/* Onboarding Screen */}
        {currentPhase === "onboarding" && (
          <motion.div
            key="onboarding"
            variants={screenTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <OnboardingScreen onComplete={handleOnboardingComplete} />
          </motion.div>
        )}

        {/* Auth Screens */}
        {currentPhase === "auth" && (
          <motion.div
            key="auth"
            variants={screenTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <AnimatePresence mode="wait">
              {authScreen === "login" && (
                <motion.div
                  key="login"
                  variants={authTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <LoginScreen
                    onLogin={handleLogin}
                    onSignupClick={() => setAuthScreen("signup")}
                    onForgotPasswordClick={() => setAuthScreen("forgot-password")}
                  />
                </motion.div>
              )}
              {authScreen === "signup" && (
                <motion.div
                  key="signup"
                  variants={authTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <SignupScreen
                    onSignup={handleSignup}
                    onLoginClick={() => setAuthScreen("login")}
                  />
                </motion.div>
              )}
              {authScreen === "forgot-password" && (
                <motion.div
                  key="forgot-password"
                  variants={authTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ForgotPasswordScreen
                    onBack={() => setAuthScreen("login")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Main App */}
        {currentPhase === "main" && (
          <motion.div
            key="main"
            variants={screenTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <AnimatePresence mode="wait">
              {showHistory ? (
                <motion.div
                  key="history"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <ChatHistoryScreen
                    onBack={handleBackFromHistory}
                    onSelectChat={(id) => {
                      setShowHistory(false);
                      setActiveTab("chat");
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="min-h-screen"
                >
                  {activeTab === "home" && (
                    <HomeScreen onNavigate={handleNavigate} userName="Advocate" onSettingsClick={handleSettingsClick} />
                  )}
                  {activeTab === "settings" && (
                    <SettingsScreen 
                      onBack={handleBackFromSettings} 
                      onLogout={handleLogout} 
                      onEditProfile={handleProfileEditClick}
                      onPricing={handlePricingClick}
                      onAbout={handleAboutClick}
                      onContact={handleContactClick}
                    />
                  )}
                  {activeTab === "profile-edit" && (
                    <ProfileEditScreen onBack={handleBackFromProfileEdit} />
                  )}
                  {activeTab === "chat" && (
                    <ChatScreen onHistoryClick={handleHistoryClick} />
                  )}
                  {activeTab === "library" && <LibraryScreen />}
                  {activeTab === "documents" && <DocumentsScreen />}
                  {activeTab === "cases" && <CasesScreen />}
                  {activeTab === "pricing" && <PricingScreen onBack={handleBackFromPricing} />}
                  {activeTab === "about" && <AboutScreen onBack={handleBackFromAbout} />}
                  {activeTab === "contact" && <ContactScreen onBack={handleBackFromContact} />}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} onTabChange={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
