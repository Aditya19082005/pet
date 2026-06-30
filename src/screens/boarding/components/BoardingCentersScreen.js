import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import styles from "../styles/BoardingCentersScreen";
import CenterCard from "./CenterCard";
import { fetchBoardingCentersApi } from "../services/boardingService";
import { LinearGradient } from "expo-linear-gradient";

export default function BoardingCentersScreen({ navigation, route }) {
  const city = route?.params?.city || "";
  const type = route?.params?.type || "";

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1000 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth =
    numColumns === 1
      ? width - 32
      : numColumns === 2
        ? (width - 48) / 2
        : (width - 64) / 3;

  useEffect(() => {
    fetchCenters();
  }, [city, type]);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const list = await fetchBoardingCentersApi(city, type);
      setCenters(list);
    } catch (error) {
      console.log("Boarding List Error:", error);
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  const renderCenter = ({ item }) => (
    <CenterCard
      item={item}
      cardWidth={cardWidth}
      onPress={() =>
        navigation.navigate("BoardingDetails", { centerId: item.id })
      }
      onViewDetails={() =>
        navigation.navigate("BoardingDetails", { centerId: item.id })
      }
    />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

 return (
  <LinearGradient
    colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.wrapper}
  >
      {centers.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No boarding centers found</Text>
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={centers}
          numColumns={numColumns}
          renderItem={renderCenter}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
          columnWrapperStyle={
            numColumns > 1
              ? {
                  justifyContent: "flex-start",
                }
              : undefined
          }
        />
      )}
    </LinearGradient>
  );
}
