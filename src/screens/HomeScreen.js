import { ScrollView, View, RefreshControl } from "react-native";
import { useState } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DogGallery from "../components/DogGallery";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshKey((prev) => prev + 1); // 🔥 force re-render
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9fafb" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1 }}>
        {/* pass refreshKey */}
        <Hero key={`hero-${refreshKey}`} />
        <Categories key={`cat-${refreshKey}`} />
        <DogGallery key={`dog-${refreshKey}`} />
      </View>
    </ScrollView>
  );
}
