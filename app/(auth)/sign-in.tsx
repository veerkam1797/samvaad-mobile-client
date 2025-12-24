import CommonButton from '@/components/buttons/CommonButton';
import CommonIconButtom from '@/components/buttons/CommonIconButton';
import CommonTextInput from '@/components/CommonTextInput';
import TextTitle from '@/components/texts/TextTitle';
import { useSignIn } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const {signIn, setActive, isLoaded} = useSignIn();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Email & Password Sign-In Handler
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({session: signInAttempt.createdSessionId});
        router.push('/(drawer)');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(error, null, 2));
      Alert.alert('Error', error.message);
    }
  }, [isLoaded, email, password]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 4,
          justifyContent: 'space-between',
        }}>
        <View style={{padding: 16}}>
          {/* Close Page Button */}
          <CommonIconButtom
            mode=""
            icon="close"
            iconSize={24}
            iconColor=""
            onPress={() => router.replace('/(auth)/social-auth')}
            extraStyle={{marginLeft: 0}}
            contentStyle={{}}
          />
          <View style={{gap: 16}}>
            {/* Title */}
            <TextTitle
              variant="titleLarge"
              text="To get started, please enter your phone number or email & password"
              extraTextStyle={{alignSelf: 'center'}}
            />
            {/* Email Input */}
            <CommonTextInput
              label="Entrer your email"
              placeholder="example@samvaad.com"
              value={email}
              autoCapitalize="none"
              secureText={false}
              onChangeText={input => setEmail(input)}
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
        </View>
        <View>
          <Divider bold />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 12,
              padding: 16,
              marginTop: 16,
            }}>
            {/* Forgot Password Button */}
            <CommonButton
              mode="outlined"
              label="Forgot Password ?"
              onPress={() => router.push('/(auth)/password')}
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

const styles = StyleSheet.create({});
