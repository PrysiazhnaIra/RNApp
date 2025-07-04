import { EntriesProvider } from "@/context/EntriesContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <EntriesProvider>
        <Stack />
      </EntriesProvider>
      <Toast />
    </>
  );
}
