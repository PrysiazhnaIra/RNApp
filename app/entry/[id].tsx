import { useEntries } from "@/context/EntriesContext";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EntryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { entries } = useEntries();

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const entry = entries.find((entry) => entry.id.toString() === id);

  if (!entry) {
    return (
      <View style={{ ...styles.container, backgroundColor: colors.background }}>
        <Text style={styles.error}>The entry is not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View>
        <Text style={styles.emoji}>{entry.mood}</Text>
        <Text style={styles.note}>{entry.note}</Text>
        <Text style={{ fontSize: 14, color: "#888" }}>
          The entry was created:{" "}
          {entry.date
            ? format(new Date(entry.date), "dd MMM yyyy, HH:mm")
            : "Date unknown"}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
          onPress={() => router.push(`/entry/${entry.id}/edit`)}
        >
          <Text style={styles.buttonText}>✏️ Edit Entry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flex: 1,
    justifyContent: "space-evenly",
  },
  emoji: {
    fontSize: 60,
  },
  note: {
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: "red",
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
