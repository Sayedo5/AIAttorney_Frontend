import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Screens
import { LoginScreen } from "@/screens/LoginScreen";
import { SignupScreen } from "@/screens/SignupScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { ChatScreen } from "@/screens/ChatScreen";
import { LibraryScreen } from "@/screens/LibraryScreen";
import { DocumentsScreen } from "@/screens/DocumentsScreen";
import { DrafterScreen } from "@/screens/DrafterScreen";
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
import { CaseResearchScreen } from "@/screens/CaseResearchScreen";
import { FeedbackScreen } from "@/screens/FeedbackScreen";
import { BookmarkedCasesScreen } from "@/screens/BookmarkedCasesScreen";
import { RemindersScreen } from "@/screens/RemindersScreen";
import { TermsOfServiceScreen } from "@/screens/TermsOfServiceScreen";
import { SearchResultsScreen } from "@/screens/SearchResultsScreen";
import ActsScreen from "@/screens/ActsScreen";
import CodesScreen from "@/screens/CodesScreen";
import EditorScreen from "@/screens/EditorScreen";
import PaymentScreen from "@/screens/PaymentScreen";

// Navigation
import { BottomNav } from "@/components/navigation/BottomNav";

type AuthScreen = "login" | "signup" | "forgot-password" | "terms";
type AppScreen = "home" | "chat" | "library" | "documents" | "drafter" | "cases" | "history" | "settings" | "profile-edit" | "pricing" | "about" | "contact" | "case-research" | "feedback" | "bookmarked-cases" | "reminders" | "terms" | "search-results" | "acts" | "codes" | "editor" | "payment";

