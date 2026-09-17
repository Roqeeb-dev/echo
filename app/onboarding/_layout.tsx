import React from "react";
import { View, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "../../theme";
import Button from "../../components/Button";

interface OnboardingLayoutProps {
  activeStep?: number; // 0-indexed: 0, 1, or 2
  totalSteps?: number;
  onNext?: () => void;
  onDotPress?: (index: number) => void;
  nextButtonTitle?: string;
}

export default function OnboardingLayout({
  activeStep = 0,
  totalSteps = 3,
  onNext,
  onDotPress,
  nextButtonTitle = "Next",
}: OnboardingLayoutProps) {
  const { colors, spacing } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Screen Content */}
      <View style={styles.contentContainer}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Persistent Bottom Bar */}
      <View
        style={[
          styles.bottomBar,
          { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
        ]}
      >
        {/* Pagination Dots */}
        <View style={[styles.paginationContainer, { gap: spacing.xs }]}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index === activeStep;
            return (
              <Pressable
                key={index}
                onPress={() => onDotPress?.(index)}
                disabled={!onDotPress}
                hitSlop={12}
              >
                <View
                  style={[
                    styles.dot,
                    isActive
                      ? [styles.activeDot, { backgroundColor: colors.accent }]
                      : { backgroundColor: colors.border },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>

        {/* Action Button */}
        <Button title={nextButtonTitle} onPress={onNext} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottomBar: {
    width: "100%",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 16,
  },
});
