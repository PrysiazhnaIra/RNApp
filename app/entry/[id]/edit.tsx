import { useEntries } from "@/context/EntriesContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditEntryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { entries, editEntry } = useEntries();

  const entry = entries.find((entry) => entry.id.toString() === id);

  const [mood, setMood] = useState(entry?.mood || "");
  const [note, setNote] = useState(entry?.note || "");

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>The entry is not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleSave = () => {
    if (!mood || !note) {
      Alert.alert("Please fill in both mood and note.");
      return;
    }

    const updatedEntry = {
      ...entry,
      mood,
      note,
    };
    editEntry(updatedEntry);
    router.back();
    Toast.show({
      type: "success",
      text1: "The entry was updated ✅",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your mood with emoji</Text>
      <TextInput
        style={styles.input}
        value={mood}
        onChangeText={setMood}
        placeholder="😊"
      />
      <Text style={styles.label}>Enter your note</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        multiline
        placeholder="Describe your feelings..."
      />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});
