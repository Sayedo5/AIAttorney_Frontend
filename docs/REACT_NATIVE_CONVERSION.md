# AI Attorney - React Native Conversion Guide

This document provides a comprehensive mapping between the Lovable React web app and the React Native project structure.

---

## Project Overview

| Property | Web (Lovable) | React Native |
|----------|---------------|--------------|
| **App Name** | AI Attorney | AI Attorney |
| **Purpose** | Legal assistant for Pakistan advocates | Legal assistant for Pakistan advocates |
| **Stack** | React + TypeScript + Tailwind + Capacitor | React Native + TypeScript |
| **Package** | `app.lovable.511c2107c04949cea8713ebb967afe0e` | `com.aiattorney.app` |

---

## Project Structure Mapping

### Root Structure

```
React Native (app/)          ←→  Lovable (src/)
├── assets/                      public/ + src/assets/
├── components/                  src/components/
├── config/                      (inline or env)
├── contexts/                    src/contexts/
├── navigations/                 src/pages/Index.tsx (state-based)
├── screens/                     src/screens/
├── services/                    src/hooks/ (API logic)
├── types/                       (inline TypeScript)
└── utils/                       src/lib/
```

---

## Screens Mapping (Web → React Native)

### Authentication Screens (screens/MainScreens/)

| Lovable Screen | React Native File | Notes |
|----------------|-------------------|-------|
| `LoginScreen.tsx` | `MainScreens/LoginScreen.tsx` | ✅ Same name |
| `SignupScreen.tsx` | `MainScreens/SignUpScreen.tsx` | Case difference |
| `ForgotPasswordScreen.tsx` | `MainScreens/ForgotPasswordScreen.tsx` | ✅ Same |
| `SplashScreen.tsx` | `MainScreens/SplashScreen.tsx` | ✅ Same |
| *(new)* | `MainScreens/OtpVerificationScreen.tsx` | OTP flow |
| *(new)* | `MainScreens/ResetPasswordScreen.tsx` | Reset flow |

### Tab Screens (screens/tabScreens/)

| Lovable Screen | React Native File | Notes |
|----------------|-------------------|-------|
| `HomeScreen.tsx` → | Combined into tab screens | Different approach |
| `ChatScreen.tsx` | `tabScreens/ChatScreen.tsx` | ✅ Same |
| `LibraryScreen.tsx` | `tabScreens/LibraryScreen.tsx` | ✅ Same |
| `DocumentsScreen.tsx` | `tabScreens/DocumentScreen.tsx` | Renamed |
| `CasesScreen.tsx` | `tabScreens/DiaryScreen.tsx` | Renamed to Diary |
| *(new)* | `tabScreens/CauseListScreen.tsx` | New feature |

### Stack Screens (screens/StackScreens/)

| Lovable Screen | React Native File | Notes |
|----------------|-------------------|-------|
| `DrafterScreen.tsx` | `StackScreens/Drafter.tsx` | Shortened |
| `BookmarkedCasesScreen.tsx` | `StackScreens/BookmarkScreen.tsx` | Shortened |
| `SettingsScreen.tsx` | → Drawer/Settings | Different pattern |
| `ProfileEditScreen.tsx` | `StackScreens/UserInfoScreen.tsx` | Renamed |
| `PricingScreen.tsx` | `StackScreens/UpgradePlanScreen.tsx` | Renamed |
| `FeedbackScreen.tsx` | `StackScreens/FeedbackScreen.tsx` | ✅ Same |
| `TermsOfServiceScreen.tsx` | `StackScreens/TermsAndConditionsScreen.tsx` | Renamed |
| `ContactScreen.tsx` | `StackScreens/HelpCenterScreen.tsx` | Renamed |
| *(new)* | `StackScreens/ActsScreen.tsx` | Acts listing |
| *(new)* | `StackScreens/ActsDetailScreen.tsx` | Acts detail |
| *(new)* | `StackScreens/CodesScreen.tsx` | Codes listing |
| *(new)* | `StackScreens/CodesDetailsScreen.tsx` | Codes detail |
| *(new)* | `StackScreens/CaseDetailScreen.tsx` | Case details |
| *(new)* | `StackScreens/CauseListDetails.tsx` | Cause list details |
| *(new)* | `StackScreens/DiaryCaseDetailScreen.tsx` | Diary case |
| *(new)* | `StackScreens/DocumentReviewScreen.tsx` | Doc review |
| *(new)* | `StackScreens/EditorScreen.tsx` | Document editor |
| *(new)* | `StackScreens/CalendarScreen.tsx` | Calendar view |
| *(new)* | `StackScreens/PaymentScreen.tsx` | Payments |
| *(new)* | `StackScreens/MyCasesScreen.tsx` | My cases |
| *(new)* | `StackScreens/PrivacyPolicyScreen.tsx` | Privacy |
| *(new)* | `StackScreens/DrafterBookmarkScreen.tsx` | Saved drafts |
| *(new)* | `StackScreens/IslHighCourtScreen.tsx` | Islamabad HC |
| *(new)* | `StackScreens/LahHighCourtScreen.tsx` | Lahore HC |
| *(new)* | `StackScreens/PeshHighCourtScreen.tsx` | Peshawar HC |
| *(new)* | `StackScreens/SinHighCourtScreen.tsx` | Sindh HC |
| *(new)* | `StackScreens/KpLawsScreen.tsx` | KP Laws |
| *(new)* | `StackScreens/KpLawsDetailScreen.tsx` | KP Laws detail |

