import MoodButton from "@/components/MoodButton";
import { useEntries } from "@/context/EntriesContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddEntryScreen() {
  const [note, setNote] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const { addEntry } = useEntries();
  const router = useRouter();

  const moods = ["😊", "😐", "😢", "😠", "🙈", "🤸‍♂️", "🔥"];

  const handleSave = () => {
    if (!mood) {
      alert("Please select a mood before saving.");
      return;
    }
    addEntry({ mood, note });
    setNote("");
    setMood(null);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How do you feel today?</Text>

      <View>
        {moods.map((item) => (
          <MoodButton
            key={item}
            emoji={item}
            selected={mood === item}
            onPress={() => setMood(item)}
          />
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
