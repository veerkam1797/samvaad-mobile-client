import {DrawerContentScrollView} from '@react-navigation/drawer';
import {router} from 'expo-router';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Drawer} from 'react-native-paper';

type Props = {};

const CommonDrawer = (props: Props) => {
  return (
    <DrawerContentScrollView
      {...props}
      style={{flex: 1, padding: 0, margin: 0}}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 0,
        margin: 0,
        justifyContent: 'space-between',
      }}>
      <View style={{borderWidth: 0, borderColor: 'yellow', paddingLeft: 16}}>
        {/* <DrawerItemList {...props} /> */}
      </View>
      <Drawer.Item
        style={{padding: 0}}
        icon={() => (
          <Avatar.Image
            size={36}
            source={{uri: 'https://via.placeholder.com/150'}}
          />
        )}
        label="User Name"
        onPress={() => router.push('/(drawer)/settings')}
      />
    </DrawerContentScrollView>
  );
};

export default CommonDrawer;

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  drawerHeaderText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
