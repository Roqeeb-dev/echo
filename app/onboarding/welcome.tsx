import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";

export default function Welcome() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  const handleNext = () => {
    router.push("/howitworks"); // Trigger screen transition here
  };

  return (
    <View style={styles.centerContent}>
      {/* Circle Mic Icon */}
      <View
        style={[
          styles.iconRing,
          { backgroundColor: colors.border, opacity: 0.35 },
        ]}
      >
        <Feather name="mic" size={48} color={colors.accent} />
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
        Welcome to Echo
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
        Record a message today. Choose when it unlocks. Let your future self
        hear it.
      </Text>
    </View>
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
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 280,
  },
});
