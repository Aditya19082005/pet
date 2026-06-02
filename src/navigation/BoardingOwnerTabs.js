import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import BoardingDashboardScreen from "../screens/boardingOwner/BoardingDashboardScreen";
import BoardingBookingsScreen from "../screens/boardingOwner/BoardingBookingsScreen";
import BoardingProfileScreen from "../screens/boardingOwner/BoardingProfileScreen";

const Tab = createBottomTabNavigator();

export default function BoardingOwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "Bookings") {
            iconName = "calendar-outline";
          } else {
            iconName = "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={BoardingDashboardScreen}
      />

      <Tab.Screen
        name="Bookings"
        component={BoardingBookingsScreen}
      />

      <Tab.Screen
        name="Profile"
        component={BoardingProfileScreen}
      />
    </Tab.Navigator>
  );
}