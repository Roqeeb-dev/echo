import { useEffect, useState } from "react";
import { Redirect, Slot, useSegments } from "expo-router";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme";

export default function RootLayout() {
  const { colors, typography } = useTheme();
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const segments = useSegments();

  useEffect(() => {
    AsyncStorage.getItem("hasOnboarded")
      .then((value) => {
        setHasOnboarded(value === "true");
      })
      .catch((error) => {
        console.log("Error reading onboarding status:", error);
        setHasOnboarded(false);
      });
  }, []);

  if (hasOnboarded === null) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.accent} />
        <Text
          style={{
            marginTop: 16,
            color: colors.textMuted,
            fontFamily: typography.fontFamily.heading,
            fontSize: typography.fontSize.subheading,
          }}
        >
          Echo
        </Text>
      </View>
    );
  }

  const inOnboarding = segments[0] === "onboarding";

  // Not onboarded yet, and NOT already inside onboarding → send them there
  if (!hasOnboarded && !inOnboarding) {
    return <Redirect href="/onboarding/welcome" />;
  }

  // Already onboarded, but somehow still on an onboarding screen → send to main app
  if (hasOnboarded && inOnboarding) {
    return <Redirect href="/(tabs)/record" />;
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
