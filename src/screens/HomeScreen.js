import { ScrollView, View } from "react-native";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DogGallery from "../components/DogGallery";

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View style={{ flex: 1 }}>
        <Hero />
        <Categories />
        <DogGallery />
      </View>
    </ScrollView>
  );
}
