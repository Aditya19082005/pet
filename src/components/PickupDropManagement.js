import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function PickupDropManagement() {
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const toggleNotification = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const dismissAlert = (id) => {
    setDismissedAlerts(new Set([...dismissedAlerts, id]));
  };

  const timelineSteps = [
    {
      id: 1,
      title: "Pickup Scheduled",
      status: "completed",
      date: "Today, 10:00 AM",
      description: "Max is ready for pickup",
    },
    {
      id: 2,
      title: "In Boarding",
      status: "active",
      date: "In Progress",
      description: "Max is in our care",
    },
    {
      id: 3,
      title: "Drop Scheduled",
      status: "pending",
      date: "Tomorrow, 4:00 PM",
      description: "Ready for pickup",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed!",
      message:
        "Your booking for Max is confirmed. Pickup scheduled for today at 10:00 AM.",
      timestamp: "2 hours ago",
      color: "#22c55e",
      bg: ["#ecfdf5", "#d1fae5"],
    },
    {
      id: 2,
      title: "Pickup Reminder",
      message: "Reminder: Pick up Max tomorrow at 4:00 PM.",
      timestamp: "1 hour ago",
      color: "#3b82f6",
      bg: ["#eff6ff", "#dbeafe"],
    },
    {
      id: 3,
      title: "Max is Having Fun!",
      message:
        "Max is playing and enjoying playtime with other dogs. Check updates!",
      timestamp: "30 minutes ago",
      color: "#a855f7",
      bg: ["#faf5ff", "#ede9fe"],
    },
  ];

  return (
    <LinearGradient
      colors={["#f8fafc", "#eef2ff", "#fdf2f8"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* HEADER */}
        <Text style={styles.heading}>Pickup & Drop Management</Text>
        <Text style={styles.subHeading}>
          Track your pet's journey with real-time updates
        </Text>

        {/* TIMELINE CARD */}
        <View style={[styles.card, { borderColor: "#e5e7eb" }]}>
          <Text style={styles.cardTitle}>Booking Timeline</Text>

          {timelineSteps.map((step, index) => (
            <View key={step.id} style={styles.timelineRow}>
              {/* Dot */}
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.dot,
                    step.status === "completed"
                      ? { backgroundColor: "#22c55e" }
                      : step.status === "active"
                        ? { backgroundColor: "#3b82f6" }
                        : { backgroundColor: "#d1d5db" },
                  ]}
                />
                {index !== timelineSteps.length - 1 && (
                  <View style={styles.line} />
                )}
              </View>

              {/* Content */}
              <View style={styles.timelineContent}>
                <Text style={styles.title}>{step.title}</Text>
                <Text style={styles.desc}>{step.description}</Text>
                <Text style={styles.date}>{step.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },

  subHeading: {
    color: "#6b7280",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  timelineRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  timelineLeft: {
    alignItems: "center",
    marginRight: 12,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  line: {
    width: 2,
    height: 40,
    backgroundColor: "#d1d5db",
    marginTop: 4,
  },

  timelineContent: {
    flex: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
  },

  desc: {
    fontSize: 13,
    color: "#555",
  },

  date: {
    fontSize: 12,
    color: "#888",
  },
});
