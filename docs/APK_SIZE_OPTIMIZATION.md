# APK Size Optimization Guide

Comprehensive strategies to reduce your React Native APK size for AI Attorney.

---

## Current Size Analysis

Typical React Native APK sizes:
- **Debug APK**: 50-100 MB (includes debugging tools)
- **Release APK**: 20-40 MB (optimized)
- **AAB (Android App Bundle)**: 15-25 MB (recommended for Play Store)

**Target**: Get your release APK under **25 MB** for optimal user downloads.

---

## 1. Build Configuration Optimizations

### 1.1 Enable ProGuard/R8 (CRITICAL)

Edit `android/app/build.gradle`:

```gradle
android {
    buildTypes {
        release {
            minifyEnabled true          // Enable code shrinking
            shrinkResources true        // Remove unused resources
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

**Expected savings**: 30-50% reduction

### 1.2 Enable Hermes Engine (CRITICAL)

Hermes is Facebook's JavaScript engine optimized for React Native.

Edit `android/gradle.properties`:

```properties
hermesEnabled=true
```

**Expected savings**: 20-30% reduction + faster startup

### 1.3 Use Android App Bundle (AAB)

Build AAB instead of APK for Play Store:

```bash
cd android
./gradlew bundleRelease
```

The AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

**Expected savings**: 40-60% smaller downloads (Google optimizes per device)

### 1.4 Enable Split APKs by ABI

Edit `android/app/build.gradle`:

```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
            universalApk false  // Don't generate universal APK
        }
    }
}
```

**Expected savings**: 50% per APK (device-specific builds)

---

## 2. Asset Optimization

### 2.1 Font Optimization (HIGH IMPACT)

Your current fonts folder has **14 font files**. Reduce to essentials:

**Keep only these 4-5 variants:**
```
app/assets/font/
├── Figtree-Regular.ttf      ← Required
├── Figtree-Medium.ttf       ← Required
├── Figtree-SemiBold.ttf     ← Required
├── Figtree-Bold.ttf         ← Required
└── Figtree-Light.ttf        ← Optional (remove if not used)
```

**Remove these (italic variants rarely used):**
- Figtree-BlackItalic.ttf
- Figtree-BoldItalic.ttf
- Figtree-ExtraBoldItalic.ttf
- Figtree-Italic.ttf
- Figtree-LightItalic.ttf
- Figtree-MediumItalic.ttf
- Figtree-SemiBoldItalic.ttf
- Figtree-Black.ttf (if not used)
- Figtree-ExtraBold.ttf (if not used)

**Font Subsetting (Advanced):**
Use [FontSquirrel](https://www.fontsquirrel.com/tools/webfont-generator) or `fonttools` to create subsets with only characters you need (English + Urdu).

**Expected savings**: 500KB - 2MB

### 2.2 SVG Optimization (HIGH IMPACT)

You have **100+ SVG icons**. Optimize them:

**Step 1: Run SVGO on all icons**

```bash
npm install -g svgo
svgo -f app/assets/icons --multipass --precision=2
```

**Step 2: Consolidate duplicate icons**

Many icons have green/white variants. Use a single SVG and tint it:

```typescript
// Instead of two SVG files:
import BookmarkGreen from '../icons/bookmark-green.svg';
import BookmarkWhite from '../icons/bookmark-white.svg';

