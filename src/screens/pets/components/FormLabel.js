import React from "react";
import { Text } from "react-native";

export default function FormLabel({ title, required, error }) {
  return (
    <Text
      style={{
        marginBottom: 6,
        fontWeight: "700",
        color: error ? "#dc2626" : "#374151",
        fontSize: 14,
      }}
    >
      {title}
      {required && <Text style={{ color: "#dc2626" }}> *</Text>}
    </Text>
  );
}
