import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function PetCard({
  item,
  petImages,
  styles,
  onEdit,
  onDelete,
  navigation,
}) {
  const petId = item.pet_id || item.id;

  const image =
    petImages[petId]?.[0]?.image_url || "https://via.placeholder.com/100";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("PetDetails", {
          petId,
        })
      }
    >
      <Image source={{ uri: image }} style={styles.petImage} />

      <View style={styles.rightSection}>
        <Text style={styles.petName}>{item.pet_name}</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <Ionicons name="create-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(petId)}>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
