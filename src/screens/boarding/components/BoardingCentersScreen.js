import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/boardingStyles";
import CenterCard from "./CenterCard";
import { fetchBoardingCentersApi } from "../services/boardingService";

export default function BoardingCentersScreen({ navigation, route }) {
  const city = route?.params?.city || "";
  const type = route?.params?.type || "";

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

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
      onPress={() => navigation.navigate("BoardingDetails", { centerId: item.id })}
      onViewDetails={() => navigation.navigate("BoardingDetails", { centerId: item.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {centers.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No boarding centers found</Text>
        </View>
      ) : (
        <FlatList
          data={centers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCenter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

