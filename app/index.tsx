import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontFamily: "roboto" }}>Home Screen</Text>
      <Link href="/onboarding/welcome">Go to onboarding</Link>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
