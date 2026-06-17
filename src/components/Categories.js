import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { categoriesStyles } from "../styles/themeStyles";

export default function Categories() {
  const categories = [
    {
      icon: "home-outline",
      name: "Boarding",
      description: "Safe & cozy stays",
      gradient: ["#8b5cf6", "#6b21a8"],
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
    <View style={categoriesStyles.section}>
      {/* TITLE */}
      <Text style={categoriesStyles.title}>
        Explore Our <Text style={categoriesStyles.gradientText}>Services</Text>
      </Text>

      <Text style={categoriesStyles.subtitle}>
        Everything your pet needs, all in one place
      </Text>

      {/* SCROLL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={categoriesStyles.scrollContainer}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[categoriesStyles.card, { backgroundColor: item.bgColor }]}
            activeOpacity={0.9}
          >
            {/* ICON + GRADIENT */}
            <View style={categoriesStyles.iconWrapper}>
              <LinearGradient colors={item.gradient} style={categoriesStyles.iconBox}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={36}
                  color="#fff"
                />
              </LinearGradient>

              <Text style={categoriesStyles.emoji}>{item.emoji}</Text>
            </View>

            {/* TEXT */}
            <Text style={categoriesStyles.name}>{item.name}</Text>
            <Text style={categoriesStyles.desc}>{item.description}</Text>

            {/* BUTTON */}
            <LinearGradient colors={item.gradient} style={categoriesStyles.button}>
              <Text style={categoriesStyles.buttonText}>Explore</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}


