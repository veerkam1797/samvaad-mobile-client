// no route params used for the callback approach
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Modal} from 'react-native-paper';
import CommonIconButton from './buttons/CommonIconButton';
import TextBody from './texts/TextBody';

type Props = {
  isVisible: any;
  isNotVisible: any;
  onSelectAudio?: () => void;
};

const CommonBottomSheet = (props: Props) => {
  const color = useColorScheme();
  // no local search params needed for prop-callback approach

  return (
    <Modal
      style={[styles.container]}
      visible={props.isVisible}
      onDismiss={props.isNotVisible}
      contentContainerStyle={[
        styles.contentContainer,
        {
          backgroundColor:
            color === 'dark' ? 'rgb(25, 28, 28)' : 'rgb(250, 253, 252)',
          animationDirection: 'slide-from-bottom',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 16,
        }}>
        <View style={styles.buttonContainer}>
          <CommonIconButton
            mode="contained-tonal"
            icon="file-upload"
            iconSize={48}
            iconColor=""
            onPress={() => {
              props.isNotVisible();
              console.log('Pressed Upload Document ');
            }}
            extraStyle={{}}
            contentStyle={{}}
          />
          <TextBody
            variant=""
            text="Upload Document"
            lines={1}
            extraTextStyle={{alignSelf: 'center'}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CommonIconButton
            mode="contained-tonal"
            icon="microphone"
            iconSize={48}
            iconColor=""
            onPress={() => {
              props.isNotVisible();
              if (props.onSelectAudio) props.onSelectAudio();
              console.log('Pressed Speech Input');
            }}
            extraStyle={{}}
            contentStyle={{}}
          />
          <TextBody
            variant="bodyMedium"
            text="Speech Input"
            lines={1}
            extraTextStyle={{alignSelf: 'center'}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CommonBottomSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 64 / 2,
    borderTopRightRadius: 64 / 2,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 4,
  },
});
