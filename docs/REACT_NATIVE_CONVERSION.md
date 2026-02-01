# AI Attorney - React Native Conversion Guide

This document provides a comprehensive overview of the React web application structure to help with converting to React Native.

---

## Project Overview

**App Name:** AI Attorney  
**Purpose:** Legal assistant app for Pakistan advocates  
**Current Stack:** React + TypeScript + Tailwind CSS + Capacitor  
**Target Stack:** React Native (JavaScript)

---

## Navigation Structure

### Screen Types

```
AuthScreens: "login" | "signup" | "forgot-password" | "terms"
AppScreens: "home" | "chat" | "library" | "documents" | "cases" | "history" | "settings" | "profile-edit" | "pricing" | "about" | "contact" | "case-research" | "feedback" | "bookmarked-cases" | "reminders" | "terms"
```

### Navigation Flow

```
SplashScreen → OnboardingScreen → LoginScreen → HomeScreen
                                       ↓
                              BottomNav (5 tabs):
                              - Home
                              - Chat  
                              - Library
                              - Documents
                              - Cases
```

### React Native Equivalent

Use `@react-navigation/native` with:
- `createStackNavigator` for auth flow
- `createBottomTabNavigator` for main app
- `createNativeStackNavigator` for nested screens

---

## Screens (21 Total)

### Auth Screens
| Screen | File | Description |
|--------|------|-------------|
| LoginScreen | `LoginScreen.tsx` | Email/password login |
| SignupScreen | `SignupScreen.tsx` | User registration |
| ForgotPasswordScreen | `ForgotPasswordScreen.tsx` | Password reset |
| TermsOfServiceScreen | `TermsOfServiceScreen.tsx` | Terms & conditions |

### Main Screens
| Screen | File | Description |
|--------|------|-------------|
| HomeScreen | `HomeScreen.tsx` | Dashboard with quick actions |
| ChatScreen | `ChatScreen.tsx` | AI chat interface |
| LibraryScreen | `LibraryScreen.tsx` | Legal library (cases, acts, codes) |
| DocumentsScreen | `DocumentsScreen.tsx` | Document management |
| CasesScreen | `CasesScreen.tsx` | Active cases with reminders |

### Sub Screens
| Screen | File | Description |
|--------|------|-------------|
| SettingsScreen | `SettingsScreen.tsx` | App settings |
| ProfileEditScreen | `ProfileEditScreen.tsx` | Edit user profile |
| ChatHistoryScreen | `ChatHistoryScreen.tsx` | Previous conversations |
| PricingScreen | `PricingScreen.tsx` | Subscription plans |
| AboutScreen | `AboutScreen.tsx` | About the app |
| ContactScreen | `ContactScreen.tsx` | Contact support |
| FeedbackScreen | `FeedbackScreen.tsx` | User feedback form |
| BookmarkedCasesScreen | `BookmarkedCasesScreen.tsx` | Saved legal cases |
| RemindersScreen | `RemindersScreen.tsx` | Case hearing reminders |
| CaseResearchScreen | `CaseResearchScreen.tsx` | Legal case research |
| OnboardingScreen | `OnboardingScreen.tsx` | First-time user tutorial |
| SplashScreen | `SplashScreen.tsx` | App loading screen |

---

## Custom Hooks

### useBookmarks.ts
```javascript
// Manages bookmarked legal cases
// Storage: localStorage (convert to AsyncStorage)
// Interface:
{
  bookmarks: BookmarkedCase[],
  addBookmark: (caseData) => void,
  removeBookmark: (caseId) => void,
  isBookmarked: (caseId) => boolean,
  toggleBookmark: (caseData) => boolean
}
```

### useReminderSettings.ts
```javascript
// Manages reminder notification settings
// Storage: localStorage (convert to AsyncStorage)
// Interface:
{
  isRemindersEnabled: boolean,
  setRemindersEnabled: (enabled) => void
}
```

### useLocalNotifications.ts
```javascript
// Handles local notifications for reminders
// Capacitor Plugin → React Native equivalent: react-native-push-notification
// Methods: scheduleNotification, cancelNotification
```

### useHaptics.ts
```javascript
// Provides haptic feedback
// Capacitor Plugin → React Native equivalent: react-native-haptic-feedback
// Methods: impact, notification, selection
```

### useCamera.ts
```javascript
// Camera and gallery access
// Capacitor Plugin → React Native equivalent: react-native-image-picker
// Methods: takePhoto, pickFromGallery
```

### useSplashScreen.ts
```javascript
// Controls splash screen visibility
// Capacitor Plugin → React Native equivalent: react-native-splash-screen
// Methods: show, hide
```

---

## Data Models

### BookmarkedCase
```javascript
{
  id: string,
  title: string,
  citation: string,
  court: string,
  year: string,
  category: "civil" | "criminal",
  summary: string,
  bookmarkedAt: string // ISO date
}
```

