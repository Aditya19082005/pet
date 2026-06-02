import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function FloatingInput({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize = "sentences",
  multiline = false,
  height = 50,
}) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  // ✅ IMPORTANT FIX: sync external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const active =
    focused || String(internalValue ?? "").trim().length > 0;

  return (
    <View style={[styles.container, multiline && { height }]}>
      <Text style={[styles.label, active && styles.labelActive]}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          multiline && { height, textAlignVertical: "top" },
        ]}
        value={internalValue}
        onChangeText={(text) => {
          setInternalValue(text);
          onChangeText?.(text);
        }}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 12,
    top: 16,
    fontSize: 14,
    color: "#888",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelActive: {
    top: -8,
    fontSize: 12,
    color: "#6b21a8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 10,
    paddingTop: 18,
    backgroundColor: "#fff",
  },
});