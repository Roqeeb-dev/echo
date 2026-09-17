import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import { requestRecordingPermissionsAsync } from "expo-audio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreenShell from "../../components/onboardingScreenShell";

export default function Permissions() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  const handleNext = async () => {
    // 1. Ask for microphone permission
    await requestRecordingPermissionsAsync();

    // 2. Ask for notification permission (TODO)

    // 3. Mark onboarding as complete, so it never shows again
    await AsyncStorage.setItem("hasOnboarded", "true");

    // 4. Replace the stack — no going back into onboarding
    router.replace("/(tabs)/record");
  };

  return (
    <OnboardingScreenShell
      activeStep={2}
      nextButtonTitle="Get Started"
      onNext={handleNext}
    >
      <View style={styles.centerContent}>
        <View
          style={[
            styles.iconRing,
            { backgroundColor: colors.border, opacity: 0.35 },
          ]}
        >
          <View style={styles.iconContainer}>
            <Feather name="bell" size={28} color={colors.accent} />
            <Feather
              name="mic"
              size={20}
              color={colors.accent}
              style={styles.micBadge}
            />
          </View>
        </View>

        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontFamily: typography.fontFamily.heading,
              fontSize: typography.fontSize.heading,
              fontWeight: typography.fontWeight.bold,
            },
          ]}
        >
          One Last Thing
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textMuted,
              fontSize: typography.fontSize.body,
              lineHeight: typography.lineHeight.normal,
              marginTop: spacing.sm,
            },
          ]}
        >
          Echo needs microphone access to record, and notification access to let
          you know when a capsule unlocks.
        </Text>
      </View>
    </OnboardingScreenShell>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  micBadge: {
    marginLeft: -4,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 290,
  },
});
