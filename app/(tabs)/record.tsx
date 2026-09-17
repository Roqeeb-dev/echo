import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../theme";

export default function Home() {
  const { colors, typography, spacing, radius } = useTheme();
  const styles = createStyles(colors, typography, spacing, radius);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Record</Text>
      </View>

      <View style={styles.content}>
        <Pressable style={styles.recordButton}>
          <View style={styles.micIcon} />
        </Pressable>

        <Text style={styles.timer}>00:00</Text>
        <Text style={styles.instruction}>Tap to start recording</Text>
      </View>
    </View>
  );
}

function createStyles(
  colors: ReturnType<typeof useTheme>["colors"],
  typography: ReturnType<typeof useTheme>["typography"],
  spacing: ReturnType<typeof useTheme>["spacing"],
  radius: ReturnType<typeof useTheme>["radius"],
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: spacing.xxl,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    headerTitle: {
      fontFamily: typography.fontFamily.heading,
      fontSize: typography.fontSize.heading,
      color: colors.text,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
    },
    recordButton: {
      width: 100,
      height: 100,
      borderRadius: radius.full,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 5,
    },
    micIcon: {
      width: 28,
      height: 40,
      borderRadius: 14,
      backgroundColor: colors.card,
    },
    timer: {
      marginTop: spacing.xl,
      fontSize: typography.fontSize.subheading,
      color: colors.textMuted,
      letterSpacing: typography.letterSpacing.wide,
    },
    instruction: {
      marginTop: spacing.sm,
      fontSize: typography.fontSize.sm,
      color: colors.textMuted,
    },
  });
}
