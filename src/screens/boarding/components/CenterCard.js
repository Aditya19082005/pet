import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/CenterCard";

export default function CenterCard({ item, onPress, onViewDetails }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={["#fff7ed", "#ffffff", "#f5f3ff"]}
        style={styles.centerCardWrapper}
      >
        <View style={styles.centerCardContent}>
          <View style={styles.centerCardBadge}>
            <Text style={styles.centerCardBadgeText}>
              {item.center_type?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.centerCardTitle}>{item.center_name}</Text>

          <Text style={styles.centerCardDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.centerCardRow}>
            <Text style={styles.centerCardCity}>{item.city}</Text>
            <Text style={styles.centerCardPrice}>₹ {item.price_per_day}/day</Text>
          </View>

          <TouchableOpacity
            style={styles.centerCardButton}
            onPress={onViewDetails}
          >
            <Text style={styles.centerCardButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

