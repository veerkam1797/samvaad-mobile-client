import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, SegmentedButtons} from 'react-native-paper';
import CommonSnackbar from '../CommonSnackbar';
import TextTitle from '../texts/TextTitle';

type Props = {
  brailleText?: string;
};

const BrailleSection = ({brailleText = ''}: Props) => {
  const [brailleMode, setBrailleMode] = useState<string>('G1');
  const [visible, setVisible] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  const msg1 = "You've switched to Braille Grade 1";
  const msg2 = "You've switched to Braille Grade 2";

  console.log('Braille Text in BrailleSection:', brailleText);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        gap: 16,
      }}>
      <SegmentedButtons
        value={brailleMode}
        onValueChange={setBrailleMode}
        buttons={[
          {
            value: 'G1',
            label: 'Grade 1',
            onPress: () => {
              setMsg(msg1);
              setVisible(true);
            },
          },
          {
            value: 'G2',
            label: 'Grade 2',
            onPress: () => {
              setMsg(msg2);
              setVisible(true);
            },
          },
        ]}
      />
      <Card mode="contained" style={{flex: 1}} contentStyle={{flex: 1}}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Card.Content>
            {brailleText ? (
              <TextTitle
                variant="titleLarge"
                text={brailleText}
                extraTextStyle={{
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              />
            ) : (
              <TextTitle
                variant="titleLarge"
                text="Start speaking or type to see your words come alive in Braille Language✨"
                extraTextStyle={{
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              />
            )}
          </Card.Content>
        </ScrollView>
      </Card>
      <CommonSnackbar
        message={msg}
        visible={visible}
        onDismissSnackBar={() => setVisible(false)}
        buttonText="Okay"
      />
    </View>
  );
};

export default BrailleSection;

const styles = StyleSheet.create({});
