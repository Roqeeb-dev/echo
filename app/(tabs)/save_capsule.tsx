import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import Button from "../../components/Button";
import { saveAudioFile, saveCapsule } from "../../lib/storage";

export default function SaveCapsuleScreen() {
  const { colors, typography, spacing, radius } = useTheme();
  const styles = createStyles(colors, typography, spacing, radius);
  const router = useRouter();

  // Retrieve temporary audio URI and formatted duration passed from Record screen
  const { uri, duration } = useLocalSearchParams<{
    uri: string;
    duration: string;
  }>();

  const [title, setTitle] = useState("");
  const [unlockDays, setUnlockDays] = useState("30"); // Default unlock timeframe
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Title Required", "Please enter a title for your capsule.");
      return;
    }

    if (!uri) {
      Alert.alert("Error", "No audio recording found.");
      return;
    }

    try {
      setIsSaving(true);
      const capsuleId = Date.now().toString();

      // 1. Persist temporary audio file permanently
      const permanentUri = await saveAudioFile(uri, capsuleId);

      // 2. Calculate unlock timestamp
      const now = new Date();
      const daysToAdd = parseInt(unlockDays, 10) || 30;
      const unlockDateObj = new Date(
        now.getTime() + daysToAdd * 24 * 60 * 60 * 1000,
      );

      const formatDate = (d: Date) =>
        d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

      // 3. Construct capsule object
      const newCapsule = {
        id: capsuleId,
        title: title.trim(),
        recordedAt: formatDate(now),
        unlockDate: formatDate(unlockDateObj),
        duration: duration || "00:00",
        isLocked: daysToAdd > 0,
        audioUri: permanentUri,
      };

      // 4. Save metadata to persistent storage
      await saveCapsule(newCapsule);

      // 5. Navigate back to Capsules list
      router.replace("/(tabs)/capsules");
    } catch (error) {
      console.error("Failed to save capsule:", error);
      Alert.alert("Error", "Could not save your capsule. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Save Capsule</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Audio Meta Card */}
        <View style={styles.card}>
          <View style={styles.audioBadge}>
            <Feather name="mic" size={20} color={colors.accent} />
            <Text style={styles.audioDuration}>{duration || "00:00"}</Text>
          </View>
          <Text style={styles.audioMetaText}>Audio Recording Ready</Text>
        </View>

        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Capsule Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Letter to my Future Self"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={setTitle}
            maxLength={60}
          />
        </View>

        {/* Unlock Options */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lock Duration</Text>
          <View style={styles.presetContainer}>
            {[
              { label: "7 Days", value: "7" },
              { label: "30 Days", value: "30" },
              { label: "1 Year", value: "365" },
            ].map((preset) => {
              const isSelected = unlockDays === preset.value;
              return (
                <Pressable
                  key={preset.value}
                  style={[
                    styles.presetOption,
                    isSelected && styles.presetOptionSelected,
                  ]}
                  onPress={() => setUnlockDays(preset.value)}
                >
                  <Text
                    style={[
                      styles.presetText,
                      isSelected && styles.presetTextSelected,
                    ]}
                  >
                    {preset.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Action Button */}
        <Button
          title={isSaving ? "Locking Time Capsule..." : "Save Capsule"}
          onPress={handleSave}
          disabled={isSaving}
          style={styles.saveButton}
        />
      </ScrollView>
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
      flexDirection: "row",
      alignItems: "center",
      paddingTop: spacing.xxl,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
      gap: spacing.md,
    },
    backButton: {
      padding: spacing.xs,
    },
    headerTitle: {
      fontFamily: typography.fontFamily.heading,
      fontSize: typography.fontSize.heading,
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxl,
      gap: spacing.lg,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    audioBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.sm,
      gap: spacing.xs,
      borderWidth: 1,
      borderColor: colors.border,
    },
    audioDuration: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text,
    },
    audioMetaText: {
      fontSize: typography.fontSize.body,
      color: colors.textMuted,
    },
    inputGroup: {
      gap: spacing.xs,
    },
    label: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: typography.letterSpacing.label,
      color: colors.textMuted,
      marginLeft: spacing.xs,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: typography.fontSize.body,
      color: colors.text,
    },
    presetContainer: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    presetOption: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: spacing.md,
      alignItems: "center",
    },
    presetOptionSelected: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    presetText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: colors.text,
    },
    presetTextSelected: {
      color: colors.card,
      fontWeight: typography.fontWeight.bold,
    },
    saveButton: {
      marginTop: spacing.md,
    },
  });
}
