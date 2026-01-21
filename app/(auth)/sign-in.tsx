import CommonButton from '@/components/buttons/CommonButton';
import CommonIconButton from '@/components/buttons/CommonIconButton';
import CommonTextInput from '@/components/CommonTextInput';
import TextTitle from '@/components/texts/TextTitle';
import { SPACING } from '@/constants/spacing';
import { useSignIn } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const {signIn, setActive, isLoaded} = useSignIn();
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClose = useCallback(() => {
    router.replace('/(auth)/social-auth');
  }, []);

  const handleForgotPassword = useCallback(() => {
    router.push('/(auth)/password');
  }, []);

  // Email & Password Sign-In Handler
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({session: signInAttempt.createdSessionId});
        router.push('/(drawer)');
      } else {
        if (__DEV__) {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error(JSON.stringify(error, null, 2));
      }
      Alert.alert('Error', (error as Error)?.message ?? 'Sign in failed');
    }
  }, [isLoaded, emailAddress, password, signIn, setActive]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.topSection}>
          {/* Close Page Button */}
          <CommonIconButton
            mode={undefined}
            icon="close"
            iconSize={24}
            iconColor=""
            onPress={handleClose}
            extraStyle={styles.closeButton}
            contentStyle={{}}
          />
          <View style={styles.formContainer}>
            {/* Title */}
            <TextTitle
              variant="titleLarge"
              text="To get started, please enter your phone number or email & password"
              extraTextStyle={styles.title}
            />
            {/* Email Input */}
            <CommonTextInput
              label="Enter your email"
              placeholder="example@samvaad.com"
              value={emailAddress}
              autoCapitalize="none"
              secureText={false}
              onChangeText={setEmailAddress}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
            />
            {/* Password Input */}
            <CommonTextInput
              label="Enter your password"
              placeholder="Samvaad@123"
              value={password}
              autoCapitalize="none"
              secureText={true}
              onChangeText={setPassword}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
            />
          </View>
        </View>
        <View>
          <Divider bold />
          <View style={styles.bottomButtons}>
            {/* Forgot Password Button */}
            <CommonButton
              mode="outlined"
              label="Forgot Password ?"
              onPress={handleForgotPassword}
              extraStyle={{}}
              extraLabelStyle={{}}
            />
            {/* Sign In Button */}
            <CommonButton
              mode="contained"
              label="Sign In"
              onPress={onSignInPress}
              extraStyle={{}}
              extraLabelStyle={{}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: SPACING.xs,
    justifyContent: 'space-between',
  },
  topSection: {
    padding: SPACING.md,
  },
  closeButton: {
    marginLeft: 0,
  },
  formContainer: {
    gap: SPACING.md,
  },
  title: {
    alignSelf: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: SPACING.ms,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
});
