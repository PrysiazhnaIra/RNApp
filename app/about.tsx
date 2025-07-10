import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.iconContainer}>
        <Ionicons name="happy-outline" size={64} color="#4CAF50" />
      </View>

      <Text style={styles.heading}>Mood Diary</Text>
      <Text style={styles.tagline}>Track your mood. Reflect. Grow. 🌱</Text>

      <View
        style={{
          ...styles.card,
          backgroundColor: colors.card,
          borderColor: colors.text,
        }}
      >
        <MaterialIcons name="info-outline" size={20} color="#4CAF50" />
        <Text style={styles.cardText}>
          Mood Diary helps you capture your emotions and thoughts, building
          emotional awareness and mindfulness.
        </Text>
      </View>

      <View
        style={{
          ...styles.card,
          backgroundColor: colors.card,
          borderColor: colors.text,
        }}
      >
        <MaterialIcons name="lock-outline" size={20} color="#4CAF50" />
        <Text style={styles.cardText}>
          Your data stays on your device. No cloud. No ads. Just privacy.
        </Text>
      </View>

      <View
        style={{
          ...styles.card,
          backgroundColor: colors.card,
          borderColor: colors.text,
        }}
      >
        <MaterialIcons name="code" size={20} color="#4CAF50" />
        <Text style={styles.cardText}>Built with React Native & Expo</Text>
      </View>

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} Created by IraPrysiazhna
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
    backgroundColor: "#E8F5E9",
    borderRadius: 100,
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    gap: 12,
  },
  cardText: {
    flex: 1,
    fontSize: 15,
    color: "#444",
  },
  footer: {
    marginTop: 40,
    fontSize: 13,
    color: "#999",
  },
  button: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
