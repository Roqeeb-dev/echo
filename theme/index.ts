import { useThemeStore } from "../store/useThemeStore";
import { light, dark } from "./colors";
import { typography } from "./typography";
import { spacing, radius } from "./spacing";

export function useTheme() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const colors = isDark ? dark : light;

  return { colors, typography, spacing, radius, isDark, toggleTheme };
}
