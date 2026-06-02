import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function PasswordInput({ value, onChangeText, label }) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={label}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity
        style={styles.icon}
        onPress={() => setSecure(!secure)}
      >
        <Icon name={secure ? "eye-off" : "eye"} size={22} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 10,
    paddingRight: 45,
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
});