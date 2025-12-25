import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import 'react-native-reanimated';

const CustomLightColours = {...MD3LightTheme, colors: Colors.light};
const CustomDarkColours = {...MD3DarkTheme, colors: Colors.dark};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, CustomLightColours);
const CombinedDarkTheme = merge(DarkTheme, CustomDarkColours);

export const unstable_settings = {
  anchor: '(drawer)',
};
const NavigationLayout = () => {
  const {isSignedIn = false} = useAuth();
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? {...CombinedDarkTheme} : {...CombinedLightTheme};

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
        {/* <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} /> */}
      </ThemeProvider>
    </PaperProvider>
  );
};

export default function RootLayout() {
  const [loaded] = useFonts({
    InterBlack: require('../assets/fonts/inter_black.ttf'),
    InterBold: require('../assets/fonts/inter_bold.ttf'),
    InterExtrabold: require('../assets/fonts/inter_extrabold.ttf'),
    InterLight: require('../assets/fonts/inter_light.ttf'),
    InterMedium: require('../assets/fonts/inter_medium.ttf'),
    InterSemiBold: require('../assets/fonts/inter_semibold.ttf'),
    InterThin: require('../assets/fonts/inter_thin.ttf'),
    InterRegular: require('../assets/fonts/inter_regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <NavigationLayout />
    </ClerkProvider>
  );
}
