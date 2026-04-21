import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import { View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: () => (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={require(".././../assets/logo.png")}
              style={{ width: 100, height: 60, resizeMode: "contain" }}
            />
          </View>
        ),

        headerTitleAlign: "center",

        headerLeft: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="black" />
          </Pressable>
        ),

        headerRight: () => (
          <Pressable style={{ marginRight: 15 }}>
            <Ionicons name="notifications-outline" size={26} color="black" />
          </Pressable>
        ),

        drawerLabel: () => null,
      })}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabs}
        options={{
          drawerItemStyle: { display: "none" }, // hides from drawer list
        }}
      />
    </Drawer.Navigator>
  );
}
