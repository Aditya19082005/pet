import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../constants/api";
import styles from "../styles/boardingStyles";

import { fetchMyBookingsApi } from "../services/boardingService";
import { fetchPetImagesApi } from "../../pets/services/imageService";

const screenWidth = Dimensions.get("window").width;

const normalizeBookingPetImage = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${BASE_URL}${url}`;
  return `${BASE_URL}/${url}`;
};

const getBookingPetId = (booking) => {
  return (
    booking?.pet?.pet_id ||
    booking?.pet?.id ||
    booking?.pet_id ||
    booking?.petId ||
    booking?.pet?.petId ||
    booking?.pet_info?.pet_id ||
    booking?.pet_info?.id ||
    booking?.pet_details?.pet_id ||
    booking?.pet_data?.pet_id
  );
};

const getBookingPetImageUrl = (booking) => {
  let pet =
    booking?.pet ||
    booking?.pet_details ||
    booking?.pet_data ||
    booking?.petInfo ||
    booking?.pet_info ||
    booking?.pet_details?.pet ||
    booking?.pet_data?.pet ||
    booking?.pet_images ||
    booking?.images ||
    booking?.photos ||
    booking?.petPhotos;

  if (Array.isArray(pet) && pet.length > 0) {
    pet = pet[0];
  }

  if (!pet || typeof pet !== "object") {
    if (typeof pet === "string" && pet.trim()) {
      return normalizeBookingPetImage(pet.trim());
    }
    return "";
  }

  const candidateFields = [
    "profile_image",
    "pet_profile_image",
    "pet_image",
    "image",
    "image_url",
    "url",
    "imageUrl",
    "photo",
    "photo_url",
    "photoUrl",
    "avatar",
    "pet_avatar",
    "pet_photo",
    "pet_photo_url",
    "pet_image_path",
    "image_path",
    "thumbnail",
    "thumbnail_url",
  ];

  for (const field of candidateFields) {
    const value = pet[field];
    if (typeof value === "string" && value.trim()) {
      return normalizeBookingPetImage(value.trim());
    }
  }

  const listFields = [
    "images",
    "photos",
    "pet_images",
    "petPhotos",
    "pet_images_list",
    "images_list",
    "pet_photos",
    "media",
  ];

  for (const listField of listFields) {
    const arr = pet[listField];
    if (Array.isArray(arr) && arr.length > 0) {
      const imageObject = arr[0];
      if (imageObject && typeof imageObject === "object") {
        for (const field of candidateFields) {
          const value = imageObject[field];
          if (typeof value === "string" && value.trim()) {
            return normalizeBookingPetImage(value.trim());
          }
        }
      }
    }
  }

  return "";
};

export default function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const [petProfileImages, setPetProfileImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await fetchMyBookingsApi(token);
      const bookingsData = data || [];
      setBookings(bookingsData);

      const missingImagePetIds = bookingsData.reduce((acc, booking) => {
        const petId = getBookingPetId(booking);
        if (petId && !getBookingPetImageUrl(booking) && !acc.includes(petId)) {
          acc.push(petId);
        }
        return acc;
      }, []);

      if (missingImagePetIds.length > 0) {
        const imageResults = await Promise.all(
          missingImagePetIds.map(async (petId) => {
            const images = await fetchPetImagesApi(petId);
            const profileImage =
              images.find(
                (img) =>
                  img?.is_profile === "1" ||
                  img?.is_profile === 1 ||
                  img?.is_profile === true,
              ) || images[0];

            return [
              petId,
              profileImage?.image_url || profileImage?.url || profileImage?.image || "",
            ];
          }),
        );

        setPetProfileImages(
          Object.fromEntries(imageResults.filter(([, url]) => url)) || {},
        );
      }
    } catch (error) {
      console.log("Booking Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingType = (booking) => {
    const today = new Date();
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);

    if (today < start) {
      return {
        type: "Upcoming",
        gradient: ["#60a5fa", "#2563eb"],
        bg: "#eff6ff",
        badgeBg: "#bfdbfe",
        badgeText: "#1d4ed8",
        iconColor: "#2563eb",
      };
    }

    if (today >= start && today <= end) {
      return {
        type: "Active Boarding",
        gradient: ["#4ade80", "#16a34a"],
        bg: "#f0fdf4",
        badgeBg: "#bbf7d0",
        badgeText: "#166534",
        iconColor: "#16a34a",
      };
    }

    return {
      type: "Completed",
      gradient: ["#c084fc", "#9333ea"],
      bg: "#faf5ff",
      badgeBg: "#e9d5ff",
      badgeText: "#6b21a8",
      iconColor: "#9333ea",
    };
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  return (
    <View style={styles.bookingStatusContainer}>
      <Text style={styles.bookingStatusTitle}>
        Your Booking <Text style={styles.bookingStatusGradientText}>Status</Text>
      </Text>

      <Text style={styles.bookingStatusSubtitle}>
        Track all your pet's boarding reservations ??
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bookingStatusScrollContainer}
      >
        {bookings.map((booking) => {
          const bookingInfo = getBookingType(booking);
          const bookingPetId = getBookingPetId(booking);
          const bookingPetImageUrl =
            getBookingPetImageUrl(booking) ||
            (bookingPetId ? petProfileImages[String(bookingPetId)] : "");

          return (
            <View
              key={booking.id}
              style={[
                styles.bookingStatusCard,
                { backgroundColor: bookingInfo.bg },
              ]}
            >
              <View style={styles.bookingStatusRow}>
                <View style={styles.bookingStatusPetRow}>
                  {bookingPetImageUrl ? (
                    <Image
                      source={{ uri: bookingPetImageUrl }}
                      style={styles.bookingStatusPetImage}
                    />
                  ) : (
                    <LinearGradient
                      colors={bookingInfo.gradient}
                      style={styles.bookingStatusIconBox}
                    >
                      <Text style={styles.bookingStatusPetEmoji}>
                        {booking.pet?.pet_type === "dog" ? "🐶" : "🐱"}
                      </Text>
                    </LinearGradient>
                  )}

                  <View>
                    <Text style={styles.bookingStatusPetName}>
                      {booking.pet?.pet_name}
                    </Text>
                    <Text style={styles.bookingStatusType}>{bookingInfo.type}</Text>
                  </View>
                </View>

                <MaterialCommunityIcons
                  name="clock-outline"
                  size={22}
                  color={bookingInfo.iconColor}
                />
              </View>

              <View
                style={[
                  styles.bookingStatusBadge,
                  { backgroundColor: bookingInfo.badgeBg },
                ]}
              >
                <Text
                  style={[
                    styles.bookingStatusBadgeText,
                    { color: bookingInfo.badgeText },
                  ]}
                >
                  {booking.status?.toUpperCase()}
                </Text>
              </View>

              <View style={styles.bookingStatusInfoBox}>
                <Text style={styles.bookingStatusLabel}>Boarding Center</Text>
                <Text style={styles.bookingStatusValue}>
                  {booking.center?.center_name}
                </Text>
              </View>

              <View style={styles.bookingStatusInfoBox}>
                <Text style={styles.bookingStatusLabel}>Check In</Text>
                <Text style={styles.bookingStatusValue}>
                  {booking.start_date}
                </Text>
              </View>

              <View style={styles.bookingStatusInfoBox}>
                <Text style={styles.bookingStatusLabel}>Check Out</Text>
                <Text style={styles.bookingStatusValue}>
                  {booking.end_date}
                </Text>
              </View>

              <View style={styles.bookingStatusInfoBox}>
                <Text style={styles.bookingStatusLabel}>Total Days</Text>
                <Text style={styles.bookingStatusValue}>
                  {booking.total_days}
                </Text>
              </View>

              <View style={styles.bookingStatusInfoBox}>
                <Text style={styles.bookingStatusLabel}>Total Cost</Text>
                <Text
                  style={[
                    styles.bookingStatusCostText,
                    { color: bookingInfo.gradient[1] },
                  ]}
                >
                  ₹{booking.total_price}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

