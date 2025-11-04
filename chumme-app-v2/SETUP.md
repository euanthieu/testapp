# React Native Expo Project Setup Guide

This guide will help you set up and run the React Native Expo project successfully.

## 📋 Prerequisites

### Required Software Versions

- **Node.js**: >= 18.x
- **Java**: JDK 17 (Required for Android Gradle Plugin 8.7.0)
- **Android Studio**: Latest version
- **Git**: Latest version

### Android SDK Requirements

- Android SDK Platform 35
- Android SDK Build-Tools 35.0.0
- Android SDK Platform-Tools (latest)
- Android Emulator or physical device

## 🔧 Current Working Configuration

### Package Versions (Working Setup)

```json
{
  "react-native": "0.75.3",
  "expo": "~51.0.31",
  "react-native-gesture-handler": "~2.18.1",
  "react-native-screens": "~3.32.0",
  "@react-native-community/datetimepicker": "8.0.1",
  "react": "18.3.1"
}
```

### Android Configuration

```gradle
compileSdkVersion = 35
targetSdkVersion = 34
buildToolsVersion = "35.0.0"
Android Gradle Plugin = "8.7.0"
Gradle Wrapper = "8.9"
Kotlin = "1.9.24"
JVM Target = "17"
```

## 🚀 Setup Instructions

### Step 1: Environment Setup

#### Install Node.js 18+

```bash
# Check current version
node --version

# Should output v18.x or higher
```

#### Install Java JDK 17

```bash
# Check Java version
java -version

# Should output version 17.x
# Set JAVA_HOME environment variable to JDK 17 path
```

#### Android Studio Setup

1. Download and install Android Studio
2. Open SDK Manager (Tools → SDK Manager)
3. Install required SDK components:
   - Android SDK Platform 35
   - Android SDK Build-Tools 35.0.0
   - Android SDK Platform-Tools

### Step 2: Project Setup

#### Clone and Install Dependencies

```bash
# 1. Clone the repository (if not already cloned)
git clone <repository-url>
cd chumme-app-v2

# 2. Switch to the correct branch
git checkout migrateexpo

# 3. Remove existing installations
rm -rf node_modules
rm package-lock.json  # Windows: del package-lock.json

# 4. Install dependencies with legacy peer deps
npm install --legacy-peer-deps
```

#### Clear Gradle Cache

```bash
# Windows (PowerShell)
Remove-Item -Path "$env:USERPROFILE\.gradle\caches" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:USERPROFILE\.gradle\daemon" -Recurse -Force -ErrorAction SilentlyContinue

# macOS/Linux
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/daemon
```

### Step 3: Environment Variables

#### Windows

```powershell
# Set in PowerShell or add to system environment variables
$env:ANDROID_HOME = "C:\Users\My Computer\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:NODE_ENV = "development"
```

#### macOS/Linux

```bash
# Add to ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export JAVA_HOME=/path/to/jdk17
export NODE_ENV=development
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Step 4: Run the Project

```bash
# Method 1: Using Expo CLI (Recommended)
npx expo run:android

# Method 2: Using React Native CLI
npm run android

# Method 3: Direct Gradle build
cd android
./gradlew app:assembleDebug  # Windows: gradlew.bat app:assembleDebug
```

## 🔧 Alternative Compatible Configurations

If you encounter issues with the current setup, try these alternative configurations:

### Option A: More Conservative (Stable)

```json
{
  "react-native": "0.74.5",
  "expo": "~50.0.0",
  "react-native-gesture-handler": "~2.16.2",
  "react-native-screens": "~3.31.1",
  "@react-native-community/datetimepicker": "7.6.3"
}
```

**Android Configuration for Option A:**

```gradle
compileSdkVersion = 34
Android Gradle Plugin = "8.5.0"
Gradle Wrapper = "8.8"
```

### Option B: Latest Stable

```json
{
  "react-native": "0.75.4",
  "expo": "~51.0.0",
  "react-native-gesture-handler": "~2.19.0",
  "react-native-screens": "~3.34.0"
}
```

## 🛠 Troubleshooting

### Common Issues and Solutions

| Issue                         | Symptoms                                         | Solution                                               |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| **JVM Target Mismatch**       | `Inconsistent JVM-target compatibility detected` | Install JDK 17 and set as JAVA_HOME                    |
| **Gradle Cache Corruption**   | `Could not read workspace metadata`              | Clear `~/.gradle/caches` directory                     |
| **Patches Not Applied**       | Kotlin compilation errors                        | Run `npx patch-package` after npm install              |
| **SDK Not Found**             | `Android SDK not found`                          | Install Android SDK 35 in Android Studio               |
| **Node Version Issues**       | Build failures, dependency errors                | Use Node.js 18+                                        |
| **Package Declaration Error** | `Expecting a top level declaration`              | Ensure `package` comes before `import` in Kotlin files |

### Troubleshooting Commands

```bash
# Clean everything
npm run clean  # or manually:
rm -rf node_modules package-lock.json
cd android && ./gradlew clean && cd ..

