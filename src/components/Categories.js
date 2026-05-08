import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

export default function Categories() {
  const categories = [
    {
      icon: "home-outline",
      name: "Boarding",
      description: "Safe & cozy stays",
      gradient: ["#fb923c", "#ea580c"],
      bgColor: "#fff7ed",
      emoji: "🏠",
    },
    {
      icon: "heart-outline",
      name: "Adoption",
      description: "Find your best friend",
      gradient: ["#f472b6", "#db2777"],
      bgColor: "#fdf2f8",
      emoji: "🐕",
    },
    {
      icon: "shopping-outline",
      name: "Buy & Sell",
      description: "Quality pet supplies",
      gradient: ["#c084fc", "#9333ea"],
      bgColor: "#faf5ff",
      emoji: "🛍️",
    },
    {
      icon: "account-group-outline",
      name: "Mating",
      description: "Find the perfect match",
      gradient: ["#60a5fa", "#2563eb"],
      bgColor: "#eff6ff",
      emoji: "💝",
    },
    {
      icon: "content-cut",
      name: "Grooming",
      description: "Spa & styling",
      gradient: ["#2dd4bf", "#0d9488"],
      bgColor: "#f0fdfa",
      emoji: "✂️",
    },
    {
      icon: "stethoscope",
      name: "Vet Doctors",
      description: "Expert healthcare",
      gradient: ["#818cf8", "#4f46e5"],
      bgColor: "#eef2ff",
      emoji: "👨‍⚕️",
    },
  ];

  return (
    <View style={styles.section}>
      {/* TITLE */}
      <Text style={styles.title}>
        Explore Our <Text style={styles.gradientText}>Services</Text>
      </Text>

      <Text style={styles.subtitle}>
        Everything your pet needs, all in one place
      </Text>

      {/* SCROLL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.bgColor }]}
            activeOpacity={0.9}
          >
            {/* ICON + GRADIENT */}
            <View style={styles.iconWrapper}>
              <LinearGradient colors={item.gradient} style={styles.iconBox}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={36}
                  color="#fff"
                />
              </LinearGradient>

              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            {/* TEXT */}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            {/* BUTTON */}
            <LinearGradient colors={item.gradient} style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#1f2937",
  },

  gradientText: {
    color: "#f97316",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 25,
    fontSize: 14,
  },

  scrollContainer: {
    paddingHorizontal: 10,
  },

  card: {
    width: screenWidth * 0.72,
    borderRadius: 28,
    padding: 22,
    marginRight: 18,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
    alignItems: "center",
  },

  iconWrapper: {
    position: "relative",
    marginBottom: 14,
  },

  iconBox: {
    width: 85,
    height: 85,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    position: "absolute",
    top: -6,
    right: -6,
    fontSize: 22,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },

  desc: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },

  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});
