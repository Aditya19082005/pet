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

export default function NotificationScreen() {
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const toggleNotification = (id) => {
    setExpandedNotification((prev) => (prev === id ? null : id));
  };

  const dismissAlert = (id) => {
    setDismissedAlerts((prev) => new Set(prev).add(id));
  };

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

  const visibleNotifications = notifications.filter(
    (n) => !dismissedAlerts.has(n.id),
  );

  return (
    <LinearGradient
      colors={["#f8fafc", "#eef2ff", "#fdf2f8"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <Text style={styles.heading}>Notifications</Text>
        <Text style={styles.subHeading}>
          Stay updated with your pet activities
        </Text>

        {/* LIST */}
        <View style={styles.card}>
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((n) => {
              const isExpanded = expandedNotification === n.id;

              return (
                <LinearGradient
                  key={n.id}
                  colors={n.bg}
                  style={styles.notificationCard}
                >
                  <Pressable onPress={() => toggleNotification(n.id)}>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="notifications"
                        size={22}
                        color={n.color}
                        style={{ marginRight: 10 }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{n.title}</Text>

                        <Text style={styles.desc}>
                          {isExpanded
                            ? n.message
                            : `${n.message.slice(0, 60)}...`}
                        </Text>

                        <Text style={styles.date}>{n.timestamp}</Text>
                      </View>

                      <TouchableOpacity onPress={() => dismissAlert(n.id)}>
                        <Ionicons name="close" size={20} color="#555" />
                      </TouchableOpacity>
                    </View>
                  </Pressable>

                  {isExpanded && (
                    <View style={styles.expandedBox}>
                      <Text style={styles.fullText}>{n.message}</Text>

                      <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.secondaryBtn}>
                          <Text>Contact</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryBtn}>
                          <Text style={{ color: "#fff" }}>Message</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </LinearGradient>
              );
            })
          ) : (
            <View style={styles.emptyBox}>
              <Ionicons name="notifications-off" size={40} color="#ccc" />
              <Text style={styles.emptyText}>All notifications cleared!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  scroll: {
    padding: 16,
  },

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
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },

  notificationCard: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
  },

  desc: {
    fontSize: 13,
    color: "#555",
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  expandedBox: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 10,
  },

  fullText: {
    color: "#374151",
    marginBottom: 10,
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 5,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 5,
  },

  emptyBox: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    color: "#999",
    marginTop: 10,
  },
});
