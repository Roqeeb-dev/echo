import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme";

export default function About() {
  const { colors, typography, spacing, radius } = useTheme();
  const styles = createStyles(colors, typography, spacing, radius);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "About",
          headerBackTitle: "Settings",
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.appBadge}>
            <Feather name="mic" size={28} color={colors.accent} />
          </View>
          <Text style={styles.title}>Echo</Text>
          <Text style={styles.subtitle}>Audio Time Capsules</Text>
        </View>

        {/* The Project */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>THE PROJECT</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>
              Echo is a minimal voice recorder application designed for creating
              and preserving personal audio time capsules. It lets users capture
              thoughts, memories, and reflections, storing them securely to be
              revisited over time.
            </Text>
          </View>
        </View>

        {/* Tech Stack */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TECH STACK</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.techBadge}>
                <Feather name="code" size={16} color={colors.accent} />
                <Text style={styles.techTitle}>Framework</Text>
              </View>
              <Text style={styles.rowValue}>React Native (Expo)</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.techBadge}>
                <Feather name="navigation" size={16} color={colors.accent} />
                <Text style={styles.techTitle}>Routing</Text>
              </View>
              <Text style={styles.rowValue}>Expo Router</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.techBadge}>
                <Feather name="layers" size={16} color={colors.accent} />
                <Text style={styles.techTitle}>State</Text>
              </View>
              <Text style={styles.rowValue}>Zustand</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.techBadge}>
                <Feather name="database" size={16} color={colors.accent} />
                <Text style={styles.techTitle}>Storage</Text>
              </View>
              <Text style={styles.rowValue}>AsyncStorage</Text>
            </View>
          </View>
        </View>

        {/* Motivation */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>MOTIVATION</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>
              Built as a hands-on exploration of cross-platform mobile
              development, Echo served as a practical playground for mastering
              React Native, Expo, global state management, theme
              synchronization, and audio hardware integration.
            </Text>
          </View>
        </View>

        {/* About the Developer */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>THE DEVELOPER</Text>
          <View style={styles.card}>
            <View style={styles.devContainer}>
              <View style={styles.avatar}>
                <Feather name="user" size={20} color={colors.text} />
              </View>
              <View style={styles.devDetails}>
                <Text style={styles.devName}>Crafted with Care</Text>
                <Text style={styles.devRole}>Mobile & Web Developer</Text>
              </View>
            </View>
            <Text style={[styles.bodyText, { marginTop: spacing.sm }]}>
              Focused on building clean, intuitive digital experiences with high
              visual polish and fluid UI design.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
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
    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xxl,
    },
    header: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    appBadge: {
      width: 64,
      height: 64,
      borderRadius: radius.md,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    title: {
      fontFamily: typography.fontFamily.heading,
      fontSize: typography.fontSize.heading,
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    subtitle: {
      fontSize: typography.fontSize.body,
      color: colors.textMuted,
      marginTop: 2,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionHeader: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.label,
      color: colors.textMuted,
      marginBottom: spacing.xs,
      marginLeft: spacing.xs,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      overflow: "hidden",
    },
    bodyText: {
      fontSize: typography.fontSize.body,
      color: colors.text,
      lineHeight: typography.lineHeight.normal,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: spacing.xs,
    },
    techBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    techTitle: {
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
      marginVertical: spacing.xs,
    },
    devContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: radius.sm,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    devDetails: {
      flex: 1,
    },
    devName: {
      fontSize: typography.fontSize.body,
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    devRole: {
      fontSize: typography.fontSize.xs,
      color: colors.textMuted,
    },
  });
}
