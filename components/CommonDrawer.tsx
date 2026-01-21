import { SPACING } from '@/constants/spacing';
import { useUser } from '@clerk/clerk-expo';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Drawer } from 'react-native-paper';

const DEFAULT_AVATAR = require('../assets/images/icon.png');

const CommonDrawer = memo(function CommonDrawer(
  props: DrawerContentComponentProps,
) {
  const {user} = useUser();

  const handleSettingsPress = useCallback(() => {
    router.push('/(drawer)/settings');
  }, []);

  const displayName = user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'User'
    : 'User';

  const avatarSource = user?.imageUrl ? {uri: user.imageUrl} : DEFAULT_AVATAR;

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.placeholder}>
        {/* Drawer items can be added here */}
      </View>
      <Drawer.Item
        style={styles.drawerItem}
        icon={() => <Avatar.Image size={36} source={avatarSource} />}
        label={displayName}
        onPress={handleSettingsPress}
      />
    </DrawerContentScrollView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    justifyContent: 'space-between',
  },
  placeholder: {
    paddingLeft: SPACING.md,
  },
  drawerItem: {
    padding: 0,
  },
});

export default CommonDrawer;
