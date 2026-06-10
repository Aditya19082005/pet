import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import styles from "./styles/boardingStyles";
import {
  fetchBoardingCenterByIdApi,
  fetchCapacityApi,
} from "./services/boardingService";

const { width } = Dimensions.get("window");

export default function BoardingDetailsScreen({ route, navigation }) {
  const { centerId } = route.params;

  const [center, setCenter] = useState(null);

  const [loading, setLoading] = useState(true);

  const [capacity, setCapacity] = useState(null);
  const [capacityLoading, setCapacityLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
    loadCapacity();
  }, [centerId]);

  const loadCapacity = async () => {
    try {
      setCapacityLoading(true);

      const data = await fetchCapacityApi(centerId);

      console.log("Capacity:", data);

      setCapacity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCapacityLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      const data = await fetchBoardingCenterByIdApi(centerId);
      setCenter(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      {/* IMAGE SLIDER */}

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {center.images?.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.sliderImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <LinearGradient
        colors={["#fff7ed", "#ffffff", "#f8fafc"]}
        style={styles.detailsContainer}
      >
        {/* TITLE */}

        <Text style={styles.title}>{center.center_name}</Text>

        <Text style={styles.desc}>{center.description}</Text>

        {/* BASIC INFO */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Center Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Type</Text>

            <Text style={styles.infoText}>{center.center_type}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Price</Text>

            <Text style={styles.price}>₹{center.price_per_day}/day</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Service Radius</Text>

            <Text style={styles.infoText}>{center.service_area_radius} km</Text>
          </View>
        </View>

        {/* ADDRESS */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Address</Text>

          <Text
            style={[
              styles.infoText,
              {
                textAlign: "left",
              },
            ]}
          >
            📍 {center.address}
          </Text>

          {!!center.address_line_2 && (
            <Text
              style={[
                styles.infoText,
                {
                  textAlign: "left",
                  marginTop: 4,
                },
              ]}
            >
              {center.address_line_2}
            </Text>
          )}

          <Text
            style={[
              styles.infoText,
              {
                textAlign: "left",
                marginTop: 4,
              },
            ]}
          >
            {center.city}, {center.state} - {center.zip_code}
          </Text>
        </View>

        {/* TIMINGS */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Working Hours</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Timings</Text>

            <Text style={styles.infoText}>
              {center.opening_time} - {center.closing_time}
            </Text>
          </View>
        </View>

        {/* CAPACITY */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Capacity Status</Text>

          {capacityLoading ? (
            <ActivityIndicator color="#f97316" />
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Total Capacity</Text>
                <Text style={styles.infoText}>
                  {capacity?.data?.total_capacity || 0}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.label}>Available</Text>
                <Text style={styles.infoText}>
                  {capacity?.data?.available_capacity || 0}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.label}>Booked</Text>
                <Text style={styles.infoText}>
                  {capacity?.data?.booked_count || 0}
                </Text>
              </View>

              <Text
                style={{
                  marginTop: 15,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: capacity?.data?.is_available ? "green" : "red",
                }}
              >
                {capacity?.data?.is_available
                  ? "🟢 Slots Available"
                  : "🔴 Fully Booked"}
              </Text>
            </>
          )}
        </View>

        {/* AMENITIES */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Amenities</Text>

          <View style={styles.amenitiesContainer}>
            {center.amenities?.map((item, index) => (
              <View key={index} style={styles.amenityBox}>
                <Text style={styles.amenityText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* BOOKING BUTTON */}

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            navigation.navigate("BoardingBooking", {
              centerId: center.id,
              centerName: center.center_name,
              pricePerDay: center.price_per_day,
              centerType: center.center_type,
            })
          }
        >
          <Text style={styles.primaryBtnText}>Book Now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}
