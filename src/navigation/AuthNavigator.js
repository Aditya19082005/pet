import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../components/Register";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}