# Reset Metro cache
npx react-native start --reset-cache

# Reinstall with patches
npm install --legacy-peer-deps
npx patch-package

# Check environment
node --version
java -version
echo $ANDROID_HOME  # Windows: echo $env:ANDROID_HOME
```

### Build Process Debugging

```bash
# Run with verbose logging
npx expo run:android --verbose

# Build APK directly
cd android
./gradlew assembleDebug --stacktrace --info

# Check Gradle dependencies
./gradlew app:dependencies
```

## 📁 Critical Files

Ensure these files are correctly configured:

### Essential Configuration Files

- `package.json` - Dependencies and scripts
- `android/build.gradle` - Android build configuration
- `android/gradle/wrapper/gradle-wrapper.properties` - Gradle version
- `android/app/src/main/java/com/tikto/MainActivity.kt` - Main activity
- `android/app/src/main/java/com/tikto/MainApplication.kt` - Application class
- `patches/expo-modules-core+1.12.26.patch` - Expo fixes
- `patches/react-native-screens+3.32.0.patch` - Navigation fixes

### Patches Applied

The project includes patches for:

- `expo-modules-core`: Fixes Kotlin null safety issues
- `react-native-screens`: Fixes StateWrapper null safety
- `react-native-countdown-component`: Custom modifications

## 🎯 Quick Setup Script

Create and run this script for automated setup:

### Windows (setup.bat)

```batch
@echo off
echo Setting up React Native Expo project...

REM Clean install
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

REM Install dependencies
npm install --legacy-peer-deps

REM Clear gradle cache
rmdir /s /q "%USERPROFILE%\.gradle\caches" 2>nul
rmdir /s /q "%USERPROFILE%\.gradle\daemon" 2>nul

REM Apply patches
npx patch-package

REM Set environment and build
set NODE_ENV=development
npx expo run:android

echo Setup complete!
```

### macOS/Linux (setup.sh)

```bash
#!/bin/bash
echo "Setting up React Native Expo project..."

# Clean install
rm -rf node_modules package-lock.json

# Install dependencies
npm install --legacy-peer-deps

# Clear gradle cache
rm -rf ~/.gradle/caches ~/.gradle/daemon

# Apply patches
npx patch-package

# Set environment and build
export NODE_ENV=development
npx expo run:android

echo "Setup complete!"
```

## 🔍 Verification Checklist

Before running the project, verify:

- [ ] Node.js version >= 18
- [ ] Java JDK 17 installed and set as JAVA_HOME
- [ ] Android SDK 35 installed
- [ ] Environment variables set correctly
- [ ] Dependencies installed with `--legacy-peer-deps`
- [ ] Gradle cache cleared
- [ ] Patches applied successfully
- [ ] Android emulator running or device connected

## 📞 Support

If you encounter issues not covered in this guide:

1. Check the error logs carefully
2. Ensure all versions match exactly
3. Try the alternative configurations
4. Clear all caches and reinstall
5. Verify environment variables are set correctly

## 🔄 Updates

When updating the project:

1. Always run `npm install --legacy-peer-deps`
2. Apply patches with `npx patch-package`
3. Clear Gradle cache if build issues occur
4. Test on both development and production builds

---

**Last Updated**: November 3, 2025  
**Working Configuration Verified**: ✅  
**Team Members**: Please follow this guide exactly for consistent development environment.
