import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function DogGallery() {
  const services = [
    {
      title: "Happy Stay",
      desc: "Comfortable and stress-free boarding experience.",
      img: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    },
    {
      title: "Play Time",
      desc: "Fun activities to keep dogs active and social.",
      img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    },
    {
      title: "Bath & Groom",
      desc: "Keeping your furry friend fresh & clean.",
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
    },
    {
      title: "Training Moments",
      desc: "Learning basic to advanced commands.",
      img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
    },
    {
      title: "Outdoor Walks",
      desc: "Daily walks for a healthy lifestyle.",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    },
    {
      title: "Cuddle Time",
      desc: "Lots of love and attention ❤️",
      img: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2",
    },
    {
      title: "Social Fun",
      desc: "Dogs making new furry friends.",
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    },
  ];

  return (
    <View style={styles.section}>
      {/* Heading */}
      <Text style={styles.title}>
        <Text style={{ color: "#f97316" }}>Happy Dogs Gallery</Text>
      </Text>

      <Text style={styles.subtitle}>
        Real moments from our boarding & care 🐾
      </Text>

      {/* Horizontal Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            {/* Image */}
            <Image source={{ uri: item.img }} style={styles.image} />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>

              <Text style={styles.link}>View More →</Text>
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
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    marginBottom: 15,
  },

  scroll: {
    paddingHorizontal: 15,
  },

  card: {
    width: screenWidth * 0.75,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  desc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },

  link: {
    fontSize: 13,
    fontWeight: "600",
    color: "#f97316",
  },
});