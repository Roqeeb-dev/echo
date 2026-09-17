import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme";

export default function Capsule() {
  const { colors, typography, spacing } = useTheme();
  const styles = createStyles(colors, typography, spacing);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Capsules</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emptyTitle}>No capsules yet</Text>
        <Text style={styles.emptySubtitle}>
          Record your first message to get started
        </Text>
      </View>
    </View>
  );
}

function createStyles(
  colors: ReturnType<typeof useTheme>["colors"],
  typography: ReturnType<typeof useTheme>["typography"],
  spacing: ReturnType<typeof useTheme>["spacing"],
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
      paddingHorizontal: spacing.xl,
    },
    emptyTitle: {
      fontFamily: typography.fontFamily.heading,
      fontSize: typography.fontSize.subheading,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    emptySubtitle: {
      fontSize: typography.fontSize.sm,
      color: colors.textMuted,
      textAlign: "center",
    },
  });
}
