import {
  RecordingPresets,
  createAudioPlayer,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Dialog, ProgressBar} from 'react-native-paper';
import CommonIconButton from '../buttons/CommonIconButton';
import TextBody from '../texts/TextBody';

type Props = {
  visible: boolean;
  hideDialog: () => void;
};

const SpeechInput = (props: Props) => {
  const [dismissableState] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  // use the recorder hook from expo-audio
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // audio player for playback (re-created when recordedUri changes)
  const player = createAudioPlayer(recordedUri);
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    // Request permissions and set up audio mode
    (async () => {
      try {
        const permission = await requestRecordingPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Permission to access microphone was denied');
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
      } catch (error) {
        console.error('Error setting up audio:', error);
        Alert.alert('Error', 'Failed to set up audio recording.');
      }
    })();

    // Cleanup function
    return () => {
      if (recorderState?.isRecording) {
        try {
          recorder.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [recorder, recorderState?.isRecording]);

  // mirror recorderState duration into local state for UI
  useEffect(() => {
    setRecordingDuration(recorderState?.durationMillis || 0);
  }, [recorderState?.durationMillis]);

  const startRecording = async () => {
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recorder) return;

      await recorder.stop();
      const uri = recorder.uri;
      setRecordedUri(uri || null);
      setIsRecording(false);
      console.log('Recording stopped, URI:', uri);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to stop recording.');
    }
  };

  const playRecording = async () => {
    try {
      if (!recordedUri) return;
      // play the audio player created in render
      player.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play recording:', error);
      Alert.alert('Error', 'Failed to play recording.');
      setIsPlaying(false);
    }
  };

  // update playback progress from playerStatus
  useEffect(() => {
    if (!playerStatus) return;
    setPlaybackProgress(
      (playerStatus.currentTime || 0) / (playerStatus.duration || 1),
    );
    if (playerStatus.didJustFinish) setIsPlaying(false);
  }, [playerStatus]);

  const stopPlaying = async () => {
    try {
      const player = createAudioPlayer(recordedUri);
      player.pause();
      setIsPlaying(false);
      setPlaybackProgress(0);
    } catch (error) {
      console.error('Failed to stop playing:', error);
      Alert.alert('Error', 'Failed to stop playback.');
    }
  };

  return (
    <Dialog
      visible={props.visible}
      onDismiss={props.hideDialog}
      dismissable={dismissableState}>
      <Dialog.Icon icon="record-rec" size={32} />
      <Dialog.Title style={{textAlign: 'center'}}>Speech Input</Dialog.Title>

      <Dialog.Content style={{alignItems: 'center'}}>
        {!recordedUri ? (
          <>
            <TextBody
              lines={3}
              variant="bodyLarge"
              text={
                isRecording
                  ? `Recording... ${Math.floor(recordingDuration / 1000)}s`
                  : 'Begin voice recording to generate an accessible transcription.'
              }
              extraTextStyle={{
                textAlign: 'center',
                color: isRecording ? 'red' : undefined,
              }}
            />
            <CommonIconButton
              mode="contained"
              icon={isRecording ? 'square' : 'microphone'}
              iconSize={32}
              iconColor="white"
              onPress={isRecording ? stopRecording : startRecording}
              extraStyle={{
                backgroundColor: 'rgba(185, 14, 14, 1)',
                marginTop: 16,
              }}
              contentStyle={{}}
            />
          </>
        ) : (
          <>
            <TextBody
              lines={2}
              variant="bodyLarge"
              text="Recording complete. Play to preview or accept to use."
              extraTextStyle={{textAlign: 'center'}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginTop: 16,
              }}>
              <CommonIconButton
                mode="contained-tonal"
                icon={isPlaying ? 'pause' : 'play'}
                iconSize={24}
                iconColor=""
                onPress={isPlaying ? stopPlaying : playRecording}
                extraStyle={{}}
                contentStyle={{}}
              />
              <View style={{flex: 1}}>
                <ProgressBar progress={playbackProgress} />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 16, gap: 16}}>
              <CommonIconButton
                mode="contained-tonal"
                icon="check"
                iconSize={32}
                iconColor="green"
                onPress={() => {
                  // TODO: Handle the recorded audio (e.g., send to transcription service)
                  props.hideDialog();
                }}
                extraStyle={{}}
                contentStyle={{}}
              />
              <CommonIconButton
                mode="contained-tonal"
                icon="close"
                iconSize={32}
                iconColor="red"
                onPress={() => {
                  setRecordedUri(null);
                  props.hideDialog();
                }}
                extraStyle={{}}
                contentStyle={{}}
              />
            </View>
          </>
        )}
      </Dialog.Content>
    </Dialog>
  );
};

export default SpeechInput;
