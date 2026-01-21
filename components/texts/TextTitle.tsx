import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

type Props = {
  variant: TextProps<string>['variant'];
  text: string;
  extraTextStyle?: StyleProp<TextStyle>;
};

const TextTitle = memo(function TextTitle({
  variant,
  text,
  extraTextStyle,
}: Props) {
  return (
    <Text variant={variant} style={[styles.text, extraTextStyle]}>
      {text}
    </Text>
  );
});

export default TextTitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
