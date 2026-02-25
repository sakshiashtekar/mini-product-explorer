import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSearchQuery,
  setCategory,
} from "../redux/slices/productSlice";
import CategoryFilter from "../components/CategoryFilter";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    filteredItems,
    items,
    loading,
    error,
    searchQuery,
    selectedCategory,
  } = useSelector((state) => state.products);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const categories = [
    "All",
    ...new Set(items.map((item) => item.category)),
  ];

  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>{error}</Text>
        <Button
          title="Retry"
          onPress={() => dispatch(fetchProducts())}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) =>
          dispatch(setSearchQuery(text))
        }
        style={styles.search}
      />

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => dispatch(setCategory(cat))}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                product: item,
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>
                ₹ {item.price}
              </Text>
              <Text style={styles.category}>
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f2f2f2" },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 12,
    borderRadius: 15,
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  info: { flex: 1, marginLeft: 15 },
  title: { fontWeight: "600" },
  price: {
    fontWeight: "bold",
    color: "#4A90E2",
    marginVertical: 5,
  },
  category: { fontSize: 12, color: "gray" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});