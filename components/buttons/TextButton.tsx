import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  label: string;
  extraStyle: any | undefined;
  extraTextStyle: any | undefined;
  onPress: () => void;
};

const TextButton = (props: Props) => {
  return (
    <Button
      mode="text"
      style={[props.extraStyle]}
      onPress={props.onPress}
      labelStyle={[styles.text, props.extraTextStyle]}>
      {props.label}
    </Button>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
