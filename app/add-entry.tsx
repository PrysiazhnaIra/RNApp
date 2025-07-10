import MoodButton from "@/components/MoodButton";
import { useEntries } from "@/context/EntriesContext";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddEntryScreen() {
  const [note, setNote] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const { addEntry } = useEntries();
  const router = useRouter();
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;

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
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ ...styles.title, color: colors.text }}>
        How do you feel today?
      </Text>

      <View style={styles.moodContainer}>
        {moods.map((item) => (
          <MoodButton
            key={item}
            emoji={item}
            selected={mood === item}
            onPress={() => setMood(item)}
            style={{
              backgroundColor:
                mood === item ? colors.buttonBackground : "#f0f0f0",
            }}
          />
        ))}
      </View>

      <TextInput
        style={{
          ...styles.input,
          color: colors.text,
          backgroundColor: colors.card,
        }}
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  button: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 8,
  },
});
