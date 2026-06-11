// src/navigation/PetStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PetsScreen from "../screens/pets/components/PetScreen";
import PetDetailsScreen from "../screens/pets/components/PetDetailsScreen";

const Stack = createNativeStackNavigator();

export default function PetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pets"
        component={PetsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PetDetails"
        component={PetDetailsScreen}
        options={{
          title: "Pet Details",
        }}
      />
    </Stack.Navigator>
  );
}
