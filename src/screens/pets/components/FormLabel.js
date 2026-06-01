import React from "react";
import { Text } from "react-native";

export default function FormLabel({ title, required }) {
  return (
    <Text
      style={{
        marginBottom: 5,
        fontWeight: "600",
        color: "#374151",
      }}
    >
      {title}
      {required && <Text style={{ color: "red" }}> *</Text>}
    </Text>
  );
}
