import { ScrollView, View, RefreshControl } from "react-native";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DogGallery from "../components/DogGallery";
import BookingStatus from "./boarding/components/BookingStatus";

export default function HomeScreen() {
  const { theme } = useTheme();

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
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >


      <BookingStatus />

      <Categories key={`cat-${refreshKey}`} />

      <DogGallery key={`dog-${refreshKey}`} />
    </ScrollView>
  );
}

