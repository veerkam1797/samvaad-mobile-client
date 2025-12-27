import CommonButton from '@/components/buttons/CommonButton';
import { CommonIconButton } from '@/components/buttons/CommonIconButton';
import CommonTextInput from '@/components/CommonTextInput';
import TextTitle from '@/components/texts/TextTitle';
import { api } from '@/convex/_generated/api';
import { useSignUp } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: emailAddress,
        password,
        firstName: firstname,
        lastName: lastname,
        username: username,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', JSON.stringify(err.message));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({session: signUpAttempt.createdSessionId});
        const ID = signUpAttempt.createdUserId;
        createUser({
          email: emailAddress,
          password: password,
          username: username,
          first_name: firstname,
          last_name: lastname,
          clerkId: ID!.toString(),
        });
        router.replace('/(drawer)');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaProvider>
        <Text>Verify your email</Text>
        {/* Verification Code Input */}
        <CommonTextInput
          label="Enter Verification Code"
          placeholder="XXXXXXXX"
          value={code}
          autoCapitalize="none"
          secureText={true}
          onChangeText={input => setCode(input)}
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
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 4,
          // justifyContent: 'space-between',
        }}>
        {/* Close Page Button */}
        <CommonIconButton
          mode="contained"
          icon="close"
          iconSize={24}
          iconColor=""
          onPress={() => router.replace('/(auth)/social-auth')}
          extraStyle={{}}
          contentStyle={{}}
        />
        <View style={{padding: 16, gap: 24}}>
          {/* Title */}
          <TextTitle
            variant="titleLarge"
            text="To get started, please enter your name, email & password"
            extraTextStyle={{alignSelf: 'center'}}
          />
          <View style={{gap: 8}}>
            {/* First Name Input */}
            <CommonTextInput
              label="Enter firstname"
              placeholder="Case"
              value={firstname}
              autoCapitalize="none"
              secureText={false}
              onChangeText={input => setFirstname(input)}
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
              autoCapitalize="none"
              secureText={false}
              onChangeText={input => setLastname(input)}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
            />
            {/* USername Input */}
            <CommonTextInput
              label="Enter username"
              placeholder="example_123"
              value={username}
              autoCapitalize="none"
              secureText={false}
              onChangeText={input => setUsername(input)}
              dense={false}
              extraStyle={{}}
              onPress={() => {}}
              outlineStyle={{}}
            />
            {/* Email Input */}
            <CommonTextInput
              label="Entrer your email"
              placeholder="example@samvaad.com"
              value={emailAddress}
              autoCapitalize="none"
              secureText={false}
              onChangeText={input => setEmailAddress(input)}
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
              onChangeText={input => setPassword(input)}
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

const styles = StyleSheet.create({});
