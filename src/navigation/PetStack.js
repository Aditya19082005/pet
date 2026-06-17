
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PetsScreen from "../screens/pets/components/PetScreen";
import PetDetailsScreen from "../screens/pets/components/PetDetailsScreen";

const Stack = createNativeStackNavigator();

export default function PetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PetList"
        component={PetsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PetDetails"
        component={PetDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

