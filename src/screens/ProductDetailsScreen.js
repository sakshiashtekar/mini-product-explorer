import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/favoriteSlice";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.favorites.items
  );

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  const handleFavorite = () => {
    dispatch(toggleFavorite(product));

    Alert.alert(
      isFavorite
        ? "Removed from Favorites"
        : "Added to Favorites"
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
        />

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        {product.rating && (
          <Text style={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        )}

        {/* Styled Button */}
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.removeButton,
          ]}
          onPress={handleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.favoriteText}>
            {isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 5,
  },
  category: {
    fontSize: 13,
    color: "gray",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    marginBottom: 20,
  },
  favoriteButton: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
  },
  favoriteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});