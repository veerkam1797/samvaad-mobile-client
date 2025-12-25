import { SignOutButton } from '@/components/buttons/SignOutButton';
import SettingsSection from '@/components/sections/SettingsSection';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <SettingsSection />
      <View style={{padding: 16}}>
        <SignOutButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
