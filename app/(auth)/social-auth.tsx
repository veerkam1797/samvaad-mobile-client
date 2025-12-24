import CommonButton from '@/components/buttons/CommonButton';
import TextButton from '@/components/buttons/TextButton';
import TextTitle from '@/components/texts/TextTitle';
import { useSignIn, useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
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

export default function Login() {
  useWarmUpBrowser();
  const {signIn, setActive, isLoaded} = useSignIn();
  const {startSSOFlow} = useSSO();

  // Google SSO handler
  const onGoogleSignInPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const {createdSessionId, setActive, signIn, signUp} = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: 'mobileclient',
          path: Linking.createURL('/app/(drawer)/index.tsx'),
        }),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({session: createdSessionId});
        console.log(
          'Google Session Success ++++>',
          JSON.stringify(createdSessionId),
        );
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        Alert.alert('Did not create a session');
        console.log(
          'Google Session Fail ++++>',
          JSON.stringify(createdSessionId),
        );
        console.log('Google Session Fail ', createdSessionId);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message);
    }
  }, []);

  // Facebook SSO handler
  const onFacebookSignInPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const {createdSessionId, setActive, signIn, signUp} = await startSSOFlow({
        strategy: 'oauth_facebook',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: 'mobileclient',
          path: Linking.createURL('/app/(drawer)/index.tsx'),
        }),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({session: createdSessionId});
        console.log(
          'FB Session Success ++++>',
          JSON.stringify(createdSessionId),
        );
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        Alert.alert('Did not create a session');
        console.log('FB Session Fail ++++>', JSON.stringify(createdSessionId));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, gap: 4}}>
        {/* Social Auth Buttons */}
        <View style={styles.container}>
          <CommonButton
            mode="elevated"
            label="Continue with Google"
            onPress={onGoogleSignInPress}
            extraStyle={{padding: 8, borderRadius: 72 / 2}}
            extraLabelStyle={{fontSize: 18}}
          />
          <CommonButton
            mode="elevated"
            label="Continue with Facebook"
            onPress={onFacebookSignInPress}
            extraStyle={{padding: 8, borderRadius: 72 / 2}}
            extraLabelStyle={{fontSize: 18}}
          />
          <TextTitle
            variant="titleLarge"
            text="Or"
            extraTextStyle={{alignSelf: 'center'}}
          />
          <CommonButton
            mode="elevated"
            label="Create an account"
            onPress={() => router.push('/(auth)/sign-up')}
            extraStyle={{padding: 8, borderRadius: 72 / 2}}
            extraLabelStyle={{fontSize: 18}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}>
          <TextTitle
            variant="titleMedium"
            text="Already have an account? "
            extraTextStyle={{fontFamily: 'InterRegular'}}
          />
          <TextButton
            label="Sign in"
            onPress={() => router.push('/(auth)/sign-in')}
            extraStyle={{paddingVertical: 0}}
            extraTextStyle={{
              fontSize: 16,
              fontFamily: 'InterSemiBold',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
});
