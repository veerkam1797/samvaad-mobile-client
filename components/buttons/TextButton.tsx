import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  label: string;
  extraStyle?: StyleProp<ViewStyle>;
  extraTextStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabled?: boolean;
};

const TextButton = memo(function TextButton({
  label,
  extraStyle,
  extraTextStyle,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Button
      mode="text"
      style={extraStyle}
      onPress={onPress}
      disabled={disabled}
      labelStyle={[styles.text, extraTextStyle]}>
      {label}
    </Button>
  );
});

export default TextButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterBold',
  },
});
