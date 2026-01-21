import { SPACING } from '@/constants/spacing';
import React, { memo, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, SegmentedButtons } from 'react-native-paper';
import CommonSnackbar from '../CommonSnackbar';
import TextTitle from '../texts/TextTitle';

const SIGN_MESSAGES = {
  ISL: "You've switched to Indian Sign Language",
  ASL: "You've switched to American Sign Language",
  GSL: "You've switched to German Sign Language",
} as const;

type SignMode = keyof typeof SIGN_MESSAGES;

const SignSection = memo(function SignSection() {
  const [signMode, setSignMode] = useState<SignMode>('ISL');
  const [visible, setVisible] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  const handleDismissSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  const handleISLPress = useCallback(() => {
    setMsg(SIGN_MESSAGES.ISL);
    setVisible(true);
  }, []);

  const handleASLPress = useCallback(() => {
    setMsg(SIGN_MESSAGES.ASL);
    setVisible(true);
  }, []);

  const handleGSLPress = useCallback(() => {
    setMsg(SIGN_MESSAGES.GSL);
    setVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={signMode}
        onValueChange={value => setSignMode(value as SignMode)}
        buttons={[
          {
            value: 'ISL',
            label: 'Indian Sign Language',
            onPress: handleISLPress,
          },
          {
            value: 'ASL',
            label: 'American Sign Language',
            onPress: handleASLPress,
          },
          {
            value: 'GSL',
            label: 'German Sign Language',
            onPress: handleGSLPress,
          },
        ]}
      />
      <Card
        mode="contained"
        style={styles.card}
        contentStyle={styles.cardContent}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <Card.Content>
            <TextTitle
              variant="titleLarge"
              text="Start speaking or type to see your words come alive in Sign Language✨"
              extraTextStyle={styles.titleText}
            />
          </Card.Content>
        </ScrollView>
      </Card>
      <CommonSnackbar
        message={msg}
        visible={visible}
        onDismissSnackBar={handleDismissSnackbar}
        buttonText="Okay"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
  },
  cardContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default SignSection;
