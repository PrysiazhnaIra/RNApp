import { Entry, useEntries } from "@/context/EntriesContext";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = {
  entry: Entry;
};

export default function EntryCard({ entry }: Props) {
  const { deleteEntry } = useEntries();

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{entry.mood}</Text>
      <Text style={styles.note}>{entry.note}</Text>
      <Button title="🗑 Видалити" onPress={() => deleteEntry(entry.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  note: {
    fontSize: 16,
  },
});
