import {useAuth} from '@clerk/clerk-expo';
import {Redirect, Stack} from 'expo-router';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function OnboardingLayout() {
  const {isSignedIn} = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(drawer)'} />;
  }
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding2" />
      <Stack.Screen name="onboarding3" />
      <Stack.Screen name="onboarding4" />
    </Stack>
  );
}

const styles = StyleSheet.create({});
