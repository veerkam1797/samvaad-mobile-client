import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, SegmentedButtons} from 'react-native-paper';
import CommonSnackbar from '../CommonSnackbar';
import TextTitle from '../texts/TextTitle';

type Props = {};

const SignSection = (props: Props) => {
  const [signMode, setSignMode] = useState<string>('ISL');
  const [visible, setVisible] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  const msg1 = 'You’ve switched to Indian Sign Language';
  const msg2 = 'You’ve switched to American Sign Language';
  const msg3 = 'You’ve switched to German Sign Language';

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        gap: 16,
        justifyContent: 'center',
      }}>
      <SegmentedButtons
        value={signMode}
        onValueChange={setSignMode}
        buttons={[
          {
            value: 'ISL',
            label: 'Indian Sign Language',
            onPress: () => {
              setMsg(msg1);
              setVisible(true);
            },
          },
          {
            value: 'ASL',
            label: 'American Sign Language',
            onPress: () => {
              setMsg(msg2);
              setVisible(true);
            },
          },
          {
            value: 'GSL',
            label: 'German Sign Language',
            onPress: () => {
              setMsg(msg3);
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
            <TextTitle
              variant="titleLarge"
              text="Start speaking or type to see your words come alive in Sign Language✨"
              extraTextStyle={{
                alignSelf: 'center',
                textAlign: 'center',
              }}
            />
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

export default SignSection;

const styles = StyleSheet.create({});
