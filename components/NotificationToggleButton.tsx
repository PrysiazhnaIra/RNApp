import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";

const NOTIFICATION_KEY = "DAILY_NOTIFICATION_ENABLED";

export default function NotificationToggleButton() {
  const [isEnabled, setIsEnabled] = useState(false);

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    const loadNotificationState = async () => {
      const saved = await AsyncStorage.getItem(NOTIFICATION_KEY);
      if (saved === "true") {
        setIsEnabled(true);
      }
    };
    loadNotificationState();
  }, []);

  const triggerWithType: Notifications.CalendarTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    hour: 20,
    minute: 0,
    repeats: true,
  };

  const scheduleNotification = async () => {
    const trigger = new Date();
    trigger.setHours(20);
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Mood reminder",
        body: "Don’t forget to record your mood today!",
      },
      trigger: triggerWithType,
    });
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    await AsyncStorage.setItem(NOTIFICATION_KEY, String(newValue));

    if (newValue) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: reqStatus } =
          await Notifications.requestPermissionsAsync();
        if (reqStatus !== "granted") {
          Alert.alert(
            "Permission denied",
            "Please enable notifications in settings"
          );
          return;
        }
      }

      if (!Device.isDevice) {
        Alert.alert(
          "Use a real device",
          "Notifications don’t work on emulators"
        );
        return;
      }

      await scheduleNotification();
    } else {
      await cancelAllNotifications();
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: colors.buttonBackground,
        marginBottom: 16,
      }}
    >
      <Text style={{ color: colors.buttonText }}>
        Daily mood reminder at 20:00
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#007AFF" : "#f4f3f4"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
