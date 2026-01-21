import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

type Props = {
  navigation: {
    openDrawer: () => void;
    goBack: () => void;
  };
  title: string;
};

const CommonHeader = memo(function CommonHeader({navigation, title}: Props) {
  const [visible, setVisible] = useState(false);

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  const handleOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const handleNewChat = useCallback(() => {
    closeMenu();
    // TODO: Implement new chat functionality
  }, [closeMenu]);

  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={handleOpenDrawer} />
      <Appbar.Content title={title} titleStyle={styles.title} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
        <Menu.Item title="Start New Chat" onPress={handleNewChat} />
      </Menu>
    </Appbar.Header>
  );
});

const styles = StyleSheet.create({
  title: {
    fontFamily: 'InterSemiBold',
  },
});

export default CommonHeader;
