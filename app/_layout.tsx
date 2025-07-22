import { EntriesProvider } from "@/context/EntriesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function Layout() {
  useEffect(() => {
    const registerForPushNotifications = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("You don't have a permission for sending notifications!");
          return;
        }
      } else {
        alert("Use a mobile to send notifications!");
      }
    };

    registerForPushNotifications();
  }, []);

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
