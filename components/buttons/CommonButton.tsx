import React, { memo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  mode: 'contained' | 'outlined' | 'contained-tonal' | 'elevated' | undefined;
  label: string;
  onPress: () => void;
  extraStyle?: StyleProp<ViewStyle>;
  extraLabelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

const CommonButton = memo(function CommonButton({
  mode,
  label,
  onPress,
  extraStyle,
  extraLabelStyle,
  disabled = false,
}: Props) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={extraStyle}
      disabled={disabled}
      labelStyle={[{fontFamily: 'InterBold'}, extraLabelStyle]}>
      {label}
    </Button>
  );
});

export default CommonButton;
