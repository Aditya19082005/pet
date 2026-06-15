import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.updated}>Last updated: April 2026</Text>

        {/* WHO WE ARE */}
        <Text style={styles.heading}>Who we are</Text>
        <Text style={styles.text}>
          Our website address is: cherrytails.com.
        </Text>

        {/* COMMENTS */}
        <Text style={styles.heading}>Comments</Text>
        <Text style={styles.text}>
          When visitors leave comments on the site we collect the data shown in
          the comments form, and also the visitor’s IP address and browser user
          agent string to help spam detection.
        </Text>

        <Text style={styles.text}>
          An anonymized string created from your email address (also called a
          hash) may be provided to the Gravatar service to see if you are using
          it. After approval of your comment, your profile picture is visible to
          the public in the context of your comment.
        </Text>

        {/* MEDIA */}
        <Text style={styles.heading}>Media</Text>
        <Text style={styles.text}>
          If you upload images to the website, you should avoid uploading images
          with embedded location data (EXIF GPS). Visitors can download and
          extract location data from images.
        </Text>

        {/* COOKIES */}
        <Text style={styles.heading}>Cookies</Text>
        <Text style={styles.text}>
          If you leave a comment, you may opt-in to saving your name, email
          address and website in cookies. These are for convenience and last for
          one year.
        </Text>

        <Text style={styles.text}>
          Login cookies last for two days, and screen options cookies last for a
          year. If you select “Remember Me”, login persists for two weeks.
        </Text>

        {/* EMBEDDED CONTENT */}
        <Text style={styles.heading}>Embedded content from other websites</Text>
        <Text style={styles.text}>
          Articles on this site may include embedded content (videos, images,
          etc.). These behave as if you visited the other website directly and
          may collect data, use cookies, and track interactions.
        </Text>

        {/* DATA SHARING */}
        <Text style={styles.heading}>Who we share your data with</Text>
        <Text style={styles.text}>
          If you request a password reset, your IP address will be included in
          the reset email.
        </Text>

        {/* DATA RETENTION */}
        <Text style={styles.heading}>How long we retain your data</Text>
        <Text style={styles.text}>
          If you leave a comment, it and its metadata are retained indefinitely.
          Registered users can edit or delete their personal information at any
          time.
        </Text>

        {/* RIGHTS */}
        <Text style={styles.heading}>What rights you have over your data</Text>
        <Text style={styles.text}>
          You can request an exported file of your personal data or request
          deletion of your data, except for data required for legal or security
          purposes.
        </Text>

        {/* DATA SENT */}
        <Text style={styles.heading}>Where your data is sent</Text>
        <Text style={styles.text}>
          Visitor comments may be checked through an automated spam detection
          service.
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

