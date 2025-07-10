import { useEntries } from "@/context/EntriesContext";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function EditEntryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { entries, editEntry } = useEntries();

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const entry = entries.find((entry) => entry.id.toString() === id);

  const [mood, setMood] = useState(entry?.mood || "");
  const [note, setNote] = useState(entry?.note || "");

  if (!entry) {
    return (
      <View style={{ ...styles.container, backgroundColor: colors.background }}>
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
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={{ ...styles.label, color: colors.text }}>
        Enter your mood with emoji
      </Text>
      <TextInput
        style={{ ...styles.input, color: colors.text }}
        value={mood}
        onChangeText={setMood}
        placeholder="😊"
      />
      <Text style={{ ...styles.label, color: colors.text }}>
        Enter your note
      </Text>
      <TextInput
        style={{ ...styles.input, color: colors.text }}
        value={note}
        onChangeText={setNote}
        multiline
        placeholder="Describe your feelings..."
      />

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: colors.buttonBackground }}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
    padding: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: "red",
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
});
