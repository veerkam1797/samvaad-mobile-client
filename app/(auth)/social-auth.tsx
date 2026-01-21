import CommonButton from '@/components/buttons/CommonButton';
import TextButton from '@/components/buttons/TextButton';
import TextTitle from '@/components/texts/TextTitle';
import { RADIUS, SPACING } from '@/constants/spacing';
import { api } from '@/convex/_generated/api';
import { useSSO, useUser } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import * as AuthSession from 'expo-auth-session';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SocialAuth() {
  useWarmUpBrowser();

  const {startSSOFlow} = useSSO();
  const {user} = useUser();
  const userRef = useRef(user);
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const waitForUser = useCallback(async (timeoutMs = 3000) => {
    const start = Date.now();
    while (!userRef.current && Date.now() - start < timeoutMs) {
      await new Promise(r => setTimeout(r, 100));
    }
    return userRef.current;
  }, []);

  const handleUserCreation = useCallback(
    async (userId: string) => {
      const u = await waitForUser(3000);
      if (u) {
        try {
          await createUser({
            clerkId: u.id,
            name: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
            email:
              u.primaryEmailAddress?.emailAddress ??
              (u.emailAddresses && u.emailAddresses[0]?.emailAddress) ??
              '',
            imageUrl: u.imageUrl,
            preferences: {
              preferredLanguage: 'en',
              needsBraille: false,
              needsISL: false,
            },
            createdAt: Date.now(),
          });
          if (__DEV__) {
            console.log('Created/Updated user in Convex for Clerk ID', u.id);
          }
        } catch (e) {
          if (__DEV__) {
            console.error('Error creating user in Convex', e);
          }
        }
      } else {
        if (__DEV__) {
          console.warn('Clerk user not available after sign-in');
        }
      }
    },
    [createUser, waitForUser],
  );

  // Google SSO handler
  const onGoogleSignInPress = useCallback(async () => {
    try {
      const {createdSessionId, setActive} = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: 'samvaad',
          path: '/(drawer)/index',
        }),
      });

      if (createdSessionId) {
        setActive!({session: createdSessionId});
        if (__DEV__) {
          console.log('Google Session Success');
        }
        await handleUserCreation(createdSessionId);
        router.replace('/(drawer)');
      } else {
        Alert.alert('Did not create a session');
        if (__DEV__) {
          console.log('Google Session Fail');
        }
      }
    } catch (err) {
      if (__DEV__) {
        console.error(JSON.stringify(err, null, 2));
      }
      Alert.alert('Error', (err as Error)?.message ?? String(err));
    }
  }, [startSSOFlow, handleUserCreation]);

  // Facebook SSO handler
  const onFacebookSignInPress = useCallback(async () => {
    try {
      const {createdSessionId, setActive} = await startSSOFlow({
        strategy: 'oauth_facebook',
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: 'samvaad',
          path: '/(drawer)/index',
        }),
      });

      if (createdSessionId) {
        setActive!({session: createdSessionId});
        if (__DEV__) {
          console.log('Facebook Session Success');
        }
        await handleUserCreation(createdSessionId);
        router.replace('/(drawer)');
      } else {
        Alert.alert('Did not create a session');
        if (__DEV__) {
          console.log('Facebook Session Fail');
        }
      }
    } catch (err) {
      if (__DEV__) {
        console.error(JSON.stringify(err, null, 2));
      }
      Alert.alert('Error', (err as Error)?.message ?? String(err));
    }
  }, [startSSOFlow, handleUserCreation]);

  const handleSignUp = useCallback(() => {
    router.push('/(auth)/sign-up');
  }, []);

  const handleSignIn = useCallback(() => {
    router.push('/(auth)/sign-in');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Social Auth Buttons */}
        <View style={styles.container}>
          <CommonButton
            mode="elevated"
            label="Continue with Google"
            onPress={onGoogleSignInPress}
            extraStyle={styles.authButton}
            extraLabelStyle={styles.authButtonLabel}
          />
          <CommonButton
            mode="elevated"
            label="Continue with Facebook"
            onPress={onFacebookSignInPress}
            extraStyle={styles.authButton}
            extraLabelStyle={styles.authButtonLabel}
          />
          <TextTitle
            variant="titleLarge"
            text="or"
            extraTextStyle={styles.orText}
          />
          <CommonButton
            mode="elevated"
            label="Create an account"
            onPress={handleSignUp}
            extraStyle={styles.authButton}
            extraLabelStyle={styles.authButtonLabel}
          />
        </View>
        {/* Go to Email Id Password based Sign In */}
        <View style={styles.signInRow}>
          <TextTitle
            variant="titleMedium"
            text="Already have an account? "
            extraTextStyle={styles.signInText}
          />
          <TextButton
            label="Sign in"
            onPress={handleSignIn}
            extraStyle={styles.signInButton}
            extraTextStyle={styles.signInButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: SPACING.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: SPACING.xs,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.md,
  },
  authButton: {
    padding: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  authButtonLabel: {
    fontSize: 18,
  },
  orText: {
    alignSelf: 'center',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  signInText: {
    fontFamily: 'InterRegular',
  },
  signInButton: {
    paddingVertical: 0,
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'InterSemiBold',
  },
});
