import React from "react";
import { Text } from "react-native";
import styles from "../styles/petStyles";

export default function FormLabel({ title, required, error }) {
  return (
    <Text style={[styles.formLabel, error && styles.formLabelError]}>
      {title}
      {required && <Text style={styles.formLabelRequired}> *</Text>}
    </Text>
  );
}

