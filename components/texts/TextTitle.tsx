import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  variant: any;
  text: string;
  extraTextStyle: any | undefined;
};

const TextTitle = (props: Props) => {
  return (
    <Text variant={props.variant} style={[styles.text, props.extraTextStyle]}>
      {props.text}
    </Text>
  );
};

export default TextTitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
