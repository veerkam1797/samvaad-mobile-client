import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';

type Props = {
  navigation: {
    openDrawer: () => void;
    goBack: () => void;
  };
  title: string;
};

const CommonHeader = (props: Props) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
      />
      <Appbar.Content
        title={props.title}
        titleStyle={styles.title}
        // style={{alignItems: 'center'}}
      />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
        <Menu.Item
          title="Start New Chat"
          onPress={() => {
            closeMenu();
          }}
        />
      </Menu>
    </Appbar.Header>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'InterSemiBold',
  },
});
