import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TermsOfUseScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        {/* Title */}
        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.updated}>Last Updated: April 2026</Text>

        {/* 1 */}
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          You must be at least 5 years old to use the Site. By using the Site,
          you agree to follow these Terms and confirm you are legally capable.
        </Text>

        {/* 2 */}
        <Text style={styles.heading}>2. Changes to Terms</Text>
        <Text style={styles.text}>
          We may update these Terms at any time. The “Last Updated” date will
          reflect changes. Continued use means you accept the updated Terms.
        </Text>

        {/* 3 */}
        <Text style={styles.heading}>3. Use of Site</Text>
        <Text style={styles.text}>
          You agree to use the Site only for lawful purposes. You must not
          misuse or interfere with the Site’s functionality. You are responsible
          for any content you post.
        </Text>

        {/* 4 */}
        <Text style={styles.heading}>4. Intellectual Property</Text>
        <Text style={styles.text}>
          All content including text, graphics, logos, and code is owned or
          licensed by us and protected by copyright and trademark laws. Personal
          use only is allowed.
        </Text>

        {/* 5 */}
        <Text style={styles.heading}>5. Third-Party Links</Text>
        <Text style={styles.text}>
          The Site may contain links to third-party websites. We are not
          responsible for their content or accuracy and do not endorse them.
        </Text>

        {/* 6 */}
        <Text style={styles.heading}>6. Privacy</Text>
        <Text style={styles.text}>
          Your use of the Site is also governed by our Privacy Policy. Please
          review it to understand how we handle your data.
        </Text>

        {/* 7 */}
        <Text style={styles.heading}>7. Disclaimer of Warranties</Text>
        <Text style={styles.text}>
          The Site is provided “as is” without warranties of any kind. We do not
          guarantee uninterrupted or error-free service.
        </Text>

        {/* 8 */}
        <Text style={styles.heading}>8. Limitation of Liability</Text>
        <Text style={styles.text}>
          We are not liable for any indirect or consequential damages arising
          from your use of the Site.
        </Text>

        {/* 9 */}
        <Text style={styles.heading}>9. Indemnification</Text>
        <Text style={styles.text}>
          You agree to hold us harmless from any claims or losses arising from
          your use of the Site or violation of these Terms.
        </Text>

        {/* 10 */}
        <Text style={styles.heading}>10. Governing Law</Text>
        <Text style={styles.text}>
          These Terms are governed by the laws of India. Any disputes shall be
          handled under the jurisdiction of Maharashtra courts.
        </Text>

        {/* 11 */}
        <Text style={styles.heading}>11. Severability</Text>
        <Text style={styles.text}>
          If any provision is found unenforceable, the remaining Terms will
          still apply.
        </Text>

        {/* 12 */}
        <Text style={styles.heading}>12. Termination</Text>
        <Text style={styles.text}>
          We may suspend or terminate access at any time without notice if these
          Terms are violated.
        </Text>

        {/* 13 */}
        <Text style={styles.heading}>13. Contact Us</Text>
        <Text style={styles.text}>
          Cherrytails {"\n"}
          Shop No. B4, Swami Darshan Complex, {"\n"}
          Near Shiv Mandir Road, {"\n"}
          Ambernath East, Maharashtra – 421501
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
    marginBottom: 5,
  },

  updated: {
    fontSize: 12,
    color: "#777",
    marginBottom: 15,
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

