import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Hero() {
  return (
    <View style={styles.wrapper}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ Trusted by 10,000+ Pet Parents</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          <Text style={styles.gradientText}>Your Pet's{"\n"}</Text>
          <Text>Second Home 🐾</Text>
        </Text>

        {/* Description */}
        <Text style={styles.desc}>
          Premium pet care services at your fingertips. Boarding, grooming, and
          more for your furry friends.
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>🐾 Book Boarding →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Explore Services</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>5000+</Text>
            <Text style={styles.statLabel}>Happy Pets</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>500+</Text>
            <Text style={styles.statLabel}>Caregivers</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>4.9★</Text>
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
  },

  badge: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginBottom: 15,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  gradientText: {
    color: "#f97316",
  },

  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },

  btnRow: {
    flexDirection: "column",
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
    marginTop: 15,
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