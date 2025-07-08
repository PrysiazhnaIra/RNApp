import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export type Entry = {
  id: number;
  mood: string;
  note: string;
  date?: string;
};

type EntriesContextType = {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, "id" | "date">) => void;
  deleteEntry: (id: number) => void;
  editEntry: (updated: Entry) => void;
};

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

const STORAGE_KEY = "@mood_entries";

export function EntriesProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: Entry[] = JSON.parse(saved).map((entry: Entry) => ({
            ...entry,
            date: entry.date ?? new Date().toISOString(),
          }));
          setEntries(parsed);
        } else {
          Toast.show({
            type: "info",
            text1: "No entries found",
            text2: "Start adding your mood entries!",
          });
        }
      } catch (error) {
        console.error("Failed to load entries from storage:", error);
      }
    };
    loadEntries();
  }, []);

  const addEntry = (entry: Omit<Entry, "id" | "date">) => {
    const newEntry: Entry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    if (!newEntry.mood || !newEntry.note) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill in both mood and note.",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Entry added",
      text2: `Mood: ${newEntry.mood}, Note: ${newEntry.note}`,
    });

    const updated = [...entries, newEntry];
    setEntries(updated);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(
      (error: any) => {
        console.error("Failed to save entries to storage:", error);
      }
    );
  };

  const deleteEntry = (id: number) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch((error) =>
      console.error("Error saving after delete:", error)
    );
  };

  const editEntry = (updatedEntry: Entry) => {
    const updated = entries.map((entry) => {
      return entry.id === updatedEntry.id ? updatedEntry : entry;
    });
    setEntries(updated);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch((error) =>
      console.error("Error saving after edit:", error)
    );
  };

  return (
    <EntriesContext.Provider
      value={{ entries, addEntry, deleteEntry, editEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error("useEntries must be used within an EntriesProvider");
  }
  return context;
}
