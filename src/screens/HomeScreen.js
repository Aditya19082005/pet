import { ScrollView, View} from "react-native";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DogGallery from "../components/DogGallery";
import BookingStatus from "../components/BookingStatus";
import LiveUpdates from "../components/LiveUpdates";
import BookingInterface from "../components/BookingInterface";

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
    <View style={{ flex: 1 }}>
      <Hero />
      <Categories />
      <DogGallery />
      <BookingInterface />
      <BookingStatus />
      <LiveUpdates />
    </View>
  </ScrollView>
  );
}