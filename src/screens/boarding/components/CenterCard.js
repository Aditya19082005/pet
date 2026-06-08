import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CenterCard({ item, onPress, onViewDetails }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={["#fff7ed", "#ffffff", "#f5f3ff"]}
        style={{ borderRadius: 28, margin: 16, overflow: "hidden", backgroundColor: "#ffffff", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 5 }}
      >
        <Image
          source={{ uri: item.images?.[0] || "https://via.placeholder.com/300x200" }}
          style={{ width: "100%", height: 240 }}
        />

        <View style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: "#fff7ed",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 50,
              alignSelf: "flex-start",
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#fdba74",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#ea580c",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              {item.center_type?.toUpperCase()}
            </Text>
          </View>

          <Text style={{ fontSize: 30, fontWeight: "800", color: "#0f172a", marginBottom: 12 }}>
            {item.center_name}
          </Text>

          <Text style={{ fontSize: 15, color: "#475569", lineHeight: 24, marginBottom: 24 }} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#1e293b" }}>📍 {item.city}</Text>
            <Text style={{ fontSize: 18, fontWeight: "800", color: "#f97316" }}>₹ {item.price_per_day}/day</Text>
          </View>

          <TouchableOpacity
            style={{ backgroundColor: "#f97316", paddingVertical: 16, borderRadius: 18, alignItems: "center", marginTop: 10 }}
            onPress={onViewDetails}
          >
            <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16, letterSpacing: 0.3 }}>View Details</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
