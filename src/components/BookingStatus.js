import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
      color: "#3b82f6",
      badge: "Confirmed",
      badgeBg: "#dbeafe",
      badgeText: "#1d4ed8",
      icon: "clock-outline",
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
      color: "#22c55e",
      badge: "In Progress",
      badgeBg: "#dcfce7",
      badgeText: "#166534",
      icon: "alert-circle-outline",
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
      color: "#a855f7",
      badge: "Completed",
      badgeBg: "#f3e8ff",
      badgeText: "#6b21a8",
      icon: "check-circle-outline",
      status: "completed",
    },
  ];

  return (
    <View style={styles.section}>
      {/* Header */}
      <Text style={styles.title}>
        Your Booking <Text style={{ color: "#a855f7" }}>Status</Text>
      </Text>

      <Text style={styles.subtitle}>
        Track all your pet's boarding reservations
      </Text>

      {/* Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {bookingStatuses.map((booking) => (
          <View key={booking.id} style={styles.card}>
            {/* Header Row */}
            <View style={styles.row}>
              <View style={styles.petRow}>
                <Text style={styles.petEmoji}>{booking.petEmoji}</Text>
                <View>
                  <Text style={styles.petName}>{booking.petName}</Text>
                  <Text style={styles.type}>{booking.type}</Text>
                </View>
              </View>

              <MaterialCommunityIcons
                name={booking.icon}
                size={22}
                color={booking.color}
              />
            </View>

            {/* Badge */}
            <View style={[styles.badge, { backgroundColor: booking.badgeBg }]}>
              <Text style={[styles.badgeText, { color: booking.badgeText }]}>
                {booking.badge}
                {booking.daysRemaining && (
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    ({booking.daysRemaining} days left)
                  </Text>
                )}
              </Text>
            </View>

            {/* Dates */}
            <View style={styles.box}>
              <Text style={styles.label}>Check-in to Check-out</Text>
              <Text style={styles.value}>
                {booking.checkInDate} - {booking.checkOutDate}
              </Text>
            </View>

            {/* Cost */}
            <View style={styles.box}>
              <Text style={styles.label}>Total Cost</Text>
              <Text style={[styles.cost, { color: booking.color }]}>
                ₹{booking.totalCost}
              </Text>
            </View>

            {/* Buttons */}
            {booking.status === "upcoming" && (
              <>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: booking.color }]}
                >
                  <Text style={styles.btnText}>Modify Booking</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineBtn}>
                  <Text style={styles.outlineText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}

            {booking.status === "active" && (
              <>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: booking.color }]}
                >
                  <Text style={styles.btnText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineGreen}>
                  <Text style={styles.greenText}>Extend Stay</Text>
                </TouchableOpacity>
              </>
            )}

            {booking.status === "completed" && (
              <>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: booking.color }]}
                >
                  <Text style={styles.btnText}>View Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlinePurple}>
                  <Text style={styles.purpleText}>Book Again</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Support Box */}
      <View style={styles.supportBox}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>
          Our support team is available 24/7 for booking assistance.
        </Text>

        <TouchableOpacity style={styles.supportBtn}>
          <Text style={styles.supportBtnText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
    marginTop: 5,
  },

  scroll: {
    paddingHorizontal: 15,
    gap: 15,
  },

  card: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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

  petEmoji: {
    fontSize: 24,
  },

  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  type: {
    fontSize: 12,
    color: "#666",
  },

  badge: {
    padding: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  box: {
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  label: {
    fontSize: 11,
    color: "#666",
  },

  value: {
    fontSize: 13,
    fontWeight: "600",
  },

  cost: {
    fontSize: 20,
    fontWeight: "bold",
  },

  btn: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  outlineBtn: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },

  outlineText: {
    color: "#333",
    fontWeight: "600",
  },

  outlineGreen: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#22c55e",
    alignItems: "center",
  },

  greenText: {
    color: "#22c55e",
    fontWeight: "600",
  },

  outlinePurple: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#a855f7",
    alignItems: "center",
  },

  purpleText: {
    color: "#a855f7",
    fontWeight: "600",
  },

  supportBox: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff7ed",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fdba74",
  },

  supportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  supportText: {
    fontSize: 13,
    color: "#444",
    marginVertical: 8,
  },

  supportBtn: {
    backgroundColor: "#f97316",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  supportBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