// Use one SVG with dynamic color:
import Bookmark from '../icons/bookmark.svg';
<Bookmark fill={isActive ? '#0E8A6B' : '#FFFFFF'} />
```

**Step 3: Remove unused icons**

Audit and remove icons in these folders if not used:
- `toolbar2/` (duplicate of `toolbar/`?)
- `*.zip` files (remove from assets)
- Unused payment icons if payments not implemented

**Expected savings**: 200KB - 500KB

### 2.3 Image Optimization

**Compress PNGs:**
```bash
npm install -g pngquant
pngquant --quality=65-80 app/assets/*.png
```

**Use WebP format:**
Convert large PNGs to WebP (30-50% smaller):

```bash
# On macOS
brew install webp
cwebp -q 80 icon.png -o icon.webp
```

**Remove unused images:**
- `pdf-converter.html` - Do you need this?
- Duplicate logos (keep only one variant)

**Expected savings**: 100KB - 500KB

---

## 3. Dependency Optimization

### 3.1 Audit Dependencies

Run size analysis:

```bash
npx react-native-bundle-visualizer
```

### 3.2 Remove Heavy Unused Libraries

Common heavy libraries to audit:

| Library | Size | Alternative |
|---------|------|-------------|
| `moment.js` | 300KB+ | `date-fns` (tree-shakeable) |
| `lodash` | 500KB+ | `lodash-es` or native methods |
| Large UI libraries | Variable | Use specific imports |

### 3.3 Use Specific Imports

```typescript
// BAD: Imports entire library
import _ from 'lodash';
import * as Icons from 'lucide-react-native';

// GOOD: Tree-shakeable imports
import debounce from 'lodash/debounce';
import { Home, Search } from 'lucide-react-native';
```

### 3.4 Lazy Load Heavy Components

```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy screens
const EditorScreen = lazy(() => import('./screens/StackScreens/EditorScreen'));
const DocumentReviewScreen = lazy(() => import('./screens/StackScreens/DocumentReviewScreen'));

// Usage
<Suspense fallback={<LoadingScreen />}>
  <EditorScreen />
</Suspense>
```

---

## 4. Native Code Optimization

### 4.1 Remove Unused Native Modules

Check if these are actually used:
- Speech recognition modules (if not implemented)
- Unused Expo modules

In `app.json` (for Expo):
```json
{
  "expo": {
    "plugins": [
      // Only include plugins you actually use
    ]
  }
}
```

### 4.2 Strip Debug Symbols

Edit `android/app/build.gradle`:

```gradle
android {
    buildTypes {
        release {
            debuggable false
            jniDebuggable false
            renderscriptDebuggable false
        }
    }
    
    packagingOptions {
        exclude 'lib/x86/libc++_shared.so'
        exclude 'lib/x86_64/libc++_shared.so'
        // Keep only ARM for most devices
    }
}
```

---

## 5. Quick Wins Checklist

### Immediate Actions (Do First)

- [ ] Enable ProGuard (`minifyEnabled true`)
- [ ] Enable Hermes (`hermesEnabled=true`)
- [ ] Enable resource shrinking (`shrinkResources true`)
- [ ] Remove 9 unused font files (italic + extra weights)
- [ ] Delete `.zip` files from assets
- [ ] Run `svgo` on all SVG icons

### Medium Priority

- [ ] Consolidate green/white icon variants
- [ ] Compress PNG images with pngquant
- [ ] Convert large images to WebP
- [ ] Enable ABI splits in build.gradle
- [ ] Audit and remove unused npm packages

### Advanced (If Needed)

- [ ] Create font subsets for only needed characters
- [ ] Implement code splitting with lazy()
- [ ] Switch to Android App Bundle (AAB) for Play Store
- [ ] Profile with `react-native-bundle-visualizer`

---

## 6. Size Verification Commands

### Check APK Size

```bash
# Build release APK
cd android
./gradlew assembleRelease

# Check size
ls -lh app/build/outputs/apk/release/app-release.apk
```

### Analyze APK Contents

```bash
# Use Android Studio's APK Analyzer
# Or command line:
unzip -l app-release.apk | sort -k1 -n -r | head -20
```

### Compare Before/After

```bash
# Before optimization
ls -lh app-release.apk  # e.g., 45 MB

# After optimization
ls -lh app-release.apk  # Target: < 25 MB
```

---

## 7. Expected Results

| Optimization | Savings |
|--------------|---------|
| ProGuard + R8 | 30-50% |
| Hermes Engine | 20-30% |
| Font cleanup (14 → 5 files) | 500KB - 2MB |
| SVG optimization | 200-500KB |
| Image compression | 100-500KB |
| ABI splits | 50% per device |
| AAB vs APK | 40-60% |

**Realistic Target:**
- Before: 40-60 MB
- After: 15-25 MB (Release APK)
- Play Store: 10-18 MB (AAB download size)

---

## 8. Build Commands Summary

```bash
# Development build
npx react-native run-android

# Release APK (optimized)
cd android
./gradlew assembleRelease

# Release AAB (for Play Store)
cd android
./gradlew bundleRelease

# Clean build (if issues)
cd android
./gradlew clean
./gradlew assembleRelease
```

---

## 9. Troubleshooting

### ProGuard Breaking App

Add keep rules in `android/app/proguard-rules.pro`:

```proguard
# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# Gluestack UI
-keep class com.gluestack.** { *; }

# Your app's models
-keep class com.aiattorney.app.** { *; }
```

### Hermes Issues

If app crashes with Hermes:
```bash
cd android
./gradlew clean
cd ..
npx react-native start --reset-cache
```

### Missing Resources After Shrinking

Add to `android/app/src/main/res/raw/keep.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools"
    tools:keep="@drawable/*,@raw/*" />
```

---

*Guide for AI Attorney React Native App - APK Size Optimization*
