import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import {
  MOCK_CAPSULES as capsules,
  CapsuleMock,
} from "../../lib/mock_capsules";

export default function Capsule() {
  const { colors, typography, spacing, radius } = useTheme();
  const styles = createStyles(colors, typography, spacing, radius);

  const renderCapsuleItem = ({ item }: { item: CapsuleMock }) => {
    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        {/* Left Status Icon */}
        <View
          style={[
            styles.iconBadge,
            {
              backgroundColor: item.isLocked ? colors.locked : colors.accent,
            },
          ]}
        >
          <Feather
            name={item.isLocked ? "lock" : "unlock"}
            size={18}
            color={colors.card}
          />
        </View>

        {/* Middle Details */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardDate}>
            {item.isLocked
              ? `Unlocks ${item.unlockDate}`
              : `Recorded ${item.recordedAt}`}
          </Text>
        </View>

        {/* Right Duration & Tag */}
        <View style={styles.rightMeta}>
          <Text style={styles.durationText}>{item.duration}</Text>
          <View
            style={[
              styles.statusTag,
              {
                backgroundColor: item.isLocked
                  ? colors.background
                  : colors.success + "20",
              },
            ]}
          >
            <Text
              style={[
                styles.statusTagText,
                {
                  color: item.isLocked ? colors.textMuted : colors.success,
                },
              ]}
            >
              {item.isLocked ? "Locked" : "Available"}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Capsules</Text>
      </View>

      <FlatList
        data={capsules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.content}>
            <Text style={styles.emptyTitle}>No capsules yet</Text>
            <Text style={styles.emptySubtitle}>
              Record your first message to get started
            </Text>
          </View>
        }
        renderItem={renderCapsuleItem}
      />
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
    listContainer: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
      gap: spacing.md,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: radius.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardPressed: {
      opacity: 0.85,
    },
    iconBadge: {
      width: 40,
      height: 40,
      borderRadius: radius.full,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },
    cardContent: {
      flex: 1,
      justifyContent: "center",
    },
    cardTitle: {
      fontSize: typography.fontSize.body,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text,
      marginBottom: 2,
    },
    cardDate: {
      fontSize: typography.fontSize.xs,
      color: colors.textMuted,
    },
    rightMeta: {
      alignItems: "flex-end",
      justifyContent: "center",
      marginLeft: spacing.xs,
    },
    durationText: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      color: colors.textMuted,
      marginBottom: spacing.xs,
    },
    statusTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: radius.sm,
    },
    statusTagText: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xxl,
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
