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
import * as DocumentPicker from "expo-document-picker";
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
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
const [alternateContactNumber, setAlternateContactNumber] = useState("");
const [residentialAddress, setResidentialAddress] = useState("");
const [emergencyContactName, setEmergencyContactName] = useState("");
const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
const [aadharFile, setAadharFile] = useState(null);
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

  // NORMAL LOGIN OTP FLOW
  Alert.alert(
    "Success",
    "OTP Sent Successfully"
  );

  setOtpType("login");
  setStep("otp");

} else if (
  result.message?.toLowerCase().includes("verify email")
) {

  // UNVERIFIED EMAIL FLOW

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

  const otpResult = await otpResponse.json();

  console.log(
    "UNVERIFIED EMAIL OTP RESPONSE =>",
    otpResult
  );

  Alert.alert(
    "Email Not Verified",
    "Verification OTP sent to your email"
  );

  // IMPORTANT
  setOtpType("register");

  // OPEN SAME OTP SCREEN
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
  // =========================
// PICK AADHAR FILE
// =========================
const pickAadharFile = async () => {

  try {

    const result =
      await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });

    console.log(
      "DOCUMENT PICKER RESULT =>",
      result
    );

    if (!result.canceled) {

      const file = result.assets[0];

      console.log(
        "FULL FILE OBJECT =>",
        JSON.stringify(file, null, 2)
      );

      console.log("FILE URI =>", file.uri);
      console.log("FILE NAME =>", file.name);
      console.log("FILE MIME =>", file.mimeType);
      console.log("FILE SIZE =>", file.size);

      setAadharFile(file);
    }

  } catch (error) {

    console.log(
      "FILE PICK ERROR =>",
      error
    );

    Alert.alert(
      "Error",
      "Failed to pick file"
    );
  }
};
// REGISTER
// =========================
const handleRegister = async () => {
  if (
    !name ||
    !email ||
    !password ||
    !mobileNumber ||
    !alternateContactNumber ||
    !residentialAddress ||
    !emergencyContactName ||
    !emergencyContactNumber ||
    !aadharFile
  ) {
    Alert.alert("Validation", "Please fill all fields and upload Aadhar file");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("full_name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobile_number", mobileNumber);
    formData.append("alternate_contact_number", alternateContactNumber);
    formData.append("residential_address", residentialAddress);
    formData.append("emergency_contact_name", emergencyContactName);
    formData.append("emergency_contact_number", emergencyContactNumber);
    formData.append("role", role);

    // ✅ IMPORTANT FIX FOR FILE (NO PLATFORM CHECK NEEDED)
    formData.append("aadhar_file", {
      uri: aadharFile.uri,
      
      name: aadharFile.name || "aadhar.jpg",
      type: aadharFile.mimeType || "image/jpeg",
    });

    console.log("FORMDATA =>", formData);

  const response = await fetch(
  "https://www.cgpisoftware.com/cheerytail/api/auth/register",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "User-Agent": "PostmanRuntime/7.29.0"
    },
    body: formData,
  }
);

    const responseText = await response.text();

    console.log("RAW RESPONSE =>", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.log("JSON ERROR =>", e);
      Alert.alert("Server Error", responseText);
      return;
    }

    if (result.status === true || result.status === "success") {

  // CALL SEND OTP API
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

  const otpResult = await otpResponse.json();

  console.log(
    "SEND EMAIL OTP RESPONSE =>",
    otpResult
  );

  console.log(
    "REGISTER OTP =>",
    otpResult?.data?.otp
  );

  Alert.alert(
    "Success",
    "OTP Sent Successfully"
  );

  setOtpType("register");
  setStep("otp");

} else {

  Alert.alert(
    "Error",
    result.message || "Registration failed"
  );
}
  } catch (error) {
    console.log("REGISTER ERROR =>", error);
    Alert.alert("Error", "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  
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
  // TOKEN SAVED
// APP.JS WILL AUTO REDIRECT

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
  placeholder="Mobile Number"
  placeholderTextColor="#777"
  style={styles.input}
  value={mobileNumber}
  onChangeText={setMobileNumber}
  keyboardType="phone-pad"
/>

<TextInput
  placeholder="Alternate Contact Number"
  placeholderTextColor="#777"
  style={styles.input}
  value={alternateContactNumber}
  onChangeText={setAlternateContactNumber}
  keyboardType="phone-pad"
/>

<TextInput
  placeholder="Residential Address"
  placeholderTextColor="#777"
  style={[
    styles.input,
    {
      height: 100,
      textAlignVertical: "top",
      paddingTop: 14,
    },
  ]}
  value={residentialAddress}
  onChangeText={setResidentialAddress}
  multiline
/>

<TextInput
  placeholder="Emergency Contact Name"
  placeholderTextColor="#777"
  style={styles.input}
  value={emergencyContactName}
  onChangeText={setEmergencyContactName}
/>

<TextInput
  placeholder="Emergency Contact Number"
  placeholderTextColor="#777"
  style={styles.input}
  value={emergencyContactNumber}
  onChangeText={setEmergencyContactNumber}
  keyboardType="phone-pad"
/>

{/* AADHAR FILE */}
<TouchableOpacity
  style={styles.fileBtn}
  onPress={pickAadharFile}
>
  <Text style={styles.fileBtnText}>

    {aadharFile
      ? aadharFile.name
      : "Upload Aadhar File"}

  </Text>
</TouchableOpacity>

{/* FILE TYPE TEXT */}
{aadharFile && (
  <Text style={styles.fileInfo}>
    Selected:
    {" "}
    {aadharFile.name}
  </Text>
)}
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

  fileBtn: {
  backgroundColor: "#fff",
  borderRadius: 14,
  paddingVertical: 16,
  paddingHorizontal: 16,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#eee",
},

fileBtnText: {
  color: "#555",
  fontSize: 15,
},

fileInfo: {
  color: "#666",
  fontSize: 13,
  marginBottom: 14,
  marginLeft: 4,
},
});