const ONBOARDING_KEY = "ai-attorney-onboarding-complete";
const SPLASH_SHOWN_KEY = "ai-attorney-splash-shown";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash on every app load for branding
    return true;
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === "true";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [activeTab, setActiveTab] = useState<AppScreen>("home");
  const [previousTab, setPreviousTab] = useState<AppScreen>("home");
  const [showHistory, setShowHistory] = useState(false);
  
  // Chat state
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleNavigate = (tab: string, query?: string) => {
    // Handle search results navigation
    if (query) {
      setSearchQuery(query);
    }
    setActiveTab(tab as AppScreen);
    setShowHistory(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentConversationId(chatId);
    setShowHistory(false);
    setActiveTab("chat");
  };

  const handleNewChat = () => {
    setCurrentConversationId(null);
    setShowHistory(false);
    setActiveTab("chat");
  };

  const handleSettingsClick = () => {
    setPreviousTab(activeTab);
    setActiveTab("settings");
  };

  const handleBackFromSettings = () => {
    setActiveTab(previousTab);
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

  const handleFeedbackClick = () => {
    setActiveTab("feedback");
  };

  const handleBackFromPricing = () => {
    setActiveTab(previousTab === "settings" ? "settings" : previousTab);
  };

  const handleBackFromAbout = () => {
    setActiveTab(previousTab === "settings" ? "settings" : previousTab);
  };

  const handleBackFromContact = () => {
    setActiveTab(previousTab === "settings" ? "settings" : previousTab);
  };

  const handleBackFromFeedback = () => {
    setActiveTab(previousTab === "settings" ? "settings" : previousTab);
  };

  const handleBookmarkedCasesClick = () => {
    setActiveTab("bookmarked-cases");
  };

  const handleBackFromBookmarkedCases = () => {
    setActiveTab("library");
  };

  const handleRemindersClick = () => {
    setPreviousTab(activeTab);
    setActiveTab("reminders");
  };

  const handleBackFromReminders = () => {
    setActiveTab(previousTab);
  };

  const handleTermsClick = () => {
    setActiveTab("terms");
  };

  const handleBackFromTerms = () => {
    setActiveTab(previousTab === "settings" ? "settings" : previousTab);
  };
  
  const handleBackFromSearchResults = () => {
    setActiveTab(previousTab);
    setSearchQuery("");
  };

  const handleLogout = () => {
    setShowHistory(false);
    setIsAuthenticated(false);
    setAuthScreen("login");
    setActiveTab("home");
    setCurrentConversationId(null);
  };

  // Splash screen
  if (showSplash) {
    return (
      <div className="app-container">
        <SplashScreen onComplete={handleSplashComplete} />
      </div>
    );
  }

  // Onboarding screen
  if (!hasCompletedOnboarding) {
    return (
      <div className="app-container">
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Auth screens
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <AnimatePresence mode="wait">
          {authScreen === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SignupScreen
                onSignup={handleSignup}
                onLoginClick={() => setAuthScreen("login")}
                onTermsClick={() => setAuthScreen("terms")}
              />
            </motion.div>
          )}
          {authScreen === "forgot-password" && (
            <motion.div
              key="forgot-password"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ForgotPasswordScreen
                onBack={() => setAuthScreen("login")}
              />
            </motion.div>
          )}
          {authScreen === "terms" && (
            <motion.div
              key="terms-auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TermsOfServiceScreen
                onBack={() => setAuthScreen("signup")}
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
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
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
              <HomeScreen 
                onNavigate={handleNavigate} 
                userName="Advocate User" 
                onSettingsClick={handleSettingsClick}
                onLogout={handleLogout}
                onFeedback={handleFeedbackClick}
                onSupport={handleContactClick}
                onNotificationsClick={handleRemindersClick}
              />
            )}
            {activeTab === "settings" && (
              <SettingsScreen 
                onBack={handleBackFromSettings} 
                onLogout={handleLogout} 
                onEditProfile={handleProfileEditClick}
                onPricing={handlePricingClick}
                onAbout={handleAboutClick}
                onContact={handleContactClick}
                onTerms={handleTermsClick}
              />
            )}
            {activeTab === "profile-edit" && (
              <ProfileEditScreen onBack={handleBackFromProfileEdit} />
            )}
            {activeTab === "chat" && (
              <ChatScreen 
                onHistoryClick={handleHistoryClick} 
                conversationId={currentConversationId}
                onConversationChange={setCurrentConversationId}
              />
            )}
            {activeTab === "library" && <LibraryScreen onSettingsClick={handleSettingsClick} onLogout={handleLogout} onBookmarkedCasesClick={handleBookmarkedCasesClick} onSupport={handleContactClick} onNotificationsClick={handleRemindersClick} />}
            {activeTab === "documents" && <DocumentsScreen onSettingsClick={handleSettingsClick} onSupport={handleContactClick} onNotificationsClick={handleRemindersClick} onDrafterClick={() => handleNavigate("drafter")} />}
            {activeTab === "drafter" && <DrafterScreen onBack={() => handleNavigate("documents")} onSettingsClick={handleSettingsClick} onNotificationsClick={handleRemindersClick} />}
            {activeTab === "cases" && <CasesScreen onSettingsClick={handleSettingsClick} onRemindersClick={handleRemindersClick} onSupport={handleContactClick} />}
            {activeTab === "pricing" && <PricingScreen onBack={handleBackFromPricing} />}
            {activeTab === "about" && <AboutScreen onBack={handleBackFromAbout} />}
            {activeTab === "contact" && <ContactScreen onBack={handleBackFromContact} />}
            {activeTab === "case-research" && <CaseResearchScreen />}
            {activeTab === "feedback" && <FeedbackScreen onBack={handleBackFromFeedback} />}
            {activeTab === "bookmarked-cases" && <BookmarkedCasesScreen onBack={handleBackFromBookmarkedCases} />}
            {activeTab === "reminders" && <RemindersScreen onBack={handleBackFromReminders} />}
            {activeTab === "terms" && <TermsOfServiceScreen onBack={handleBackFromTerms} />}
            {activeTab === "acts" && <ActsScreen onBack={() => setActiveTab("library")} />}
            {activeTab === "codes" && <CodesScreen onBack={() => setActiveTab("library")} />}
            {activeTab === "editor" && <EditorScreen onBack={() => setActiveTab("documents")} />}
            {activeTab === "payment" && <PaymentScreen onBack={() => setActiveTab(previousTab)} />}
            {activeTab === "search-results" && (
              <SearchResultsScreen 
                query={searchQuery}
                onBack={handleBackFromSearchResults}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleNavigate} />
    </div>
  );
};

export default Index;
