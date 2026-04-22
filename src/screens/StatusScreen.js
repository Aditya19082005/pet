import { View, ScrollView } from "react-native";
import LiveUpdates from "../components/LiveUpdates";

export default function StatusScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9fafb" }}
      contentContainerStyle={{
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <LiveUpdates />
      </View>
    </ScrollView>
  );
}
