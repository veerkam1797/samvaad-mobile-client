import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any | undefined;
  lines: any | undefined;
};

const TextBody = (props: Props) => {
  return (
    <Text
      variant={props.variant}
      style={[styles.text, props.extraTextStyle]}
      numberOfLines={props.lines}>
      {props.text}
    </Text>
  );
};

export default TextBody;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
