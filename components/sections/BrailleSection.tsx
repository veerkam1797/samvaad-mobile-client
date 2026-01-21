import { SPACING } from '@/constants/spacing';
import React, { memo, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, SegmentedButtons } from 'react-native-paper';
import CommonSnackbar from '../CommonSnackbar';
import TextTitle from '../texts/TextTitle';

type Props = {
  brailleText?: string;
};

const BRAILLE_MESSAGES = {
  G1: "You've switched to Braille Grade 1",
  G2: "You've switched to Braille Grade 2",
} as const;

const BrailleSection = memo(function BrailleSection({brailleText = ''}: Props) {
  const [brailleMode, setBrailleMode] = useState<'G1' | 'G2'>('G1');
  const [visible, setVisible] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  const handleDismissSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  const handleGrade1Press = useCallback(() => {
    setMsg(BRAILLE_MESSAGES.G1);
    setVisible(true);
  }, []);

  const handleGrade2Press = useCallback(() => {
    setMsg(BRAILLE_MESSAGES.G2);
    setVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={brailleMode}
        onValueChange={value => setBrailleMode(value as 'G1' | 'G2')}
        buttons={[
          {
            value: 'G1',
            label: 'Grade 1',
            onPress: handleGrade1Press,
          },
          {
            value: 'G2',
            label: 'Grade 2',
            onPress: handleGrade2Press,
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
              text={
                brailleText ||
                'Start speaking or type to see your words come alive in Braille Language✨'
              }
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

export default BrailleSection;
