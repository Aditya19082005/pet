import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInput({
  label,
  value,
  onChange,
  mode = "date", // "date" | "time"
}) {
  const [show, setShow] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return mode === "time"
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? "#000" : "#888" }}>
          {value ? formatDate(value) : "Select"}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fff",
  },
});