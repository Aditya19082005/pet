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
import notificationStyles from "../styles/NotificationScreenStyles";

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
      style={notificationStyles.container}
    >
      <ScrollView contentContainerStyle={notificationStyles.scroll}>
        {/* HEADER */}
        <Text style={notificationStyles.heading}>Notifications</Text>
        <Text style={notificationStyles.subHeading}>
          Stay updated with your pet activities
        </Text>

        {/* LIST */}
        <View style={notificationStyles.card}>
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((n) => {
              const isExpanded = expandedNotification === n.id;

              return (
                <LinearGradient
                  key={n.id}
                  colors={n.bg}
                  style={notificationStyles.notificationCard}
                >
                  <Pressable onPress={() => toggleNotification(n.id)}>
                    <View style={notificationStyles.row}>
                      <MaterialIcons
                        name="notifications"
                        size={22}
                        color={n.color}
                        style={{ marginRight: 10 }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={notificationStyles.title}>{n.title}</Text>

                        <Text style={notificationStyles.desc}>
                          {isExpanded
                            ? n.message
                            : `${n.message.slice(0, 60)}...`}
                        </Text>

                        <Text style={notificationStyles.date}>{n.timestamp}</Text>
                      </View>

                      <TouchableOpacity onPress={() => dismissAlert(n.id)}>
                        <Ionicons name="close" size={20} color="#555" />
                      </TouchableOpacity>
                    </View>
                  </Pressable>

                  {isExpanded && (
                    <View style={notificationStyles.expandedBox}>
                      <Text style={notificationStyles.fullText}>{n.message}</Text>

                      <View style={notificationStyles.actionRow}>
                        <TouchableOpacity style={notificationStyles.secondaryBtn}>
                          <Text>Contact</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={notificationStyles.primaryBtn}>
                          <Text style={{ color: "#fff" }}>Message</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </LinearGradient>
              );
            })
          ) : (
            <View style={notificationStyles.emptyBox}>
              <Ionicons name="notifications-off" size={40} color="#ccc" />
              <Text style={notificationStyles.emptyText}>All notifications cleared!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


