import { Entry, useEntries } from "@/context/EntriesContext";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  entry: Entry;
};

export default function EntryCard({ entry }: Props) {
  const { deleteEntry } = useEntries();
  const router = useRouter();

  const formattedDate = entry.date
    ? format(new Date(entry.date), "dd MMMM yyyy, HH:mm")
    : "No date";

  const openDetails = () => {
    router.push(`/entry/${entry.id}`);
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
    Toast.show({
      type: "success",
      text1: "The entry was deleted successfully ✅",
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
    <TouchableOpacity onPress={openDetails} activeOpacity={0.7}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{entry.mood}</Text>
        <Text style={styles.note}>{entry.note}</Text>
        <Text style={styles.date}>{formattedDate}</Text>

        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "floralwhite",
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
  deleteButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
  },
});