---

## Components Mapping

### Chat Components

| Lovable | React Native | Notes |
|---------|--------------|-------|
| `components/chat/ChatBubble.tsx` | `components/chats/MessageItem.tsx` | Renamed |
| `components/chat/ChatInput.tsx` | `components/chats/ChatInput.tsx` | ✅ Same |
| *(new)* | `components/chats/ChatHeader.tsx` | Header component |
| *(new)* | `components/chats/ChatMessages.tsx` | Messages list |
| *(new)* | `components/chats/EmptyChatView.tsx` | Empty state |
| *(new)* | `components/chats/SuggestionChips.tsx` | AI suggestions |
| *(new)* | `components/chats/VoiceRecorder.tsx` | Voice input |
| *(new)* | `components/chats/VoiceRecorderRealtime.tsx` | Realtime voice |
| *(new)* | `components/chats/VoiceRecorderSpeechmatics.tsx` | Speechmatics |
| *(new)* | `components/chats/AnimatedBackground.tsx` | Background FX |
| *(new)* | `components/chats/LoadingScreen.tsx` | Loading state |

### Navigation Components

| Lovable | React Native | Notes |
|---------|--------------|-------|
| `components/navigation/BottomNav.tsx` | Built into `navigations/AppNavigator.tsx` | Tab Navigator |
| `components/navigation/Header.tsx` | Screen-specific headers | Different pattern |
| `components/navigation/ProfileDropdown.tsx` | Drawer navigation | Different pattern |

### Document Components

| Lovable | React Native | Notes |
|---------|--------------|-------|
| *(basic)* | `components/documentReview/DocumentCard.tsx` | Card component |
| *(basic)* | `components/documentReview/DocumentsList.tsx` | List component |
| *(basic)* | `components/documentReview/DocumentUpload.tsx` | Upload UI |
| *(basic)* | `components/documentReview/DocumentReviewHeader.tsx` | Header |
| *(new)* | `components/documentReview/AnimatedDocumentBackground.tsx` | Background |

### Editor Components

| Lovable | React Native | Notes |
|---------|--------------|-------|
| *(new)* | `components/editorScreen/EditorWebView.tsx` | Rich text editor |
| *(new)* | `components/editorScreen/EditorToolbar.tsx` | Formatting toolbar |
| *(new)* | `components/editorScreen/EditorHeader.tsx` | Editor header |
| *(new)* | `components/editorScreen/ChatInterface.tsx` | AI assistance |
| *(new)* | `components/editorScreen/VersionDrawer.tsx` | Version history |
| *(new)* | `components/editorScreen/VersionHeader.tsx` | Version header |
| *(new)* | `components/editorScreen/Modals/*.tsx` | Various modals |

### UI Elements

