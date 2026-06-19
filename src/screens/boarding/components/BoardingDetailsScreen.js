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
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import styles from "../styles/BoardingDetailsScreen";
import {
  fetchBoardingCenterByIdApi,
  fetchCapacityApi,
} from "../services/boardingService";

const { width } = Dimensions.get("window");

export default function BoardingDetailsScreen({ route, navigation }) {
  const { centerId } = route.params;

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState(null);
  const [capacityLoading, setCapacityLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const photoList = Array.isArray(center?.images)
    ? center.images
    : Array.isArray(center?.center_photos)
      ? center.center_photos
      : [];

  const handleImageScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== currentImageIndex) {
      setCurrentImageIndex(index);
    }
  };

  const handleBookingPress = async () => {
    const guestRole = await AsyncStorage.getItem("guestRole");
    if (guestRole) {
      Alert.alert(
        "Sign in required",
        "Please sign in or sign up to book this center.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Sign In / Sign Up",
            onPress: () => navigation.navigate("Auth"),
          },
        ],
      );
      return;
    }

    navigation.navigate("BoardingBooking", {
      centerId: center.id,
      centerName: center.center_name,
      pricePerDay: center.price_per_day,
      centerType: center.center_type,
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      {/* IMAGE SLIDER */}

      {photoList.length > 0 ? (
        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
          >
            {photoList.map((img, index) => (
              <View key={`${img}-${index}`} style={styles.sliderImageWrapper}>
                <Image
                  source={{ uri: img }}
                  style={styles.sliderImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={[
                    "rgba(15, 23, 42, 0)",
                    "rgba(15, 23, 42, 0.22)",
                    "rgba(15, 23, 42, 0.58)",
                  ]}
                  style={styles.sliderOverlay}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.sliderCountBadge}>
            <Text style={styles.sliderCountText}>
              {currentImageIndex + 1} / {photoList.length}
            </Text>
          </View>

          {photoList.length > 1 && (
            <View style={styles.sliderDots}>
              {photoList.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.sliderDot,
                    index === currentImageIndex && styles.sliderDotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.loaderContainer}>
          <Text style={styles.desc}>No images available</Text>
        </View>
      )}

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

          <Text style={styles.addressInfoText}>📍 {center.address}</Text>

          {!!center.address_line_2 && (
            <Text style={[styles.addressInfoText, styles.addressLine]}>
              {center.address_line_2}
            </Text>
          )}

          <Text style={[styles.addressInfoText, styles.addressLine]}>
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
            <ActivityIndicator color="#6b21a8" />
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
                style={[
                  styles.capacityStatusText,
                  { color: capacity?.data?.is_available ? "green" : "red" },
                ]}
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
          onPress={handleBookingPress}
        >
          <Text style={styles.primaryBtnText}>Book Now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

