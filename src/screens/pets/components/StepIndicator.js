import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StepIndicator({ step }) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, step >= 1 && styles.active]}>
        <Text style={styles.text}>1</Text>
      </View>

      <View style={[styles.line, step >= 2 && styles.activeLine]} />

      <View style={[styles.circle, step >= 2 && styles.active]}>
        <Text style={styles.text}>2</Text>
      </View>

      <View style={[styles.line, step >= 3 && styles.activeLine]} />

      <View style={[styles.circle, step >= 3 && styles.active]}>
        <Text style={styles.text}>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  active: {
    backgroundColor: "#f97316",
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
  },

  line: {
    width: 50,
    height: 3,
    backgroundColor: "#ddd",
  },

  activeLine: {
    backgroundColor: "#f97316",
  },
});
