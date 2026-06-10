import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchMyBookingsApi } from "./services/boardingService";

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
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Booking <Text style={styles.gradientText}>Status</Text>
      </Text>

      <Text style={styles.subtitle}>
        Track all your pet's boarding reservations 🐾
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {bookings.map((booking) => {
          const bookingInfo = getBookingType(booking);

          return (
            <View
              key={booking.id}
              style={[
                styles.card,
                {
                  backgroundColor: bookingInfo.bg,
                },
              ]}
            >
              <View style={styles.row}>
                <View style={styles.petRow}>
                  <LinearGradient
                    colors={bookingInfo.gradient}
                    style={styles.iconBox}
                  >
                    <Text style={styles.petEmoji}>
                      {booking.pet?.pet_type === "dog" ? "🐕" : "🐈"}
                    </Text>
                  </LinearGradient>

                  <View>
                    <Text style={styles.petName}>{booking.pet?.pet_name}</Text>

                    <Text style={styles.type}>{bookingInfo.type}</Text>
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
                  styles.badge,
                  {
                    backgroundColor: bookingInfo.badgeBg,
                  },
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

              <View style={styles.infoBox}>
                <Text style={styles.label}>Boarding Center</Text>
                <Text style={styles.value}>{booking.center?.center_name}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Check In</Text>
                <Text style={styles.value}>{booking.start_date}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Check Out</Text>
                <Text style={styles.value}>{booking.end_date}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Total Days</Text>
                <Text style={styles.value}>{booking.total_days}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Total Cost</Text>

                <Text
                  style={[
                    styles.costText,
                    {
                      color: bookingInfo.gradient[1],
                    },
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 60, // increase as needed
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
  },

  gradientText: {
    color: "#9333ea",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 15,
  },

  scrollContainer: {
    paddingHorizontal: 15,
  },

  card: {
    width: screenWidth * 0.82,
    borderRadius: 25,
    marginRight: 15,
    padding: 10,
    overflow: "hidden",
    marginBottom: 10,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  petRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  petEmoji: {
    fontSize: 22,
  },

  petName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827",
  },

  type: {
    color: "#6b7280",
    fontSize: 12,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginVertical: 10,
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },

  label: {
    fontSize: 11,
    color: "#6b7280",
  },

  value: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#111827",
  },

  costText: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "bold",
  },

  button: {
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  outlineBtn: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    marginTop: 8,
  },

  greenOutline: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#16a34a",
    alignItems: "center",
    marginTop: 8,
  },

  purpleOutline: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#9333ea",
    alignItems: "center",
    marginTop: 8,
  },

  supportBox: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 24,
  },

  supportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  supportText: {
    marginVertical: 10,
    color: "#6b7280",
  },
});
