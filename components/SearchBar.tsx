import { useThemeContext } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search your note..."
        value={value}
        onChangeText={onChange}
        style={{
          ...styles.searchInput,
          backgroundColor: colors.card,
          color: colors.text,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
