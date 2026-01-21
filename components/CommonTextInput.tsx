import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

type CommonTextInputProps = {
  label: string;
  placeholder: string;
  value: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureText: boolean;
  rightIcon?: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  extraStyle?: StyleProp<TextStyle>;
  outlineStyle?: object;
  dense?: boolean;
  disabled?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
};

const CommonTextInput = memo(function CommonTextInput({
  label,
  placeholder,
  value,
  autoCapitalize = 'none',
  secureText,
  rightIcon,
  onChangeText,
  onPress,
  extraStyle,
  outlineStyle,
  dense = false,
  disabled = false,
  keyboardType,
}: CommonTextInputProps) {
  return (
    <TextInput
      mode="outlined"
      style={extraStyle}
      autoCapitalize={autoCapitalize}
      label={label}
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureText}
      right={
        rightIcon ? (
          <TextInput.Icon icon={rightIcon} onPress={onPress} />
        ) : undefined
      }
      dense={dense}
      onChangeText={onChangeText}
      outlineStyle={outlineStyle}
      disabled={disabled}
      keyboardType={keyboardType}
    />
  );
});

export default CommonTextInput;
