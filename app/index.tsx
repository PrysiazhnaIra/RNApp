import EntryCard from "@/components/EntryCard";
import { useEntries } from "@/context/EntriesContext";
import { Link } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { entries } = useEntries();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mood Diary!</Text>

      <Link href="/add-entry" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>➕ Add Entry</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EntryCard entry={item} />}
        contentContainerStyle={styles.list}
      />

      <Link href="/about" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ℹ️ About App</Text>
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
});
