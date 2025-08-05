import NotificationToggleButton from "@/components/NotificationToggleButton";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const { theme, toggleTheme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const [isTheme, setIsTheme] = useState(theme === "dark");

  const toggleSwitch = () => {
    setIsTheme(!isTheme);
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          ...styles.button,
          backgroundColor: colors.buttonBackground,
          marginBottom: 18,
        }}
      >
        <Text
          style={{
            ...styles.addBtn,
            color: colors.buttonText,
            marginBottom: 18,
          }}
        >
          {theme === "dark" ? "🌞 Toggle Theme" : "🌙 Toggle Theme"}{" "}
        </Text>
        <Switch
          value={isTheme}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isTheme ? "#007AFF" : "#f4f3f4"}
        />
      </TouchableOpacity>
      <NotificationToggleButton />

      <Link href="/calendar" asChild>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.buttonBackground,
            marginBottom: 18,
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
