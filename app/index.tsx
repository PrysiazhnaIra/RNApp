import EntryCard from "@/components/EntryCard";
import { useEntries } from "@/context/EntriesContext";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { entries } = useEntries();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredEntries = entries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.note.toLowerCase().includes(query) ||
      entry.mood.toLowerCase().includes(query)
    );
  });

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const { toggleTheme } = useThemeContext();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={{ ...styles.title, color: colors.text }}>
        Welcome to Mood Diary!
      </Text>

      <TouchableOpacity onPress={toggleTheme}>
        <Text
          style={{ ...styles.addBtn, color: colors.text, marginBottom: 25 }}
        >
          {theme === "dark"
            ? "🌞 Switch to Light Mode"
            : "🌙 Switch to Dark Mode"}
        </Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search your note..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            ...styles.searchInput,
            backgroundColor: colors.card,
            color: colors.text,
          }}
        />
      </View>

      <Link href="/add-entry" asChild>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.buttonBackground,
          }}
        >
          <Text style={{ color: colors.buttonText }}>➕ Add Entry</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EntryCard entry={item} />}
        contentContainerStyle={styles.list}
      />

      <Link href="/about" asChild>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
        >
          <Text style={{ color: colors.buttonText }}>ℹ️ About App</Text>
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
    marginBottom: 20,
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
  searchContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
