import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen({ navigation }) {

  // LOGIN / REGISTER TAB
  const [isLogin, setIsLogin] = useState(true);

  // SCREEN STEP
  const [step, setStep] = useState("auth");

  // OTP TYPE
  const [otpType, setOtpType] = useState("");

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // ROLE
  const [role, setRole] = useState("pet_owner");

  // LOADING
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {

    if (!email || !password) {

      Alert.alert(
        "Validation",
        "Please enter email and password"
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      console.log(
        "LOGIN RESPONSE =>",
        result
      );

      if (
        result.status === true ||
        result.status === "success"
      ) {

        Alert.alert(
          "Success",
          "OTP Sent Successfully"
        );

        // LOGIN OTP FLOW
        setOtpType("login");

        // SHOW OTP SCREEN
        setStep("otp");

      } else {

        Alert.alert(
          "Error",
          result.message || "Invalid credentials"
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {

      Alert.alert(
        "Validation",
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            role,
          }),
        }
      );

      const result = await response.json();

      console.log(
        "REGISTER RESPONSE =>",
        result
      );

      if (
        result.status === true ||
        result.status === "success"
      ) {

        // SEND EMAIL OTP
        const otpResponse = await fetch(
          "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          }
        );

        const otpResult =
          await otpResponse.json();

        console.log(
          "OTP RESPONSE =>",
          otpResult
        );

        Alert.alert(
          "Success",
          "OTP Sent Successfully"
        );

        // REGISTER OTP FLOW
        setOtpType("register");

        // SHOW OTP SCREEN
        setStep("otp");

      } else {

        Alert.alert(
          "Error",
          result.message ||
            "Registration failed"
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  // =========================
// =========================
// VERIFY OTP
// =========================
const handleVerifyOtp = async () => {

  if (!otp) {

    Alert.alert(
      "Validation",
      "Please enter OTP"
    );

    return;
  }

  try {

    setLoading(true);

    // DIFFERENT ENDPOINTS
    const endpoint =
      otpType === "login"
        ? "https://www.cgpisoftware.com/cheerytail/api/auth/verify-login-otp"
        : "https://www.cgpisoftware.com/cheerytail/api/auth/verify-email-otp";

    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      }
    );

    const result = await response.json();

    console.log(
      "VERIFY OTP RESPONSE =>",
      result
    );

    if (
      result.status === true ||
      result.status === "success"
    ) {

      // TOKEN
      const token =
        result?.data?.token ||
        result?.token;

      // USER DATA
      const user =
        result?.data?.user ||
        result?.user;

      // SAVE TOKEN
      if (token) {

        await AsyncStorage.setItem(
          "token",
          token
        );
      }

      // SAVE USER
      if (user) {

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(user)
        );
      }

      Alert.alert(
        "Success",
        "OTP Verified Successfully"
      );

      // RESET STATES
      setStep("auth");
      setIsLogin(true);
      setOtp("");
      setOtpType("");

      // NAVIGATE
      navigation.navigate("Main", {
  screen: "Profile",
});

    } else {

      Alert.alert(
        "Error",
        result.message || "Invalid OTP"
      );
    }

  } catch (error) {

    console.log(error);

    Alert.alert(
      "Error",
      "Something went wrong"
    );

  } finally {

    setLoading(false);
  }
};

  // =========================
  // RESEND OTP
  // =========================
  const handleResendOtp = async () => {

    try {

      setLoading(true);

      const endpoint =
  otpType === "login"
    ? "https://www.cgpisoftware.com/cheerytail/api/auth/login"
    : "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp";

      const response = await fetch(
        endpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const result = await response.json();

      console.log(
        "RESEND OTP RESPONSE =>",
        result
      );

      Alert.alert(
        "Success",
        "OTP Resent Successfully"
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Failed to resend OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >

        <ScrollView
          contentContainerStyle={
            styles.wrapper
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <LinearGradient
            colors={[
              "#fff1e6",
              "#ffe4f0",
              "#f3e8ff",
            ]}
            style={styles.container}
          >

            {/* TABS */}
            {step === "auth" && (
              <View style={styles.topTabs}>

                <TouchableOpacity
                  style={[
                    styles.tabBtn,
                    isLogin &&
                      styles.activeTab,
                  ]}
                  onPress={() =>
                    setIsLogin(true)
                  }
                >
                  <Text
                    style={[
                      styles.tabText,
                      isLogin &&
                        styles.activeTabText,
                    ]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabBtn,
                    !isLogin &&
                      styles.activeTab,
                  ]}
                  onPress={() =>
                    setIsLogin(false)
                  }
                >
                  <Text
                    style={[
                      styles.tabText,
                      !isLogin &&
                        styles.activeTabText,
                    ]}
                  >
                    Register
                  </Text>
                </TouchableOpacity>

              </View>
            )}

            {/* TITLE */}
            <Text style={styles.title}>

              {step === "otp"
                ? "Verify OTP 🔐"
                : isLogin
                ? "Welcome Back 🐾"
                : "Create Account 🐾"}

            </Text>

            {/* SUBTITLE */}
            <Text style={styles.subtitle}>

              {step === "otp"
                ? "Enter OTP sent to your email"
                : isLogin
                ? "Login using email & password"
                : "Register as Pet Owner or Boarding Owner"}

            </Text>

            {/* AUTH FORM */}
            {step === "auth" && (
              <>

                {!isLogin && (
                  <>
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor="#777"
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                    />

                    <TextInput
                      placeholder="Phone Number"
                      placeholderTextColor="#777"
                      style={styles.input}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </>
                )}

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#777"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#777"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {!isLogin && (
                  <>

                    <Text style={styles.roleTitle}>
                      Choose Role
                    </Text>

                    <View
                      style={
                        styles.roleContainer
                      }
                    >

                      <TouchableOpacity
                        style={[
                          styles.roleBtn,
                          role ===
                            "pet_owner" &&
                            styles.activeRole,
                        ]}
                        onPress={() =>
                          setRole(
                            "pet_owner"
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.roleText,
                            role ===
                              "pet_owner" &&
                              styles.activeRoleText,
                          ]}
                        >
                          Pet Owner
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.roleBtn,
                          role ===
                            "boarding_owner" &&
                            styles.activeRole,
                        ]}
                        onPress={() =>
                          setRole(
                            "boarding_owner"
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.roleText,
                            role ===
                              "boarding_owner" &&
                              styles.activeRoleText,
                          ]}
                        >
                          Boarding Owner
                        </Text>
                      </TouchableOpacity>

                    </View>

                  </>
                )}

              </>
            )}

            {/* OTP SCREEN */}
            {step === "otp" && (

              <>
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor="#777"
                  style={styles.input}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                />

                <TouchableOpacity
                  onPress={handleResendOtp}
                >
                  <Text
                    style={styles.resendText}
                  >
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* BUTTON */}
            <TouchableOpacity
              style={styles.registerBtn}
              disabled={loading}
              onPress={() => {

                if (step === "otp") {

                  handleVerifyOtp();

                } else {

                  if (isLogin) {

                    handleLogin();

                  } else {

                    handleRegister();
                  }
                }
              }}
            >

              {loading ? (

                <ActivityIndicator
                  color="#fff"
                />

              ) : (

                <Text
                  style={
                    styles.registerText
                  }
                >

                  {step === "otp"
                    ? "Verify OTP"
                    : isLogin
                    ? "Login"
                    : "Register"}

                </Text>
              )}

            </TouchableOpacity>

            {/* BACK BUTTON */}
            {step === "otp" && (
              <TouchableOpacity
                onPress={() =>
                  setStep("auth")
                }
              >
                <Text style={styles.backText}>
                  Back
                </Text>
              </TouchableOpacity>
            )}

          </LinearGradient>

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  container: {
    borderRadius: 24,
    padding: 22,
  },

  topTabs: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    padding: 4,
    marginBottom: 25,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#6b21a8",
  },

  tabText: {
    fontWeight: "600",
    color: "#555",
  },

  activeTabText: {
    color: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 15,
  },

  roleTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },

  roleContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },

  roleBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  activeRole: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },

  roleText: {
    fontWeight: "600",
    color: "#555",
  },

  activeRoleText: {
    color: "#fff",
  },

  registerBtn: {
    backgroundColor: "#6b21a8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  resendText: {
    textAlign: "center",
    color: "#6b21a8",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
  },

  backText: {
    textAlign: "center",
    color: "#666",
    marginTop: 16,
    fontWeight: "600",
  },
});