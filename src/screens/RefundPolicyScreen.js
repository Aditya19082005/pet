import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RefundPolicyScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        {/* Title */}
        <Text style={styles.title}>Refund & Exchange Policy</Text>
        <Text style={styles.updated}>
          At CherryTails, we’re committed to providing high-quality products and
          a smooth shopping experience.
        </Text>

        {/* NO REFUND */}
        <Text style={styles.heading}>🚫 No Refunds</Text>
        <Text style={styles.text}>
          We do not offer refunds on any purchases made on our website. All
          sales are final.
        </Text>

        {/* EXCHANGE */}
        <Text style={styles.heading}>🔁 Exchange Only</Text>
        <Text style={styles.text}>
          If you receive a damaged, defective, or incorrect product, we offer a
          one-time exchange for the same item or another item of equal value,
          subject to availability.
        </Text>

        {/* ELIGIBILITY */}
        <Text style={styles.heading}>📌 Eligibility for Exchange</Text>
        <Text style={styles.text}>
          • You must notify us within 3 days of receiving your order.{"\n"}• The
          product must be unused with original tags and packaging.{"\n"}• Proof
          of purchase and clear images of the issue must be provided.
        </Text>

        {/* HOW TO REQUEST */}
        <Text style={styles.heading}>📦 How to Request an Exchange</Text>
        <Text style={styles.text}>
          Email us at cherrytails19@gmail.com with your order number and issue
          details. Attach images of the product if damaged or incorrect. Our
          team will guide you through the process.
        </Text>

        {/* IMPORTANT NOTES */}
        <Text style={styles.heading}>❗ Important Notes</Text>
        <Text style={styles.text}>
          • No exchanges for change of mind, color preference, or wrong size
          ordered.{"\n"}• Return shipping charges are borne by the customer
          unless the error is from our side.{"\n"}• Thank you for supporting
          small businesses 💖
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    margin: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  updated: {
    fontSize: 13,
    color: "#555",
    marginBottom: 15,
    lineHeight: 20,
  },

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#444",
  },

  text: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
});

