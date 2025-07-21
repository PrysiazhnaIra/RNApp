import EntryCard from "@/components/EntryCard";
import SearchBar from "@/components/SearchBar";
import { useEntries } from "@/context/EntriesContext";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EntryCard entry={item} />}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 100,
          backgroundColor: colors.background,
        }}
        ListHeaderComponent={
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...styles.title, color: colors.text }}>
              Welcome to Mood Diary!
            </Text>

            <TouchableOpacity onPress={toggleTheme}>
              <Text
                style={{
                  ...styles.addBtn,
                  color: colors.text,
                  marginBottom: 25,
                }}
              >
                {theme === "dark"
                  ? "🌞 Switch to Light Mode"
                  : "🌙 Switch to Dark Mode"}
              </Text>
            </TouchableOpacity>

            <Link href="/calendar" asChild>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: colors.buttonBackground,
                  marginBottom: 22,
                }}
              >
                <Text style={{ color: colors.buttonText }}>
                  🗓️ View Calendar
                </Text>
              </TouchableOpacity>
            </Link>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <Link href="/add-entry" asChild>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: colors.buttonBackground,
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: colors.buttonText }}>➕ Add Entry</Text>
              </TouchableOpacity>
            </Link>
          </View>
        }
        ListFooterComponent={
          <View style={{ alignItems: "center" }}>
            <Link href="/about" asChild>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: colors.buttonBackground,
                  marginTop: 16,
                }}
              >
                <Text style={{ color: colors.buttonText }}>ℹ️ About App</Text>
              </TouchableOpacity>
            </Link>
          </View>
        }
      />
    </KeyboardAvoidingView>
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
