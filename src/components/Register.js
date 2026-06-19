import React, { useState } from "react";

import {
  View,
  Text,
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
import registerStyles from "../styles/RegisterScreenStyles";

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

      navigation.reset({
        index: 0,
        routes: [
          {
            name:
              guestRole === "boarding_owner"
                ? "GuestBoarding"
                : "GuestPetOwner",
          },
        ],
      });
    };

  return (
    <SafeAreaView style={registerStyles.container}>
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
            registerStyles.scrollContainer
          }
          showsVerticalScrollIndicator={
            false
          }
        >
          <View
            style={registerStyles.welcomeHeader}
          >
            <Text
              style={registerStyles.welcomeTitle}
            >
              Welcome
            </Text>

            <Text
              style={registerStyles.welcomeSubtitle}
            >
              Sign in to continue or
              create an account
            </Text>
          </View>

          {step === "auth" && (
            <>
              <View
                style={
                  registerStyles.segmentContainer
                }
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    registerStyles.segmentButton,
                    isLogin &&
                      registerStyles.segmentActive,
                  ]}
                  onPress={() =>
                    setIsLogin(true)
                  }
                >
                  <Text
                    style={[
                      registerStyles.segmentText,
                      isLogin &&
                        registerStyles.segmentActiveText,
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    registerStyles.segmentButton,
                    !isLogin &&
                      registerStyles.segmentActive,
                  ]}
                  onPress={() =>
                    setIsLogin(false)
                  }
                >
                  <Text
                    style={[
                      registerStyles.segmentText,
                      !isLogin &&
                        registerStyles.segmentActiveText,
                    ]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              {isLogin ? (
                <View
                  style={registerStyles.authCard}
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
                      registerStyles.guestContainer
                    }
                  >
                    <Text
                      style={
                        registerStyles.guestTitle
                      }
                    >
                      Explore without
                      account
                    </Text>

                    <TouchableOpacity
                      style={
                        registerStyles.guestButton
                      }
                      onPress={() =>
                        constinueAsGuest(
                          "pet_owner"
                        )
                      }
                    >
                      <Text
                        style={
                          registerStyles.guestButtonText
                        }
                      >
                        Continue as Pet
                        Owner Guest
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        registerStyles.guestButton
                      }
                      onPress={() =>
                        constinueAsGuest(
                          "boarding_owner"
                        )
                      }
                    >
                      <Text
                        style={
                          registerStyles.guestButtonText
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
                  style={registerStyles.authCard}
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
              navigation={navigation}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

