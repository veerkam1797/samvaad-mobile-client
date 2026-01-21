import { SignOutButton } from '@/components/buttons/SignOutButton';
import SettingsSection from '@/components/sections/SettingsSection';
import { SPACING } from '@/constants/spacing';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}>
      <SettingsSection />
      <View style={styles.buttonContainer}>
        <SignOutButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    padding: SPACING.md,
  },
});
