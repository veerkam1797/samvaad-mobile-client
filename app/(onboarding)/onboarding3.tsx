import CommonButton from '@/components/buttons/CommonButton';
import TextDisplay from '@/components/texts/TextDisplay';
import TextTitle from '@/components/texts/TextTitle';
import { Drawable } from '@/constants/Drawable';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen3() {
  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={{gap: 36}}>
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            source={Drawable.OnboardingImg3}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <TextDisplay
              variant={'displaySmall'}
              text="Braille Translation"
              extraTextStyle={{
                fontFamily: 'InterSemiBold',
                textAlign: 'center',
              }}
            />
            <TextTitle
              variant={'titleLarge'}
              text="Convey any text into Grade 1 or Grade 2 braille instantly. Perfect for learning or creating accessible documents."
              extraTextStyle={{fontFamily: 'InterRegular', textAlign: 'center'}}
            />
          </View>
        </View>
        <CommonButton
          mode="elevated"
          label="Continue"
          onPress={() => router.push('/onboarding4')}
          extraStyle={{
            width: '100%',
            elevation: 5,
            backgroundColor: '#00472D',
          }}
          extraLabelStyle={{color: '#FFF'}}
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
