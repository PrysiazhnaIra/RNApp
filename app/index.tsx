import EntryCard from "@/components/EntryCard";
import { useEntries } from "@/context/EntriesContext";
import { Link } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { entries } = useEntries();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mood Diary!</Text>

      <Link href="/add-entry" asChild>
        <Button title="Add New Entry" />
      </Link>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EntryCard entry={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  list: { marginTop: 24 },
});
