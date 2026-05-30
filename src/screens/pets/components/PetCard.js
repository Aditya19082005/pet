import React from "react";

import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

export default function PetCard({ item, petImages, styles, onEdit, onDelete }) {
  const petId = item.pet_id || item.id;

  return (
    <View style={styles.card}>
      <Text style={styles.petName}>{item.pet_name}</Text>

      <Text>Type: {item.pet_type}</Text>

      <Text>Breed: {item.breed}</Text>

      <Text>Gender: {item.gender}</Text>

      <Text>Age: {item.age}</Text>

      <Text>Weight: {item.weight}</Text>

      {petImages[petId]?.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {petImages[petId].map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.image_url }}
              style={styles.petImage}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(petId)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
