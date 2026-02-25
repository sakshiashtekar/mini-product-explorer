import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat) => {
          const isSelected = selected === cat;

          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                isSelected && styles.selectedChip,
              ]}
              activeOpacity={0.8}
              onPress={() => onSelect(cat)}
            >
              <Text
                style={[
                  styles.text,
                  isSelected && styles.selectedText,
                ]}
                numberOfLines={1}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingVertical: 5,
  },
  chip: {
    height: 36,                // 👈 fixed height
    paddingHorizontal: 18,
    borderRadius: 18,          // 👈 perfect pill shape
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: "#4A90E2",
  },
  text: {
    fontSize: 13,
    color: "#333",
    textTransform: "capitalize",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});