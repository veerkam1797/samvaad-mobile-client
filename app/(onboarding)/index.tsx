import CommonButton from '@/components/buttons/CommonButton';
import TextDisplay from '@/components/texts/TextDisplay';
import TextTitle from '@/components/texts/TextTitle';
import { Drawable } from '@/constants/Drawable';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen1() {
  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={{gap: 36}}>
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            source={Drawable.Logo}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <TextDisplay
              variant={'displayMedium'}
              text="Samvaad"
              extraTextStyle={{
                fontFamily: 'InterSemiBold',
                textAlign: 'center',
              }}
            />
            <TextTitle
              variant={'titleLarge'}
              text="Transform digital media into braille and sign language for universal accessibility"
              extraTextStyle={{
                fontFamily: 'InterRegular',
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        <CommonButton
          mode="contained"
          label="Get Started"
          onPress={() => router.push('/onboarding2')}
          extraStyle={{}}
          extraLabelStyle={{}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
