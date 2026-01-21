import { SPACING } from '@/constants/spacing';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const SignOutButton = memo(function SignOutButton() {
  const {signOut} = useClerk();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      router.replace('/(auth)/social-auth');
    } catch (err) {
      if (__DEV__) {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  }, [signOut, router]);

  const handleAccountDeletion = useCallback(async () => {
    // TODO: Implement account deletion
  }, []);

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handleSignOut}>
        Sign out
      </Button>
      <Button mode="outlined" onPress={handleAccountDeletion}>
        Delete Account
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
  },
});
