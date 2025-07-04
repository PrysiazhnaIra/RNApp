import { Entry, useEntries } from "@/context/EntriesContext";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  entry: Entry;
};

export default function EntryCard({ entry }: Props) {
  const { deleteEntry } = useEntries();

  const handleDelete = () => {
    deleteEntry(entry.id);
    Toast.show({
      type: "success",
      text1: "The entry was deleted ✅",
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete entry?",
      "This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{entry.mood}</Text>
      <Text style={styles.note}>{entry.note}</Text>
      <Button title="🗑 Видалити" onPress={confirmDelete} />
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
