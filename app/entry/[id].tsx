import { useEntries } from "@/context/EntriesContext";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function EntryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { entries } = useEntries();

  const entry = entries.find((entry) => entry.id.toString() === id);

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>The entry is not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{entry.mood}</Text>
      <Text style={styles.note}>{entry.note}</Text>
      <Text style={{ fontSize: 14, color: "#888" }}>
        The entry was created:{" "}
        {format(new Date(entry.date), "dd MMM yyyy, HH:mm")}
      </Text>

      <Button
        title="✏️ Edit Entry"
        onPress={() => router.push(`/entry/${entry.id}/edit`)}
      />
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
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
});
