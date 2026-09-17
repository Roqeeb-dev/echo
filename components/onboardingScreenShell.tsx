import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../theme";
import Button from "../components/Button";

interface OnboardingScreenShellProps {
  children: React.ReactNode;
  activeStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onBack?: () => void;
  nextButtonTitle?: string;
  onDotPress?: (index: number) => void;
}

export default function OnboardingScreenShell({
  children,
  activeStep = 0,
  totalSteps = 3,
  onNext,
  onBack,
  nextButtonTitle = "Next",
  onDotPress,
}: OnboardingScreenShellProps) {
  const { colors, spacing } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const showBackButton = activeStep > 0;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Dynamic Screen Content */}
      <View style={styles.contentContainer}>{children}</View>

      {/* Bottom Actions Section */}
      <View
        style={[
          styles.bottomBar,
          { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
        ]}
      >
        {/* Pagination Indicator */}
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

        {/* Primary Action Button */}
        <Button title={nextButtonTitle} onPress={onNext} />

        {showBackButton && (
          <Button
            title="Back"
            variant="ghost"
            onPress={handleBack}
            style={{ marginTop: spacing.xs }}
          />
        )}
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
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    textAlign: "center",
  },
});
