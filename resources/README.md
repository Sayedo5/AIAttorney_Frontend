# Native App Resources

This folder contains resources for generating native app icons and splash screens.

## Generating App Icons & Splash Screens

After running `npx cap add ios` and/or `npx cap add android`, you need to generate the proper icon sizes.

### Option 1: Using cordova-res (Recommended)

Install cordova-res globally:
```bash
npm install -g cordova-res
```

Then run:
```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

### Option 2: Manual Setup

#### iOS (in ios/App/App/Assets.xcassets/)
- AppIcon.appiconset: Copy app-icon.png and resize to required sizes
- Splash.imageset: Copy splash.png

#### Android (in android/app/src/main/res/)
- mipmap-hdpi, mipmap-mdpi, mipmap-xhdpi, mipmap-xxhdpi, mipmap-xxxhdpi: App icons at various sizes
- drawable: Splash screen images

## Source Files

- `/public/app-icon.png` - 1024x1024 app icon source
- `/public/splash.png` - 1284x1920 splash screen source

## Icon Sizes Reference

### iOS App Icons
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

### Android App Icons
- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192