### ChatMessage
```javascript
{
  id: string,
  text: string,
  isUser: boolean,
  timestamp: Date
}
```

### Case (Legal Case)
```javascript
{
  id: string,
  title: string,
  caseNumber: string,
  court: string,
  nextHearing: string,
  status: "active" | "pending" | "closed",
  category: "civil" | "criminal"
}
```

### Document
```javascript
{
  id: string,
  name: string,
  type: string, // PDF, DOCX, etc.
  size: string,
  uploadedAt: string,
  caseId?: string
}
```

---

## UI Components

### Navigation Components
- `Header` - Top app bar with title, settings, notifications
- `BottomNav` - 5-tab bottom navigation
- `ProfileDropdown` - User menu with settings, logout

### Chat Components
- `ChatBubble` - Message bubble (user/AI)
- `ChatInput` - Text input with send button

### Cards
- `FeatureCard` - Home screen action cards

### Common UI (shadcn → React Native Paper or NativeBase)
| Web Component | React Native Equivalent |
|--------------|------------------------|
| Button | `<Button>` or `<TouchableOpacity>` |
| Input | `<TextInput>` |
| Card | `<Card>` from react-native-paper |
| Avatar | `<Avatar>` from react-native-paper |
| Switch | `<Switch>` |
| ScrollArea | `<ScrollView>` |
| Tabs | `createMaterialTopTabNavigator` |
| Dialog | `<Modal>` or `<Portal>` |
| Toast | react-native-toast-message |

---

## Styling Conversion

### Tailwind → StyleSheet

```javascript
// Web (Tailwind)
className="flex items-center justify-center p-4 bg-primary rounded-lg"

// React Native
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#0E8A6B', // primary color
    borderRadius: 8,
  }
});
```

### Color Palette
```javascript
const colors = {
  primary: '#0E8A6B',      // Emerald green
  primaryForeground: '#FFFFFF',
  secondary: '#1A1F2C',
  background: '#0D0F12',
  foreground: '#FFFFFF',
  muted: '#1A1F2C',
  mutedForeground: '#8E9196',
  accent: '#0E8A6B',
  border: '#2A2F3C',
  card: '#141820',
};
```

---

## Storage Migration

| Web API | React Native Equivalent |
|---------|------------------------|
| `localStorage.getItem()` | `AsyncStorage.getItem()` |
| `localStorage.setItem()` | `AsyncStorage.setItem()` |
| `localStorage.removeItem()` | `AsyncStorage.removeItem()` |

Install: `@react-native-async-storage/async-storage`

---

## Animation Migration

| Framer Motion | React Native Equivalent |
|---------------|------------------------|
| `motion.div` | `Animated.View` or `react-native-reanimated` |
| `AnimatePresence` | `LayoutAnimation` or `react-native-reanimated` |
| `whileTap` | `Animated` with `TouchableOpacity` |
| `variants` | `Animated.timing()` / `Animated.spring()` |

---

## Required React Native Packages

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "@react-navigation/stack": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "@react-native-async-storage/async-storage": "^1.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-screens": "^3.x",
    "react-native-vector-icons": "^10.x",
    "react-native-paper": "^5.x",
    "react-native-image-picker": "^7.x",
    "react-native-push-notification": "^8.x",
    "react-native-haptic-feedback": "^2.x",
    "react-native-splash-screen": "^3.x",
    "react-native-toast-message": "^2.x"
  }
}
```

---

## File Structure for React Native

```
/src
  /navigation
    AppNavigator.js
    AuthNavigator.js
    MainTabNavigator.js
  /screens
    /auth
      LoginScreen.js
      SignupScreen.js
      ForgotPasswordScreen.js
    /main
      HomeScreen.js
      ChatScreen.js
      LibraryScreen.js
      DocumentsScreen.js
      CasesScreen.js
    /settings
      SettingsScreen.js
      ProfileEditScreen.js
  /components
    /common
      Header.js
      Card.js
      Button.js
    /chat
      ChatBubble.js
      ChatInput.js
  /hooks
    useBookmarks.js
    useNotifications.js
    useHaptics.js
  /services
    storage.js
    api.js
  /theme
    colors.js
    typography.js
  /utils
    helpers.js
```

---

## Quick Start Template

### App.js
```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens...

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Cases" component={CasesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

---

## Notes

1. **TypeScript → JavaScript**: Remove all type annotations, interfaces, and generic types
2. **Web APIs**: Replace `window`, `document`, `localStorage` with React Native equivalents
3. **CSS**: All Tailwind classes must be converted to StyleSheet objects
4. **Icons**: Replace lucide-react with react-native-vector-icons
5. **Forms**: Use react-hook-form works with RN, or use native controlled inputs

---

*Generated from AI Attorney v1.0 - Lovable Project*
