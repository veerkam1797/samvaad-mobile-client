import { SignOutButton } from '@/components/buttons/SignOutButton';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({});
