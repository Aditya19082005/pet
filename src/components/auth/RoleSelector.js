import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RoleSelector({
  role,
  setRole,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Choose Registration Type
      </Text>

      <TouchableOpacity
        style={[
          styles.card,
          role === "pet_owner" &&
            styles.activeCard,
        ]}
        onPress={() =>
          setRole("pet_owner")
        }
      >
        <Text
          style={[
            styles.cardTitle,
            role === "pet_owner" &&
              styles.activeText,
          ]}
        >
          Pet Owner
        </Text>

        <Text
          style={[
            styles.cardDescription,
            role === "pet_owner" &&
              styles.activeText,
          ]}
        >
          Register your pets and book
          boarding services.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          role === "boarding_owner" &&
            styles.activeCard,
        ]}
        onPress={() =>
          setRole("boarding_owner")
        }
      >
        <Text
          style={[
            styles.cardTitle,
            role === "boarding_owner" &&
              styles.activeText,
          ]}
        >
          Boarding Owner
        </Text>

        <Text
          style={[
            styles.cardDescription,
            role === "boarding_owner" &&
              styles.activeText,
          ]}
        >
          Register your boarding
          facility and receive
          bookings.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  activeCard: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },

  activeText: {
    color: "#fff",
  },
});