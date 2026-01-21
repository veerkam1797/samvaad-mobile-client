import CommonIconButton from '@/components/buttons/CommonIconButton';
import CommonTextInput from '@/components/CommonTextInput';
import BrailleSection from '@/components/sections/BrailleSection';
import SignSection from '@/components/sections/SignSection';
import { RADIUS, SPACING } from '@/constants/spacing';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

type TranscriptionMode = 'braille' | 'sign';

export default function HomeScreen() {
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [transcriptionMode, setTranscriptionMode] =
    useState<TranscriptionMode>('braille');

  const handleAttachmentPress = useCallback(() => {
    router.push('/modal');
  }, []);

  const handleModeToggle = useCallback(() => {
    setTranscriptionMode(prev => (prev === 'braille' ? 'sign' : 'braille'));
  }, []);

  const handleSendPress = useCallback(() => {
    // TODO: Implement send functionality
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      enabled>
      {/* Transcription Mode Section */}
      <View style={styles.sectionContainer}>
        {transcriptionMode === 'sign' ? (
          <SignSection />
        ) : (
          <BrailleSection brailleText={transcribedText} />
        )}
      </View>
      {/* Input Container */}
      <View style={styles.inputContainer}>
        {/* Button to insert files */}
        <CommonIconButton
          mode="contained"
          icon="attachment"
          iconSize={24}
          onPress={handleAttachmentPress}
          extraStyle={styles.iconButton}
        />
        {/* Text input for transcription */}
        <CommonTextInput
          label="Your text will show here"
          placeholder="Wanna change something?"
          value={transcribedText}
          onChangeText={setTranscribedText}
          secureText={false}
          rightIcon="send"
          onPress={handleSendPress}
          extraStyle={styles.textInput}
          outlineStyle={styles.textInputOutline}
          dense={true}
        />
        {/* Button to toggle transcription mode */}
        <CommonIconButton
          mode="contained"
          icon={transcriptionMode === 'sign' ? 'sign-language' : 'braille'}
          iconSize={24}
          onPress={handleModeToggle}
          extraStyle={styles.iconButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.ms,
    gap: SPACING.sm,
    width: '100%',
  },
  iconButton: {
    margin: 0,
  },
  textInput: {
    flex: 1,
  },
  textInputOutline: {
    borderRadius: RADIUS.xxl,
  },
});
