import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any | undefined;
};

const TextDisplay = (props: Props) => {
  return (
    <Text variant={props.variant} style={[styles.text, props.extraTextStyle]}>
      {props.text}
    </Text>
  );
};

export default TextDisplay;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
