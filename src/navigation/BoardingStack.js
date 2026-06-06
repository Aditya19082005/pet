import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingCentersScreen from "../screens/boarding/BoardingCentersScreen";
import BoardingDetailsScreen from "../screens/boarding/BoardingDetailsScreen";
import BoardingBookingScreen from "../screens/boarding/BoardingBookingScreen";

const Stack = createNativeStackNavigator();

export default function BoardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="BoardingCenters"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BoardingCenters" component={BoardingCentersScreen} />

      <Stack.Screen name="BoardingDetails" component={BoardingDetailsScreen} />

      <Stack.Screen name="BoardingBooking" component={BoardingBookingScreen} />
    </Stack.Navigator>
  );
}
