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

// Navigation
import { BottomNav } from "@/components/navigation/BottomNav";

type AuthScreen = "login" | "signup";
type AppScreen = "home" | "chat" | "library" | "documents" | "cases" | "history" | "settings";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [activeTab, setActiveTab] = useState<AppScreen>("home");
  const [showHistory, setShowHistory] = useState(false);

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen("login");
    setActiveTab("home");
  };

  // Auth screens
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <AnimatePresence mode="wait">
          {authScreen === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoginScreen
                onLogin={handleLogin}
                onSignupClick={() => setAuthScreen("signup")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SignupScreen
                onSignup={handleSignup}
                onLoginClick={() => setAuthScreen("login")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Main app with bottom navigation
  return (
    <div className="app-container">
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
              <SettingsScreen onBack={handleBackFromSettings} onLogout={handleLogout} />
            )}
            {activeTab === "chat" && (
              <ChatScreen onHistoryClick={handleHistoryClick} />
            )}
            {activeTab === "library" && <LibraryScreen />}
            {activeTab === "documents" && <DocumentsScreen />}
            {activeTab === "cases" && <CasesScreen />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleNavigate} />
    </div>
  );
};

export default Index;
