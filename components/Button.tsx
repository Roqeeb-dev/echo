import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../theme";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  title?: string;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export default function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  style,
  textStyle,
  children,
  ...props
}: ButtonProps) {
  const { colors, typography, spacing, radius } = useTheme();

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.locked;
    if (variant === "secondary") return colors.card;
    if (variant === "outline") return "transparent";

    return colors.accent;
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (variant === "outline" || variant === "secondary") return colors.text;
    return "#ffffff";
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderRadius: radius.full,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderColor: variant === "outline" ? colors.border : "transparent",
          borderWidth: variant === "outline" ? 1 : 0,
          opacity: pressed && !disabled ? 0.85 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        children || (
          <Text
            style={[
              {
                color: getTextColor(),
                fontSize: typography.fontSize.subheading,
                fontWeight: typography.fontWeight.semibold,
                letterSpacing: typography.letterSpacing.normal,
                textAlign: "center",
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
