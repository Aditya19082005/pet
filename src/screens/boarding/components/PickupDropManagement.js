import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/boardingStyles";

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
      style={styles.pickupContainer}
    >
      <ScrollView contentContainerStyle={styles.pickupContentContainer}>
        {/* HEADER */}
        <Text style={styles.pickupHeading}>Pickup & Drop Management</Text>
        <Text style={styles.pickupSubHeading}>
          Track your pet's journey with real-time updates
        </Text>

        {/* TIMELINE CARD */}
        <View style={[styles.pickupCard, { borderColor: "#e5e7eb" }]}>
          <Text style={styles.pickupCardTitle}>Booking Timeline</Text>

          {timelineSteps.map((step, index) => (
            <View key={step.id} style={styles.pickupTimelineRow}>
              {/* Dot */}
              <View style={styles.pickupTimelineLeft}>
                <View
                  style={[
                    styles.pickupDot,
                    step.status === "completed"
                      ? { backgroundColor: "#22c55e" }
                      : step.status === "active"
                        ? { backgroundColor: "#3b82f6" }
                        : { backgroundColor: "#d1d5db" },
                  ]}
                />
                {index !== timelineSteps.length - 1 && (
                  <View style={styles.pickupLine} />
                )}
              </View>

              {/* Content */}
              <View style={styles.pickupTimelineContent}>
                <Text style={styles.pickupTitle}>{step.title}</Text>
                <Text style={styles.pickupDesc}>{step.description}</Text>
                <Text style={styles.pickupDate}>{step.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


