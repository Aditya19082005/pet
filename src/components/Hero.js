import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { heroStyles } from "../styles/themeStyles";

export default function Hero() {

  const navigation = useNavigation();

  return (

    <View style={heroStyles.wrapper}>

      <LinearGradient
        colors={[
          "#fff1e6",
          "#ffe4f0",
          "#f3e8ff",
        ]}
        style={heroStyles.container}
      >

        <View style={heroStyles.badge}>
          <Text style={heroStyles.badgeText}>
            ✨ Trusted by 10,000+ Pet Parents
          </Text>
        </View>

        <Text style={heroStyles.title}>
          <Text style={heroStyles.gradientText}>
            Your Pet's{"\n"}
          </Text>

          <Text>
            Second Home 🐾
          </Text>
        </Text>

        <Text style={heroStyles.desc}>
          Premium pet care services at your fingertips.
          Boarding, grooming, and more for your furry friends.
        </Text>

        <View style={heroStyles.btnRow}>

          {/* BOOK BOARDING BUTTON */}
          <TouchableOpacity
            style={heroStyles.primaryBtn}
            onPress={() =>
             navigation.navigate("Boarding")
            }
          >

            <Text style={heroStyles.primaryBtnText}>
              🐾 Book Boarding →
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={heroStyles.secondaryBtn}
          >

            <Text style={heroStyles.secondaryBtnText}>
              Explore Services
            </Text>

          </TouchableOpacity>

        </View>

        <View style={heroStyles.statsRow}>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>
              5000+
            </Text>

            <Text style={styles.statLabel}>
              Happy Pets
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>
              500+
            </Text>

            <Text style={styles.statLabel}>
              Caregivers
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNum}>
              4.9★
            </Text>

            <Text style={styles.statLabel}>
              Rating
            </Text>
          </View>

        </View>

      </LinearGradient>

    </View>
  );
}

