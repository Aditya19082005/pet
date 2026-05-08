import { ScrollView, View, RefreshControl } from "react-native";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 👈 IMPORT
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DogGallery from "../components/DogGallery";

export default function HomeScreen() {
  const { theme } = useTheme(); // 👈 GET THEME

  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }} // ✅ FIXED
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1 }}>
        <Hero key={`hero-${refreshKey}`} />
        <Categories key={`cat-${refreshKey}`} />
        <DogGallery key={`dog-${refreshKey}`} />
      </View>
    </ScrollView>
  );
}
