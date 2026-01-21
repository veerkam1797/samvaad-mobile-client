import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

type Props = {
  mode?: 'contained' | 'contained-tonal' | 'outlined' | undefined;
  icon: string;
  iconSize: number;
  iconColor?: string;
  onPress: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  extraStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const CommonIconButton = memo(function CommonIconButton({
  mode,
  icon,
  iconSize,
  iconColor,
  onPress,
  contentStyle,
  extraStyle,
  disabled = false,
}: Props) {
  return (
    <IconButton
      mode={mode}
      icon={icon}
      iconColor={iconColor || undefined}
      size={iconSize}
      style={extraStyle}
      contentStyle={contentStyle}
      onPress={onPress}
      disabled={disabled}
    />
  );
});

export default CommonIconButton;
