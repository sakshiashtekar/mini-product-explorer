import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { logout } from "../redux/slices/authSlice";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* Bottom Tabs */

function MainTabs() {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        headerRight: () => (
          <TouchableOpacity
            onPress={() => dispatch(logout())}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="log-out-outline" size={24} />
          </TouchableOpacity>
        ),

        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Favorites") {
            iconName = "heart-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

/* Root Navigator */

export default function AppNavigator() {
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="Details"
              component={ProductDetailsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}