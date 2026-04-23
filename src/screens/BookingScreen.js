import { View, ScrollView } from "react-native";
import BookingStatus from "../components/BookingStatus";
import BookingInterface from "../components/BookingInterface";
import PickupDropManagement from "../components/PickupDropManagement";

export default function BookingScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9fafb" }}
      contentContainerStyle={{
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <BookingInterface />
        <BookingStatus />
        <PickupDropManagement />
      </View>
    </ScrollView>
  );
}
