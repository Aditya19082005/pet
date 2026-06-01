import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPVerification({
  email,
  otpType,
  password,
  onSuccess,
  onBack,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Validation", "Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        otpType === "login"
          ? "https://www.cgpisoftware.com/cheerytail/api/auth/verify-login-otp"
          : "https://www.cgpisoftware.com/cheerytail/api/auth/verify-email-otp";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();

      console.log("VERIFY OTP =>", result);

      if (result.status === true || result.status === "success") {
        const token =
          result?.data?.token || result?.token;

        const user =
          result?.data?.user || result?.user;

           if (user?.role) {
  await AsyncStorage.setItem("role", user.role);
}
        // ✅ STORE TOKEN (this is what triggers Home screen)
        if (token) {
          await AsyncStorage.setItem("token", token);
        }

        if (user) {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(user)
          );
        }

        Alert.alert("Success", "OTP Verified");

        // 🔥 IMPORTANT FIX: trigger navigation AFTER storage is complete
        setTimeout(() => {
          onSuccess?.();
        }, 100);
      } else {
        Alert.alert(
          "Error",
          result.message || "Invalid OTP"
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const endpoint =
        otpType === "login"
          ? "https://www.cgpisoftware.com/cheerytail/api/auth/login"
          : "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp";

      const payload =
        otpType === "login"
          ? {
              email,
              password,
            }
          : {
              email,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log("RESEND OTP =>", result);

      Alert.alert("Success", "OTP Resent Successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Verify OTP</Text>

      <Text style={styles.subText}>
        OTP sent to{"\n"}
        {email}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity onPress={handleResendOtp}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({

    heading: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 10,
    },

    subText: {
      color: "#666",
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      backgroundColor:
        "#fff",
    },

    resendText: {
      color: "#6b21a8",
      textAlign: "center",
      marginBottom: 20,
      fontWeight: "600",
    },

    button: {
      backgroundColor:
        "#6b21a8",
      padding: 15,
      borderRadius: 12,
      alignItems: "center",
    },

    buttonText: {
      color: "#fff",
      fontWeight: "700",
    },

    backText: {
      textAlign: "center",
      marginTop: 15,
      color: "#666",
    },

});