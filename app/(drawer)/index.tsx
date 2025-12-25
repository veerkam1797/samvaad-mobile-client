import CommonIconButton from '@/components/buttons/CommonIconButton';
import CommonTextInput from '@/components/CommonTextInput';
import BrailleSection from '@/components/sections/BrailleSection';
import SignSection from '@/components/sections/SignSection';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [transcribedText, setTranscribedText] = React.useState<string>('');
  const [transcriptionMode, setTranscriptionMode] =
    React.useState<any>('braille');
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      enabled>
      {/* Transcription Mode Toggle */}
      <View style={{flex: 1}}>
        {!transcriptionMode ? <SignSection /> : <BrailleSection />}
      </View>
      {/* Transcription Container */}
      <View style={styles.transcriptContainer}>
        {/* Button to change insert files */}
        <CommonIconButton
          mode="contained"
          icon="attachment"
          iconSize={24}
          iconColor=""
          onPress={() => {
            router.push('/modal');
          }}
          extraStyle={{margin: 0}}
          contentStyle={{}}
        />
        {/* Text box to show transcription and make corrections  */}
        <CommonTextInput
          label="Your text will show here"
          placeholder="Wanna change something?"
          autoCapitalize=""
          value={transcribedText}
          onChangeText={text => setTranscribedText(text)}
          secureText={false}
          rightIcon={'send'}
          onPress={() => {}}
          extraStyle={{flex: 1}}
          outlineStyle={{borderRadius: 48 / 2}}
          dense={true}
        />
        {/* Button to change transcription mode */}
        <CommonIconButton
          mode="contained"
          icon={!transcriptionMode ? 'sign-language' : 'braille'}
          iconSize={24}
          iconColor=""
          onPress={() => {
            setTranscriptionMode(!transcriptionMode);
          }}
          extraStyle={{margin: 0}}
          contentStyle={{}}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  transcriptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12.8,
    gap: 8,
    width: '100%',
  },
});
