import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import Button from "../../components/Button";
import { MOCK_CAPSULES as capsules } from "../../lib/mock_capsules";
import { router } from "expo-router";

export default function Settings() {
  const { colors, typography, spacing, radius, isDark, toggleTheme } =
    useTheme();
  const styles = createStyles(colors, typography, spacing, radius);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleClearCapsules = () => {
    // Add logic to clear local capsule state/storage here
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* PREFERENCES SECTION */}
        <Text style={styles.sectionHeader}>PREFERENCES</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.card}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.card}
            />
          </View>
        </View>

        {/* DATA SECTION */}
        <Text style={styles.sectionHeader}>DATA</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Storage Used</Text>
            <Text style={styles.rowValue}>
              {capsules.length ?? 0} capsules · 18 MB
            </Text>
          </View>
          <View style={styles.divider} />
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
            onPress={() => setVisible(true)}
          >
            <Text style={[styles.rowLabel, { color: colors.danger }]}>
              Clear All Capsules
            </Text>
            <Feather name="chevron-right" size={16} color={colors.danger} />
          </Pressable>
        </View>

        {/* ABOUT SECTION */}
        <Text style={styles.sectionHeader}>ABOUT</Text>
        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
            onPress={() => {
              router.navigate("/about");
            }}
          >
            <Text style={styles.rowLabel}>About Echo</Text>
            <Feather name="chevron-right" size={16} color={colors.textMuted} />
          </Pressable>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>

      {/* CONFIRMATION MODAL */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          {/* Card Content (Stop click propagation) */}
          <Pressable
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Clear All Capsules?</Text>
            <Text style={styles.modalBody}>
              Are you sure you want to clear all capsules? This action cannot be
              undone.
            </Text>

            <View style={styles.modalActions}>
              <Button
                title="Delete All"
                onPress={handleClearCapsules}
                style={{ backgroundColor: colors.danger }}
              />
              <Button
                title="Cancel"
                variant="ghost"
                onPress={() => setVisible(false)}
                style={{ marginTop: spacing.xs }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    sectionHeader: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.label,
      color: colors.textMuted,
      marginTop: spacing.lg,
      marginBottom: spacing.xs,
      marginLeft: spacing.xs,
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
      minHeight: 52,
    },
    pressedRow: {
      opacity: 0.7,
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
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
    },
    modalCard: {
      width: "100%",
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      alignItems: "center",
    },
    modalTitle: {
      fontFamily: typography.fontFamily.heading,
      fontSize: typography.fontSize.subheading,
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
      marginBottom: spacing.xs,
      textAlign: "center",
    },
    modalBody: {
      fontSize: typography.fontSize.body,
      color: colors.textMuted,
      textAlign: "center",
      lineHeight: typography.lineHeight.normal,
      marginBottom: spacing.lg,
    },
    modalActions: {
      width: "100%",
    },
  });
}
