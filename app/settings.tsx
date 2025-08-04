import NotificationToggleButton from "@/components/NotificationToggleButton";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const { toggleTheme } = useThemeContext();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={toggleTheme}>
        <Text
          style={{
            ...styles.addBtn,
            color: colors.text,
            marginBottom: 25,
          }}
        >
          {theme === "dark" ? "🌞 Switch Theme" : "🌙 Switch Theme"}
        </Text>
      </TouchableOpacity>
      <NotificationToggleButton />

      <Link href="/calendar" asChild>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.buttonBackground,
            marginBottom: 22,
          }}
        >
          <Text style={{ color: colors.buttonText }}>🗓️ View Calendar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    color: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
  },
  list: { marginTop: 18, marginBottom: 18 },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
