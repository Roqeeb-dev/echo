import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import OnboardingScreenShell from "../../components/onboardingScreenShell";

export default function HowItWorks() {
  const { colors, typography, spacing, radius } = useTheme();
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/permissions");
  };

  const steps = [
    {
      icon: "mic" as const,
      title: "Record a voice note",
    },
    {
      icon: "calendar" as const,
      title: "Set an unlock date",
    },
    {
      icon: "lock" as const,
      title: "It stays sealed until then",
    },
  ];

  return (
    <OnboardingScreenShell activeStep={1} onNext={handleNext}>
      <View style={styles.container}>
        <Text
          style={[
            styles.heading,
            {
              color: colors.text,
              fontFamily: typography.fontFamily.heading,
              fontSize: typography.fontSize.heading,
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing.xxl,
            },
          ]}
        >
          How It Works
        </Text>

        <View style={[styles.list, { gap: spacing.lg }]}>
          {steps.map((step, index) => (
            <View key={index} style={[styles.stepRow, { gap: spacing.md }]}>
              <View
                style={[
                  styles.iconBadge,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: radius.full,
                  },
                ]}
              >
                <Feather name={step.icon} size={20} color={colors.accent} />
              </View>

              <Text
                style={[
                  styles.stepText,
                  {
                    color: colors.text,
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.semibold,
                  },
                ]}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </OnboardingScreenShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  heading: {
    textAlign: "center",
  },
  list: {
    width: "100%",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    flex: 1,
  },
});
