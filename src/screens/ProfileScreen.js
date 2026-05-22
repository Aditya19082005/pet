import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      console.log("STORED USER =>", userData);

      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#6b21a8"
        />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[
          "#fff1e6",
          "#ffe4f0",
          "#f3e8ff",
        ]}
        style={styles.container}
      >
        {/* PROFILE IMAGE */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri:
                "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />
        </View>

        {/* BADGE */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            ⭐ Verified User
          </Text>
        </View>

        {/* NAME */}
        <Text style={styles.name}>
          {user?.name || "User"}
        </Text>

        {/* EMAIL */}
        <Text style={styles.subText}>
          {user?.email}
        </Text>

        {/* PHONE */}
        <Text style={styles.subText}>
          {user?.phone}
        </Text>

        {/* ROLE */}
        <Text style={styles.roleText}>
          {user?.role === "pet_owner"
            ? "Pet Owner 🐾"
            : "Boarding Owner 🏠"}
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>
          Manage your pets, bookings,
          and preferences in one place.
        </Text>

        {/* BUTTONS */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.primaryBtn}
          >
            <Text
              style={styles.primaryBtnText}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          {/* MY PETS BUTTON */}
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() =>
              navigation.navigate("Pets")
            }
          >
            <Text
              style={
                styles.secondaryBtnText
              }
            >
              My Pets
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  roleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f97316",
    marginTop: 10,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  btnRow: {
    width: "100%",
    gap: 10,
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
});