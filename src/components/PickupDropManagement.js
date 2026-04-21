import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

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
      message: "Your booking for Max is confirmed.",
      timestamp: "2 hours ago",
      icon: "check-circle",
      color: "#22c55e",
    },
    {
      id: 2,
      title: "Pickup Reminder",
      message: "Reminder: Pick up Max tomorrow at 4:00 PM.",
      timestamp: "1 hour ago",
      icon: "clock",
      color: "#3b82f6",
    },
    {
      id: 3,
      title: "Max is Having Fun!",
      message: "Max is playing and enjoying playtime.",
      timestamp: "30 minutes ago",
      icon: "alert-circle",
      color: "#a855f7",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.heading}>Pickup & Drop Management</Text>

      {/* TIMELINE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Booking Timeline</Text>

        {timelineSteps.map((step, index) => (
          <View key={step.id} style={styles.timelineItem}>
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
            <View>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.desc}>{step.description}</Text>
              <Text style={styles.date}>{step.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* NOTIFICATIONS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>

        {notifications.map((n) => {
          if (dismissedAlerts.has(n.id)) return null;

          return (
            <View key={n.id} style={styles.notification}>
              <View style={styles.row}>
                <MaterialIcons
                  name={n.icon}
                  size={22}
                  color={n.color}
                  style={{ marginRight: 10 }}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{n.title}</Text>
                  <Text style={styles.desc}>{n.message}</Text>
                  <Text style={styles.date}>{n.timestamp}</Text>
                </View>

                <Pressable onPress={() => dismissAlert(n.id)}>
                  <Ionicons name="close" size={20} color="#999" />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  desc: {
    fontSize: 12,
    color: "#555",
  },
  date: {
    fontSize: 11,
    color: "#888",
  },
  notification: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});