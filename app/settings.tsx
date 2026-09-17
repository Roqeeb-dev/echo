import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme";

export default function Settings() {
  const { colors, typography, spacing, radius } = useTheme();
  const styles = createStyles(colors, typography, spacing, radius);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Text style={styles.rowValue}>System</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Notifications</Text>
            <Text style={styles.rowValue}>On</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Storage Used</Text>
            <Text style={styles.rowValue}>0 capsules</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: colors.danger }]}>
              Clear All Capsules
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>About Echo</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
        </View>
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
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    rowLabel: {
      fontSize: typography.fontSize.body,
      color: colors.text,
    },
    rowValue: {
      fontSize: typography.fontSize.body,
      color: colors.textMuted,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: spacing.md,
    },
  });
}
