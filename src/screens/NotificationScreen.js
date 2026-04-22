import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        {/* Header */}
        <Text style={styles.title}>🔔 Notifications</Text>
        <Text style={styles.subTitle}>
          Updates about your pets, bookings & services
        </Text>

        {/* Notification Card 1 */}
        <View style={styles.card}>
          <Ionicons name="paw-outline" size={22} color="#f97316" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Booking Confirmed</Text>
            <Text style={styles.cardDesc}>
              Your pet boarding request has been confirmed for 25 April.
            </Text>
            <Text style={styles.time}>2 hours ago</Text>
          </View>
        </View>

        {/* Notification Card 2 */}
        <View style={styles.card}>
          <Ionicons name="cut-outline" size={22} color="#6b21a8" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Grooming Reminder</Text>
            <Text style={styles.cardDesc}>
              Don’t forget your pet grooming appointment tomorrow at 11 AM.
            </Text>
            <Text style={styles.time}>1 day ago</Text>
          </View>
        </View>

        {/* Notification Card 3 */}
        <View style={styles.card}>
          <Ionicons name="star-outline" size={22} color="#facc15" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Rate Your Experience</Text>
            <Text style={styles.cardDesc}>
              How was your last boarding experience? Share feedback.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Rate Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clear Button */}
        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear All Notifications</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    margin: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },

  subTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "flex-start",
    gap: 10,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 3,
  },

  cardDesc: {
    fontSize: 13,
    color: "#555",
  },

  time: {
    fontSize: 11,
    color: "#999",
    marginTop: 5,
  },

  button: {
    marginTop: 8,
    backgroundColor: "#f97316",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  clearBtn: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },

  clearText: {
    color: "red",
    fontWeight: "600",
  },
});
