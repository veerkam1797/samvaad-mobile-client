import CommonButton from '@/components/buttons/CommonButton';
import TextDisplay from '@/components/texts/TextDisplay';
import TextTitle from '@/components/texts/TextTitle';
import { Drawable } from '@/constants/Drawable';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen4() {
  const OnboardingComplete = () => {
    console.log('Onboarding Complete');
    // Navigate to the main app screen or authentication screen
    router.replace('/(auth)/social-auth');
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={{gap: 36}}>
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            source={Drawable.OnboardingImg4}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <TextDisplay
              variant={'displaySmall'}
              text="Sign Language Interpretation"
              extraTextStyle={{
                fontFamily: 'InterSemiBold',
                textAlign: 'center',
              }}
            />
            <TextTitle
              variant={'titleLarge'}
              text="Convert to visual language representations. Learn and communicate with comprehensive sign language translations."
              extraTextStyle={{fontFamily: 'InterRegular', textAlign: 'center'}}
            />
          </View>
        </View>
        <CommonButton
          mode="elevated"
          label="Continue"
          onPress={OnboardingComplete}
          extraStyle={{
            width: '100%',
            elevation: 5,
            backgroundColor: '#FF5005',
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
