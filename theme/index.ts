import { useColorScheme } from "react-native";
import { light, dark } from "./colors";
import { typography } from "./typography";
import { spacing, radius } from "./spacing";

export function useTheme() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? dark : light;

  return { colors, typography, spacing, radius };
}
