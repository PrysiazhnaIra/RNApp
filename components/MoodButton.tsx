import { Pressable, StyleSheet, Text } from "react-native";

type MoodButtonProps = {
  emoji: string;
  selected?: boolean;
  onPress: () => void;
  style?: object;
};
export default function MoodButton({
  emoji,
  selected,
  onPress,
  style,
}: MoodButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, selected && styles.selected]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  selected: {
    backgroundColor: "#b3e5fc",
    borderColor: "#0288d1",
  },
  emoji: {
    fontSize: 28,
  },
});
