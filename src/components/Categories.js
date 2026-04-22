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

const screenWidth = Dimensions.get("window").width;

export default function Categories() {
  const categories = [
    {
      icon: "home-outline",
      name: "Boarding",
      description: "Safe & cozy stays",
      color: "#fb923c",
      bgColor: "#fff7ed",
      emoji: "🏠",
    },
    {
      icon: "heart-outline",
      name: "Adoption",
      description: "Find your best friend",
      color: "#ec4899",
      bgColor: "#fdf2f8",
      emoji: "🐕",
    },
    {
      icon: "shopping-outline",
      name: "Buy & Sell",
      description: "Quality pet supplies",
      color: "#a855f7",
      bgColor: "#faf5ff",
      emoji: "🛍️",
    },
    {
      icon: "account-group-outline",
      name: "Mating",
      description: "Find the perfect match",
      color: "#3b82f6",
      bgColor: "#eff6ff",
      emoji: "💝",
    },
    {
      icon: "content-cut",
      name: "Grooming",
      description: "Spa & styling",
      color: "#14b8a6",
      bgColor: "#f0fdfa",
      emoji: "✂️",
    },
    {
      icon: "stethoscope",
      name: "Vet Doctors",
      description: "Expert healthcare",
      color: "#6366f1",
      bgColor: "#eef2ff",
      emoji: "👨‍⚕️",
    },
  ];

  return (
    <View style={styles.section}>
      {/* Title */}
      <Text style={styles.title}>
        Explore Our <Text style={{ color: "#f97316" }}>Services</Text>
      </Text>

      <Text style={styles.subtitle}>
        Everything your pet needs, all in one place
      </Text>

      {/* Horizontal Scroll (like your web version) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            {/* Icon Box */}
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <MaterialCommunityIcons
                name={item.icon}
                size={32}
                color="white"
              />

              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            {/* Name */}
            <Text style={styles.name}>{item.name}</Text>

            {/* Description */}
            <Text style={styles.desc}>{item.description}</Text>

            {/* Button (hover effect replaced with always visible on mobile) */}
            <View style={[styles.button, { backgroundColor: item.color }]}>
              <Text style={styles.buttonText}>Explore</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },

  scrollContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },

  card: {
    width: screenWidth * 0.7,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },

  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },

  emoji: {
    position: "absolute",
    top: -8,
    right: -8,
    fontSize: 18,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  desc: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },

  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
