import React, {
  useEffect,
  useState,
} from "react";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";

import {
  ThemeProvider,
  useTheme,
} from "./src/context/ThemeContext";

import {
  View,
  ActivityIndicator,
} from "react-native";

const Stack = createNativeStackNavigator();

function MainApp() {

  const { isDark } = useTheme();

  const [loading, setLoading] =
    useState(true);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  // CHECK LOGIN
  const checkLogin = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      setIsLoggedIn(!!token);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    checkLogin();

    // AUTO CHECK EVERY SECOND
    const interval = setInterval(() => {
      checkLogin();
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  if (loading) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <NavigationContainer
      theme={
        isDark
          ? DarkTheme
          : DefaultTheme
      }
    >

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {isLoggedIn ? (

        <Stack.Screen
  name="RootDrawer"
  component={DrawerNavigator}
/>

        ) : (

          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
          />

        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}