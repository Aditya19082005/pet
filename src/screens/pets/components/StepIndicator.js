import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/petStyles";

export default function StepIndicator({ step }) {
  return (
    <View style={styles.stepIndicatorContainer}>
      <View style={[styles.stepIndicatorCircle, step >= 1 && styles.stepIndicatorActive]}>
        <Text style={styles.stepIndicatorText}>1</Text>
      </View>

      <View style={[styles.stepIndicatorLine, step >= 2 && styles.stepIndicatorActiveLine]} />

      <View style={[styles.stepIndicatorCircle, step >= 2 && styles.stepIndicatorActive]}>
        <Text style={styles.stepIndicatorText}>2</Text>
      </View>

      <View style={[styles.stepIndicatorLine, step >= 3 && styles.stepIndicatorActiveLine]} />

      <View style={[styles.stepIndicatorCircle, step >= 3 && styles.stepIndicatorActive]}>
        <Text style={styles.stepIndicatorText}>3</Text>
      </View>
    </View>
  );
}

