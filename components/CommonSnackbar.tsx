import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

type Props = {
  message: string;
  visible: boolean;
  onDismissSnackBar: () => void;
  buttonText: string;
};

const CommonSnackbar = (props: Props) => {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismissSnackBar}
      action={{
        label: props.buttonText,
        onPress: () => {
          props.onDismissSnackBar();
        },
      }}>
      {props.message}
    </Snackbar>
  );
};

export default CommonSnackbar;

const styles = StyleSheet.create({});
