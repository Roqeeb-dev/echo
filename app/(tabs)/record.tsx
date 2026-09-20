import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../theme";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";

export default function RecordScreen() {
  const { colors, typography, spacing, radius } = useTheme();
  const styles = createStyles(colors, typography, spacing, radius);
  const router = useRouter();

  const {
    isRecording,
    durationMillis,
    permissionGranted,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  // Format millisecond duration into MM:SS format
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        // Navigate to save screen passing the audio URI and duration
        router.push({
          pathname: "/save-capsule",
          params: { uri, duration: formatTime(durationMillis) },
        });
      }
    } else {
      await startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Record</Text>
      </View>

      <View style={styles.content}>
        {!permissionGranted && (
          <Text style={styles.permissionWarning}>
            Microphone permission is required to record audio capsules.
          </Text>
        )}

        {/* Record Button */}
        <Pressable
          style={[
            styles.recordButton,
            isRecording && { backgroundColor: colors.danger },
          ]}
          onPress={handleRecordToggle}
        >
          <Feather
            name={isRecording ? "square" : "mic"}
            size={36}
            color={colors.card}
          />
        </Pressable>

        {/* Dynamic Timer */}
        <Text style={styles.timer}>{formatTime(durationMillis)}</Text>

        {/* Contextual Instructions */}
        <Text style={styles.instruction}>
          {isRecording ? "Tap to stop recording" : "Tap to start recording"}
        </Text>
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
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
    },
    permissionWarning: {
      fontSize: typography.fontSize.xs,
      color: colors.danger,
      textAlign: "center",
      marginBottom: spacing.md,
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
    timer: {
      marginTop: spacing.xl,
      fontSize: typography.fontSize.heading,
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
      letterSpacing: typography.letterSpacing.wide,
    },
    instruction: {
      marginTop: spacing.xs,
      fontSize: typography.fontSize.sm,
      color: colors.textMuted,
    },
  });
}
