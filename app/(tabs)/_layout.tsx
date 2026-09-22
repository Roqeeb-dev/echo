import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme";

export default function TabsLayout() {
  const { colors, typography } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShown: false,
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: typography.fontFamily.heading,
          fontSize: typography.fontSize.subheading,
        },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingTop: 8,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
        },
      }}
    >
      <Tabs.Screen
        name="record"
        options={{
          title: "Record",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "mic" : "mic-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="capsule"
        options={{
          title: "Capsules",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="save_capsule"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
