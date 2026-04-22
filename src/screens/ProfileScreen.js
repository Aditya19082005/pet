import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        {/* Profile Image */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />
        </View>

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ Verified Pet Parent</Text>
        </View>

        {/* Name */}
        <Text style={styles.name}>Shreyas Bobade</Text>
        <Text style={styles.subText}>Pet Parent • Pune</Text>

        {/* Description */}
        <Text style={styles.desc}>
          Manage your pets, bookings, and preferences in one place. Your pets
          are always in safe hands 🐾
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>My Pets</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLabel}>Pets</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>4.8★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    padding: 20,
    borderRadius: 20,
    margin: 15,
    alignItems: "center",
  },

  avatarWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  badge: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginBottom: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },

  subText: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  btnRow: {
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },

  primaryBtn: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  secondaryBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: "bold",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },

  statBox: {
    alignItems: "center",
    flex: 1,
  },

  statNum: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
  },
});
