import React, { memo, useCallback } from 'react';
import { Snackbar } from 'react-native-paper';

type Props = {
  message: string;
  visible: boolean;
  onDismissSnackBar: () => void;
  buttonText: string;
  duration?: number;
};

const CommonSnackbar = memo(function CommonSnackbar({
  message,
  visible,
  onDismissSnackBar,
  buttonText,
  duration = 3000,
}: Props) {
  const handleAction = useCallback(() => {
    onDismissSnackBar();
  }, [onDismissSnackBar]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={duration}
      action={{
        label: buttonText,
        onPress: handleAction,
      }}>
      {message}
    </Snackbar>
  );
});

export default CommonSnackbar;
