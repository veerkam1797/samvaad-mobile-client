import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

type Props = {
  variant: TextProps<string>['variant'];
  text: string;
  extraTextStyle?: StyleProp<TextStyle>;
};

const TextDisplay = memo(function TextDisplay({
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

export default TextDisplay;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
