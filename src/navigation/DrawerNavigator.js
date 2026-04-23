import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import { View, Image, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import RefundPolicyScreen from "../screens/RefundPolicyScreen";
import TermsOfUseScreen from "../screens/TermsOfUseScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      {/* Profile */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Main", { screen: "Profile" })}
      >
        <Ionicons name="person-outline" size={22} />
        <Text style={styles.text}>Profile</Text>
      </Pressable>

      {/* Notifications */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Notification")}
      >
        <Ionicons name="notifications-outline" size={22} />
        <Text style={styles.text}>Notifications</Text>
      </Pressable>

      {/* Privacy Policy */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Ionicons name="shield-checkmark-outline" size={22} />
        <Text style={styles.text}>Privacy Policy</Text>
      </Pressable>

      {/* Terms */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Terms")}
      >
        <Ionicons name="document-text-outline" size={22} />
        <Text style={styles.text}>Terms of Use</Text>
      </Pressable>

      {/* Refund Policy */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("RefundPolicy")}
      >
        <Ionicons name="cash-outline" size={22} />
        <Text style={styles.text}>Refund Policy</Text>
      </Pressable>

      {/* Logout */}
      <Pressable
        style={[styles.item, { marginTop: 20 }]}
        onPress={() => {
          console.log("Logout pressed");
          navigation.closeDrawer();
        }}
      >
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={[styles.text, { color: "red" }]}>Logout</Text>
      </Pressable>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
            style={{
              marginLeft: 15,
              backgroundColor: "#f2f2f2",
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name="menu" size={28} color="black" />
          </Pressable>
        ),

        headerRight: () => (
          <Pressable
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Notification")}
          >
            <Ionicons name="notifications-outline" size={26} color="black" />
          </Pressable>
        ),
      })}
    >
      {/* Main Tabs */}
      <Drawer.Screen
        name="Main"
        component={BottomTabs}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      {/* Extra Screens */}
      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="RefundPolicy" component={RefundPolicyScreen} />
      <Drawer.Screen name="Terms" component={TermsOfUseScreen} />
    </Drawer.Navigator>
  );
}

const styles = {
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
};
