import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BookingStatus() {
  const bookingStatuses = [
    {
      id: 1,
      petName: "Buddy",
      petEmoji: "🐕",
      type: "Upcoming",
      checkInDate: "Apr 15, 2024",
      checkOutDate: "Apr 18, 2024",
      totalCost: 135,
      gradient: ["#60a5fa", "#2563eb"], // blue
      bg: "#eff6ff",
      badgeBg: "#bfdbfe",
      badgeText: "#1d4ed8",
      iconColor: "#2563eb",
      status: "upcoming",
    },
    {
      id: 2,
      petName: "Luna",
      petEmoji: "🐱",
      type: "Active Boarding",
      checkInDate: "Apr 10, 2024",
      checkOutDate: "Apr 14, 2024",
      totalCost: 180,
      gradient: ["#4ade80", "#16a34a"], // green
      bg: "#f0fdf4",
      badgeBg: "#bbf7d0",
      badgeText: "#166534",
      iconColor: "#16a34a",
      status: "active",
      daysRemaining: 2,
    },
    {
      id: 3,
      petName: "Max",
      petEmoji: "🐶",
      type: "Completed",
      checkInDate: "Apr 1, 2024",
      checkOutDate: "Apr 7, 2024",
      totalCost: 270,
      gradient: ["#c084fc", "#9333ea"], // purple
      bg: "#faf5ff",
      badgeBg: "#e9d5ff",
      badgeText: "#6b21a8",
      iconColor: "#9333ea",
      status: "completed",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>
        Your Booking <Text style={styles.gradientText}>Status</Text>
      </Text>

      <Text style={styles.subtitle}>
        Track all your pet's boarding reservations
      </Text>

      {/* CARDS */}
      {bookingStatuses.map((booking) => (
        <View
          key={booking.id}
          style={[styles.card, { backgroundColor: booking.bg }]}
        >
          {/* HEADER */}
          <View style={styles.row}>
            <View style={styles.petRow}>
              {/* ICON BOX */}
              <LinearGradient colors={booking.gradient} style={styles.iconBox}>
                <Text style={{ fontSize: 22 }}>{booking.petEmoji}</Text>
              </LinearGradient>

              <View>
                <Text style={styles.petName}>{booking.petName}</Text>
                <Text style={styles.type}>{booking.type}</Text>
              </View>
            </View>

            <MaterialCommunityIcons
              name="clock-outline"
              size={22}
              color={booking.iconColor}
            />
          </View>

          {/* BADGE */}
          <View style={[styles.badge, { backgroundColor: booking.badgeBg }]}>
            <Text style={{ color: booking.badgeText, fontWeight: "600" }}>
              {booking.status === "active"
                ? `In Progress (${booking.daysRemaining} days)`
                : booking.status === "completed"
                  ? "Completed"
                  : "Confirmed"}
            </Text>
          </View>

          {/* DATE BOX */}
          <View style={styles.infoBox}>
            <Text style={styles.label}>Check-in to Check-out</Text>
            <Text style={styles.value}>
              {booking.checkInDate} - {booking.checkOutDate}
            </Text>
          </View>

          {/* COST */}
          <View style={styles.infoBox}>
            <Text style={styles.label}>Total Cost</Text>

            <Text style={[styles.costText, { color: booking.gradient[1] }]}>
              ₹{booking.totalCost}
            </Text>
          </View>

          {/* BUTTONS */}
          {booking.status === "upcoming" && (
            <>
              <TouchableOpacity>
                <LinearGradient colors={booking.gradient} style={styles.button}>
                  <Text style={styles.btnText}>Modify Booking</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.outlineBtn}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </>
          )}

          {booking.status === "active" && (
            <>
              <TouchableOpacity>
                <LinearGradient colors={booking.gradient} style={styles.button}>
                  <Text style={styles.btnText}>View Details</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.greenOutline}>
                <Text style={{ color: "#16a34a" }}>Extend Stay</Text>
              </TouchableOpacity>
            </>
          )}

          {booking.status === "completed" && (
            <>
              <TouchableOpacity>
                <LinearGradient colors={booking.gradient} style={styles.button}>
                  <Text style={styles.btnText}>View Receipt</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.purpleOutline}>
                <Text style={{ color: "#9333ea" }}>Book Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}

      {/* SUPPORT */}
      <LinearGradient colors={["#ffedd5", "#fce7f3"]} style={styles.supportBox}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>
          Our support team is available 24/7
        </Text>

        <TouchableOpacity>
          <LinearGradient colors={["#f97316", "#ec4899"]} style={styles.button}>
            <Text style={styles.btnText}>Contact Support</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },

  gradientText: {
    color: "#9333ea",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: 20,
  },

  card: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  petRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  petName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  type: {
    color: "#6b7280",
    fontSize: 12,
  },

  badge: {
    padding: 8,
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
    fontWeight: "bold",
  },

  costText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
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
    padding: 20,
    borderRadius: 24,
  },

  supportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  supportText: {
    marginVertical: 10,
  },
});