| Lovable (shadcn) | React Native | Notes |
|------------------|--------------|-------|
| `components/ui/button.tsx` | Custom or `GradientButton.tsx` | Styled buttons |
| `components/ui/card.tsx` | `elements/CaseCard.tsx` | Case cards |
| `components/ui/dialog.tsx` | `elements/*.Modal.tsx` | Modal dialogs |
| `components/ui/input.tsx` | `elements/SearchBar.tsx` | Input fields |
| `components/ui/select.tsx` | `ui/select-actionsheet.tsx` | ActionSheet select |
| `components/ui/checkbox.tsx` | `ui/checkbox.tsx` | Checkbox |
| `components/ui/toast.tsx` | `elements/NotificationToast.tsx` | Toast notifications |
| *(new)* | `elements/FilterMenu.tsx` | Filter dropdown |
| *(new)* | `elements/FilterChips.tsx` | Filter chips |
| *(new)* | `elements/Pagination.tsx` | Pagination |
| *(new)* | `elements/CategoryToggle.tsx` | Category switcher |
| *(new)* | `elements/RegionSelector.tsx` | Region picker |
| *(new)* | `elements/GradientBorderView.tsx` | Gradient borders |
| *(new)* | `elements/DocumentViewer.tsx` | PDF viewer |
| *(new)* | `elements/DocumentPreviewModal.tsx` | Doc preview |
| *(new)* | `elements/SessionExpiredModal.tsx` | Session handling |
| *(new)* | `elements/NoInternetModal.tsx` | Offline handling |
| *(new)* | `elements/UpgradePlanModal.tsx` | Upgrade prompts |
| *(new)* | `elements/PasswordModal.tsx` | Password input |
| *(new)* | `elements/AccessDeniedScreen.tsx` | Access denied |

### Drawer Components

| Lovable | React Native | Notes |
|---------|--------------|-------|
| *(sheets)* | `drawerComponents/ChatDrawer.tsx` | Chat history drawer |
| *(sheets)* | `drawerComponents/LibraryDrawer.tsx` | Library drawer |
| *(sheets)* | `drawerComponents/DrafterDrawer.tsx` | Drafter drawer |
| *(sheets)* | `drawerComponents/CauseListDrawer.tsx` | Cause list drawer |
| *(sheets)* | `drawerComponents/DocumentReviewDrawer.tsx` | Doc review drawer |
| *(sheets)* | `drawerComponents/CaseDiaryDrawerContent.tsx` | Diary drawer |
| *(sheets)* | `drawerComponents/DrawerBottom.tsx` | Bottom drawer |
| *(sheets)* | `drawerComponents/DrawerRender.tsx` | Drawer renderer |

---

## Contexts Mapping

| Lovable | React Native | Notes |
|---------|--------------|-------|
| `contexts/LanguageContext.tsx` | *(not implemented)* | Multi-language |
| *(new)* | `contexts/AuthContext.tsx` | Authentication state |
| *(new)* | `contexts/ThemeContext.tsx` | Theme management |
| *(new)* | `contexts/ChatContext.tsx` | Chat state |
| *(new)* | `contexts/DiaryContext.tsx` | Diary state |
| *(new)* | `contexts/DrafterContext.tsx` | Drafter state |
| *(new)* | `contexts/CauseListContext.tsx` | Cause list state |
| *(new)* | `contexts/DocumentReviewContext.tsx` | Doc review state |
| *(new)* | `contexts/FeatureAccessContext.tsx` | Feature gates |
| *(new)* | `contexts/FeatureLimitContext.tsx` | Usage limits |
| *(new)* | `contexts/InternetConnectivityContext.tsx` | Network state |
| *(new)* | `contexts/CustomAlertContext.tsx` | Alert dialogs |
| *(new)* | `contexts/userInfoContext.tsx` | User profile |
| *(new)* | `contexts/caseDrawerContext.tsx` | Case drawer |
| *(new)* | `contexts/ThemedIcon.tsx` | Themed icons |

---

## Hooks Mapping

