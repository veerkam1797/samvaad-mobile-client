import CommonButton from '@/components/buttons/CommonButton';
import TextDisplay from '@/components/texts/TextDisplay';
import TextTitle from '@/components/texts/TextTitle';
import { Drawable } from '@/constants/Drawable';
import { SPACING } from '@/constants/spacing';
import { responsiveValue, useScreenDimensions } from '@/utils/responsive';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen1() {
  const {width} = useScreenDimensions();

  // Responsive image size based on screen width
  const imageSize = useMemo(() => {
    return responsiveValue({
      small: 180,
      phone: 220,
      large: 280,
      tablet: 320,
      default: 250,
    });
  }, [width]);

  const handleGetStarted = useCallback(() => {
    router.push('/onboarding2');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.contentWrapper}>
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            source={Drawable.Logo}
            style={[styles.image, {height: imageSize, width: imageSize}]}
          />
          <View style={styles.contentContainer}>
            <TextDisplay
              variant={'displayMedium'}
              text="Samvaad"
              extraTextStyle={styles.displayText}
            />
            <TextTitle
              variant={'titleLarge'}
              text="Transform digital media into braille and sign language for universal accessibility"
              extraTextStyle={styles.titleText}
            />
          </View>
        </View>
        <CommonButton
          mode="contained"
          label="Get Started"
          onPress={handleGetStarted}
          extraStyle={{}}
          extraLabelStyle={{}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: SPACING.md,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentWrapper: {
    gap: SPACING.xl,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  image: {
    alignSelf: 'center',
  },
  displayText: {
    fontFamily: 'InterSemiBold',
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'InterRegular',
    textAlign: 'center',
  },
});
