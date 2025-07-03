import { createContext, useContext, useState } from "react";

export type Entry = {
  id: number;
  mood: string;
  note: string;
};

type EntriesContextType = {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, "id">) => void;
};

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export function EntriesProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = (entry: Omit<Entry, "id">) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
    };
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry }}>
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
