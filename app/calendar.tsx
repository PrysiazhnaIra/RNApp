import { useEntries } from "@/context/EntriesContext";
import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  const { entries } = useEntries();
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const [selectedDate, setSelectedDate] = useState<string>("");

  const markedDates = entries.reduce(
    (acc, entry) => {
      const date =
        entry.date !== undefined
          ? new Date(entry.date).toISOString().split("T")[0]
          : "";

      acc[date] = {
        marked: true,
        dotColor: "#4a69bd",
        selected: selectedDate === date,
        selectedColor: "#dff9fb",
      };

      return acc;
    },
    {} as Record<string, any>
  );

  const selectedEntry = entries.find(
    (entry) =>
      entry.date !== undefined && entry.date.split("T")[0] === selectedDate
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mood Calendar</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...markedDates[selectedDate],
            selected: true,
            selectedColor: "#00BFFF",
          },
        }}
        theme={{
          calendarBackground: colors.background,
          dayTextColor: colors.text,
          monthTextColor: colors.text,
          arrowColor: colors.text,
          selectedDayBackgroundColor: "#00BFFF",
          todayTextColor: "#3c40c6",
        }}
      />

      {selectedDate && selectedEntry ? (
        <View style={[styles.entryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.entryText, { color: colors.text }]}>
            Mood: {selectedEntry.mood}
          </Text>
          <Text style={[styles.entryText, { color: colors.text }]}>
            Note: {selectedEntry.note}
          </Text>
        </View>
      ) : selectedDate ? (
        <Text style={{ color: colors.text, marginTop: 20 }}>
          No entry for this date.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },

  entryCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  entryText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
