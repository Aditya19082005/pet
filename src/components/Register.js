import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import LoginForm from "./auth/LoginForm";
import OTPVerification from "./auth/OTPVerification";
import RoleSelector from "./auth/RoleSelector";
import PetOwnerRegister from "./auth/PetOwnerRegister";
import BoardingOwnerRegister from "./auth/BoardingOwnerRegister";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({
  navigation,
}) {
  const [isLogin, setIsLogin] =
    useState(true);

  const [step, setStep] =
    useState("auth");

  const [role, setRole] =
    useState("pet_owner");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [otpType, setOtpType] =
    useState("");

  const constinueAsGuest =
    async (guestRole) => {
      await AsyncStorage.setItem(
        "guestRole",
        guestRole
      );

      await AsyncStorage.setItem(
        "isGuest",
        "true"
      );

      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Root" }],
      // });
    };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scrollContainer
          }
          showsVerticalScrollIndicator={
            false
          }
        >
          <View
            style={{ marginBottom: 18 }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Welcome
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: "#6B7280",
                fontSize: 15,
              }}
            >
              Sign in to continue or
              create an account
            </Text>
          </View>

          {step === "auth" && (
            <>
              <View
                style={
                  styles.segmentContainer
                }
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.segmentButton,
                    isLogin &&
                      styles.segmentActive,
                  ]}
                  onPress={() =>
                    setIsLogin(true)
                  }
                >
                  <Text
                    style={[
                      styles.segmentText,
                      isLogin &&
                        styles.segmentActiveText,
                    ]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.segmentButton,
                    !isLogin &&
                      styles.segmentActive,
                  ]}
                  onPress={() =>
                    setIsLogin(false)
                  }
                >
                  <Text
                    style={[
                      styles.segmentText,
                      !isLogin &&
                        styles.segmentActiveText,
                    ]}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>

              {isLogin ? (
                <View
                  style={styles.authCard}
                >
                  <LoginForm
                    setStep={setStep}
                    setOtpType={
                      setOtpType
                    }
                    setEmail={setEmail}
                    setPassword={
                      setPassword
                    }
                  />

                  <View
                    style={
                      styles.guestContainer
                    }
                  >
                    <Text
                      style={
                        styles.guestTitle
                      }
                    >
                      Explore without
                      account
                    </Text>

                    <TouchableOpacity
                      style={
                        styles.guestButton
                      }
                      onPress={() =>
                        constinueAsGuest(
                          "pet_owner"
                        )
                      }
                    >
                      <Text
                        style={
                          styles.guestButtonText
                        }
                      >
                        Continue as Pet
                        Owner Guest
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        styles.guestButton
                      }
                      onPress={() =>
                        constinueAsGuest(
                          "boarding_owner"
                        )
                      }
                    >
                      <Text
                        style={
                          styles.guestButtonText
                        }
                      >
                        Continue as
                        Boarding Owner
                        Guest
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={styles.authCard}
                >
                  <RoleSelector
                    role={role}
                    setRole={setRole}
                  />

                  {role ===
                  "pet_owner" ? (
                    <PetOwnerRegister
                      setStep={setStep}
                      setOtpType={
                        setOtpType
                      }
                      setEmail={
                        setEmail
                      }
                    />
                  ) : (
                    <BoardingOwnerRegister
                      setStep={setStep}
                      setOtpType={
                        setOtpType
                      }
                      setEmail={
                        setEmail
                      }
                    />
                  )}
                </View>
              )}
            </>
          )}

          {step === "otp" && (
            <OTPVerification
              email={email}
              otpType={otpType}
              password={password}
              setStep={setStep}
              onSuccess={() => {
                setStep("auth");
                setIsLogin(true);
              }}
              onBack={() =>
                setStep("auth")
              }
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  scrollContainer: {
    paddingHorizontal: 18,
    paddingTop:
      Platform.OS === "android"
        ? 25
        : 15,
    paddingBottom: 60,
    flexGrow: 1,
  },

  authCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  guestContainer: {
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },

  guestTitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },

  guestButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  guestButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#ECE7F5",
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },

  segmentButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  segmentActive: {
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  segmentText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },

  segmentActiveText: {
    color: "#6b21a8",
    fontWeight: "700",
  },
});

