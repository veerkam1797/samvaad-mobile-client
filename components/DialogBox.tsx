import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog} from 'react-native-paper';
import TextBody from './texts/TextBody';

type Props = {
  title: string;
  message: string;
  visible: boolean;
  hideDialog: () => void;
  buttonText: string;
};

const DialogBox = (props: Props) => {
  return (
    <Dialog visible={props.visible} onDismiss={props.hideDialog}>
      <Dialog.Icon icon="information" />
      <Dialog.Title style={{textAlign: 'center'}}>{props.title}</Dialog.Title>
      <Dialog.Content>
        <TextBody
          lines={3}
          variant="bodyMedium"
          text={props.message}
          extraTextStyle={{}}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={props.hideDialog}
          labelStyle={{fontFamily: 'InterRegular'}}>
          {props.buttonText ? props.buttonText : 'OK'}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogBox;

const styles = StyleSheet.create({});
