import CommonDrawer from '@/components/CommonDrawer';
import CommonHeader from '@/components/CommonHeader';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DrawerContainer = () => {
  return (
    <Drawer
      drawerContent={props => <CommonDrawer {...props} />}
      screenOptions={{
        header: props => (
          <CommonHeader
            navigation={props.navigation}
            title={props.options.title || props.route.name}
          />
        ),
      }}>
      <Drawer.Screen name="index" options={{title: 'Home'}} />
      <Drawer.Screen name="settings" options={{title: 'Settings'}} />
    </Drawer>
  );
};

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DrawerContainer />
    </GestureHandlerRootView>
  );
}