| Lovable Hook | React Native Hook | Notes |
|--------------|-------------------|-------|
| `hooks/useBookmarks.ts` | Context-based | In DrafterContext |
| `hooks/useReminderSettings.ts` | Context-based | In DiaryContext |
| `hooks/useLocalNotifications.ts` | Native notifications | Expo/RN notifications |
| `hooks/useHaptics.ts` | `expo-haptics` | Native haptics |
| `hooks/useCamera.ts` | `expo-image-picker` | Native camera |
| `hooks/useSplashScreen.ts` | `expo-splash-screen` | Native splash |
| `hooks/useChatHistory.ts` | `hooks/useChat.ts` | Chat management |
| `hooks/useSearchHistory.ts` | *(API-based)* | Server search |
| `hooks/useVoiceRecording.ts` | `hooks/useChatScreen.tsx` | Voice in chat |
| *(new)* | `hooks/useSSEChat.ts` | SSE streaming |
| *(new)* | `hooks/useDocumentReviewScreen.ts` | Doc review logic |
| *(new)* | `hooks/useEditorState.tsx` | Editor state |
| *(new)* | `hooks/useVersions.ts` | Version control |

---

## API Services

| Lovable | React Native | Notes |
|---------|--------------|-------|
| *(localStorage)* | `apis/api.ts` | Base API client |
| *(mock)* | `apis/chatApi.ts` | Chat endpoints |
| *(mock)* | `apis/diaryApi.ts` | Diary endpoints |
| *(mock)* | `apis/documentApi.ts` | Document endpoints |
| *(mock)* | `apis/documentReviewApi.ts` | Doc review API |
| *(mock)* | `apis/drafterApi.ts` | Drafter endpoints |
| *(mock)* | `apis/feedbackApi.ts` | Feedback API |
| *(mock)* | `apis/planApi.ts` | Plans/pricing API |
| *(mock)* | `apis/shareCaseApi.ts` | Case sharing API |
| *(new)* | `apis/speechmaticsApi.ts` | Speech-to-text |
| *(new)* | `apis/speechmaticsRealtimeApi.ts` | Realtime STT |
| *(new)* | `apis/typesense/caseLibrary.ts` | Case search |
| *(new)* | `apis/typesense/causeList.ts` | Cause list search |

---

## Assets Mapping

### Icons Structure

```
React Native: app/assets/icons/
├── active/          # Active tab bar icons (green)
├── blur/            # Inactive tab bar icons (gray)
├── back/            # Back navigation icons
├── bookmark/        # Bookmark icons
├── bookmark-fill/   # Filled bookmark icons
├── copy/            # Copy icons
├── delete/          # Delete icons
├── edit/            # Edit icons
├── eye-icon/        # Password visibility
├── filter/          # Filter icons
├── mic/             # Microphone icons
├── search/          # Search icons
├── send/            # Send message icons
├── toolbar/         # Rich text editor toolbar
├── toolbar2/        # Additional toolbar icons
└── [feature]/       # Feature-specific icons
```

### Lovable Icon Migration

Replace `lucide-react` icons with SVG imports:

```typescript
// Lovable (lucide-react)
import { Home, MessageSquare, Library, FileText, Calendar } from 'lucide-react';

// React Native (custom SVGs)
import HomeIcon from '../assets/icons/active/chat_bar.svg';
import LibraryIcon from '../assets/icons/active/library_bar.svg';
import DiaryIcon from '../assets/icons/active/diary_bar.svg';
import DocumentIcon from '../assets/icons/active/doc_bar.svg';
import CauseListIcon from '../assets/icons/active/causelist_bar.svg';
```

### Fonts

Custom Figtree font family in React Native:

```typescript
// app/components/others/FontLoader.tsx
const fonts = {
  'Figtree-Regular': require('../assets/font/Figtree-Regular.ttf'),
  'Figtree-Medium': require('../assets/font/Figtree-Medium.ttf'),
  'Figtree-SemiBold': require('../assets/font/Figtree-SemiBold.ttf'),
  'Figtree-Bold': require('../assets/font/Figtree-Bold.ttf'),
  'Figtree-Light': require('../assets/font/Figtree-Light.ttf'),
};
```

---

## Navigation Structure

