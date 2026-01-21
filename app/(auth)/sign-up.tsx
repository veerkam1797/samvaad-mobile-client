import CommonButton from '@/components/buttons/CommonButton';
import CommonIconButton from '@/components/buttons/CommonIconButton';
import CommonTextInput from '@/components/CommonTextInput';
import TextTitle from '@/components/texts/TextTitle';
import { SPACING } from '@/constants/spacing';
import { api } from '@/convex/_generated/api';
import { useSignUp } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const {isLoaded, signUp, setActive} = useSignUp();
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState('');

  const createUser = useMutation(api.users.createUser);

  const handleClose = useCallback(() => {
    router.replace('/(auth)/social-auth');
  }, []);

  const onSignUpPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: emailAddress,
        password,
        firstName: firstname,
        lastName: lastname,
        username: username,
      });

      await signUp.prepareEmailAddressVerification({strategy: 'email_code'});
      setPendingVerification(true);
    } catch (err) {
      if (__DEV__) {
        console.error(JSON.stringify(err, null, 2));
      }
      Alert.alert('Error', (err as Error)?.message ?? 'Sign up failed');
    }
  }, [isLoaded, signUp, emailAddress, password, firstname, lastname, username]);

  const onVerifyPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({session: signUpAttempt.createdSessionId});
        const ID = signUpAttempt.createdUserId;

        await createUser({
          email: emailAddress,
          clerkId: ID!.toString(),
          name: `${firstname} ${lastname}`.trim(),
          preferences: {
            preferredLanguage: 'en',
            needsBraille: false,
            needsISL: false,
          },
          createdAt: Date.now(),
        });

        router.replace('/(drawer)');
      } else {
        if (__DEV__) {
          console.error(JSON.stringify(signUpAttempt, null, 2));
        }
      }
    } catch (err) {
      if (__DEV__) {
        console.error(JSON.stringify(err, null, 2));
      }
      Alert.alert('Error', (err as Error)?.message ?? 'Verification failed');
    }
  }, [
    isLoaded,
    signUp,
    code,
    setActive,
    createUser,
    emailAddress,
    firstname,
    lastname,
  ]);

  if (pendingVerification) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.verificationContainer}>
          <Text variant="headlineMedium" style={styles.verificationTitle}>
            Verify your email
          </Text>
          <CommonTextInput
            label="Enter Verification Code"
            placeholder="XXXXXXXX"
            value={code}
            autoCapitalize="none"
            secureText={false}
            onChangeText={setCode}
            dense={false}
            extraStyle={{}}
            onPress={() => {}}
            outlineStyle={{}}
          />
          <CommonButton
            mode="contained"
            label="Verify"
            onPress={onVerifyPress}
            extraLabelStyle={{}}
            extraStyle={{}}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Close Page Button */}
        <CommonIconButton
          mode="contained"
          icon="close"
          iconSize={24}
          iconColor=""
          onPress={handleClose}
          extraStyle={{}}
          contentStyle={{}}
        />
        <View style={styles.formSection}>
          {/* Title */}
          <TextTitle
            variant="titleLarge"
            text="To get started, please enter your name, email & password"
            extraTextStyle={styles.title}
          />
          <View style={styles.inputsContainer}>
            {/* First Name Input */}
            <CommonTextInput
              label="Enter firstname"
              placeholder="Case"
              value={firstname}
              autoCapitalize="words"
              secureText={false}
              onChangeText={setFirstname}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
            />
            {/* Last Name Input */}
            <CommonTextInput
              label="Enter lastname"
              placeholder="Walker"
              value={lastname}
              autoCapitalize="words"
              secureText={false}
              onChangeText={setLastname}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
            />
            {/* Username Input */}
            <CommonTextInput
              label="Enter username"
              placeholder="example_123"
              value={username}
              autoCapitalize="none"
              secureText={false}
              onChangeText={setUsername}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
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
          <CommonButton
            mode="contained"
            label="Sign Up"
            onPress={onSignUpPress}
            extraLabelStyle={{}}
            extraStyle={{}}
          />
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
  },
  formSection: {
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  title: {
    alignSelf: 'center',
  },
  inputsContainer: {
    gap: SPACING.sm,
  },
  verificationContainer: {
    flex: 1,
    padding: SPACING.md,
    gap: SPACING.md,
    justifyContent: 'center',
  },
  verificationTitle: {
    textAlign: 'center',
    fontFamily: 'InterBold',
  },
});
