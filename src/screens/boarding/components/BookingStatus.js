import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/boardingStyles";

import { fetchMyBookingsApi } from "../services/boardingService";

const screenWidth = Dimensions.get("window").width;

export default function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await fetchMyBookingsApi(token);
      setBookings(data || []);
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                  <LinearGradient
                    colors={bookingInfo.gradient}
                    style={styles.bookingStatusIconBox}
                  >
                    <Text style={styles.bookingStatusPetEmoji}>
                      {booking.pet?.pet_type === "dog" ? "??" : "??"}
                    </Text>
                  </LinearGradient>

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
                  style={{
                    color: bookingInfo.badgeText,
                    fontWeight: "600",
                  }}
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
                  ?{booking.total_price}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
