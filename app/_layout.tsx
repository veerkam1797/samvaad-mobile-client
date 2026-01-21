import ErrorBoundary from '@/components/ErrorBoundary';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import merge from 'deepmerge';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from 'react';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import 'react-native-reanimated';

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

// Custom theme colors
const CustomLightColours = {...MD3LightTheme, colors: Colors.light};
const CustomDarkColours = {...MD3DarkTheme, colors: Colors.dark};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, CustomLightColours);
const CombinedDarkTheme = merge(DarkTheme, CustomDarkColours);

// Validate environment variables at module level
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

if (!CONVEX_URL) {
  throw new Error('Missing EXPO_PUBLIC_CONVEX_URL in your .env file');
}

// Create Convex client once at module level to prevent recreation on every render
const convex = new ConvexReactClient(CONVEX_URL);

export const unstable_settings = {
  anchor: '(drawer)',
};

const NavigationLayout = () => {
  const {isSignedIn = false} = useAuth();
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Protected guard={!isSignedIn}>
            <Stack.Screen name="(auth)/social-auth" />
            <Stack.Screen name="(auth)/sign-in" />
            <Stack.Screen name="(auth)/sign-up" />
            <Stack.Screen name="(auth)/password" />
          </Stack.Protected>
          <Stack.Protected guard={isSignedIn}>
            <Stack.Screen name="(drawer)" />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterBlack: require('../assets/fonts/inter_black.ttf'),
    InterBold: require('../assets/fonts/inter_bold.ttf'),
    InterExtrabold: require('../assets/fonts/inter_extrabold.ttf'),
    InterLight: require('../assets/fonts/inter_light.ttf'),
    InterMedium: require('../assets/fonts/inter_medium.ttf'),
    InterSemiBold: require('../assets/fonts/inter_semibold.ttf'),
    InterThin: require('../assets/fonts/inter_thin.ttf'),
    InterRegular: require('../assets/fonts/inter_regular.ttf'),
  });

  // Hide splash screen once fonts are loaded
  const onLayoutComplete = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutComplete();
  }, [onLayoutComplete]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        tokenCache={tokenCache}
        afterSignOutUrl={'/(auth)/social-auth'}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <NavigationLayout />
          </ConvexProviderWithClerk>
        </ClerkLoaded>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
