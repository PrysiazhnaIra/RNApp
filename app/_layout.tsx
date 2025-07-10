import { EntriesProvider } from "@/context/EntriesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <ThemeProvider>
        <EntriesProvider>
          <Stack />
        </EntriesProvider>
        <Toast />
      </ThemeProvider>
    </>
  );
}
