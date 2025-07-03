import { EntriesProvider } from "@/context/EntriesContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <EntriesProvider>
      <Stack />
    </EntriesProvider>
  );
}
