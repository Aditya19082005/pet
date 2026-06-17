import React from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { policyStyles } from "../styles/themeStyles";

export default function RefundPolicyScreen() {
  return (
    <ScrollView style={policyStyles.scroll}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={policyStyles.container}
      >
        {/* Title */}
        <Text style={policyStyles.title}>Refund & Exchange Policy</Text>
        <Text style={policyStyles.updated}>
          At CherryTails, we’re committed to providing high-quality products and
          a smooth shopping experience.
        </Text>

        {/* NO REFUND */}
        <Text style={policyStyles.heading}>🚫 No Refunds</Text>
        <Text style={policyStyles.text}>
          We do not offer refunds on any purchases made on our website. All
          sales are final.
        </Text>

        {/* EXCHANGE */}
        <Text style={policyStyles.heading}>🔁 Exchange Only</Text>
        <Text style={policyStyles.text}>
          If you receive a damaged, defective, or incorrect product, we offer a
          one-time exchange for the same item or another item of equal value,
          subject to availability.
        </Text>

        {/* ELIGIBILITY */}
        <Text style={policyStyles.heading}>📌 Eligibility for Exchange</Text>
        <Text style={policyStyles.text}>
          • You must notify us within 3 days of receiving your order.{"\n"}• The
          product must be unused with original tags and packaging.{"\n"}• Proof
          of purchase and clear images of the issue must be provided.
        </Text>

        {/* HOW TO REQUEST */}
        <Text style={policyStyles.heading}>📦 How to Request an Exchange</Text>
        <Text style={policyStyles.text}>
          Email us at cherrytails19@gmail.com with your order number and issue
          details. Attach images of the product if damaged or incorrect. Our
          team will guide you through the process.
        </Text>

        {/* IMPORTANT NOTES */}
        <Text style={policyStyles.heading}>❗ Important Notes</Text>
        <Text style={policyStyles.text}>
          • No exchanges for change of mind, color preference, or wrong size
          ordered.{"\n"}• Return shipping charges are borne by the customer
          unless the error is from our side.{"\n"}• Thank you for supporting
          small businesses 💖
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}