### React Native Navigation (navigations/AppNavigator.tsx)

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator (5 main tabs)
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Document" component={DocumentScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="CauseList" component={CauseListScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator (nested screens)
function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Auth Stack */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      
      {/* Main Tabs */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      
      {/* Stack Screens */}
      <Stack.Screen name="CaseDetail" component={CaseDetailScreen} />
      <Stack.Screen name="ActsScreen" component={ActsScreen} />
      <Stack.Screen name="ActsDetail" component={ActsDetailScreen} />
      <Stack.Screen name="CodesScreen" component={CodesScreen} />
      <Stack.Screen name="CodesDetail" component={CodesDetailsScreen} />
      <Stack.Screen name="Drafter" component={DrafterScreen} />
      <Stack.Screen name="Editor" component={EditorScreen} />
      <Stack.Screen name="DocumentReview" component={DocumentReviewScreen} />
      <Stack.Screen name="Bookmark" component={BookmarkScreen} />
      <Stack.Screen name="DrafterBookmark" component={DrafterBookmarkScreen} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
      <Stack.Screen name="UpgradePlan" component={UpgradePlanScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="MyCases" component={MyCasesScreen} />
      <Stack.Screen name="DiaryCaseDetail" component={DiaryCaseDetailScreen} />
      <Stack.Screen name="CauseListDetails" component={CauseListDetailsScreen} />
      {/* High Court Screens */}
      <Stack.Screen name="IslHighCourt" component={IslHighCourtScreen} />
      <Stack.Screen name="LahHighCourt" component={LahHighCourtScreen} />
      <Stack.Screen name="PeshHighCourt" component={PeshHighCourtScreen} />
      <Stack.Screen name="SinHighCourt" component={SinHighCourtScreen} />
      <Stack.Screen name="KpLaws" component={KpLawsScreen} />
      <Stack.Screen name="KpLawsDetail" component={KpLawsDetailScreen} />
    </Stack.Navigator>
  );
}
```

---

## Theme & Styling

### Color Palette (components/utils/theme.ts)

```typescript
export const colors = {
  // Primary
  primary: '#0E8A6B',
  primaryLight: '#10A37F',
  primaryDark: '#0A7058',
  
  // Background
  background: '#0D0F12',
  backgroundSecondary: '#141820',
  backgroundTertiary: '#1A1F2C',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8E9196',
  textMuted: '#6B7280',
  
  // Borders
  border: '#2A2F3C',
  borderLight: '#374151',
  
  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Cards
  cardBackground: '#141820',
  cardBorder: '#2A2F3C',
};
```

### Typography

```typescript
export const typography = {
  fontFamily: {
    regular: 'Figtree-Regular',
    medium: 'Figtree-Medium',
    semiBold: 'Figtree-SemiBold',
    bold: 'Figtree-Bold',
    light: 'Figtree-Light',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
};
```

---

## Required React Native Dependencies

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "@react-navigation/native-stack": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "@react-native-async-storage/async-storage": "^1.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-screens": "^3.x",
    "react-native-svg": "^15.x",
    "react-native-svg-transformer": "^1.x",
    "react-native-webview": "^13.x",
    "@gluestack-ui/themed": "^1.x",
    "expo-haptics": "^12.x",
    "expo-image-picker": "^14.x",
    "expo-document-picker": "^11.x",
    "expo-file-system": "^16.x",
    "expo-sharing": "^11.x",
    "expo-splash-screen": "^0.x",
    "expo-font": "^11.x",
    "expo-notifications": "^0.x",
    "react-native-toast-message": "^2.x",
    "axios": "^1.x",
    "date-fns": "^3.x"
  }
}
```

---

## Key Differences Summary

| Aspect | Lovable (Web) | React Native |
|--------|---------------|--------------|
| **Navigation** | State-based in Index.tsx | React Navigation |
| **Styling** | Tailwind CSS classes | StyleSheet objects |
| **Icons** | lucide-react | SVG imports |
| **Storage** | localStorage | AsyncStorage |
| **HTTP** | fetch | axios |
| **Animations** | framer-motion | react-native-reanimated |
| **Forms** | react-hook-form | react-hook-form (same) |
| **Haptics** | @capacitor/haptics | expo-haptics |
| **Camera** | @capacitor/camera | expo-image-picker |
| **Fonts** | Google Fonts CDN | expo-font + local TTF |
| **Rich Text** | *(basic)* | WebView + Quill.js |
| **Speech** | *(mock)* | Speechmatics API |
| **Search** | fuzzySearch.ts | Typesense API |

---

*Generated from AI Attorney - Lovable + React Native Projects*
