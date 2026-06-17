import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "https://www.cgpisoftware.com/cheerytail";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [aadharFile, setAadharFile] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const guestRole =
      await AsyncStorage.getItem(
        "guestRole"
      );

    console.log(
      "TOKEN =>",
      token
    );

    console.log(
      "GUEST ROLE =>",
      guestRole
    );

    if (!token) {
      if (guestRole) {
        setIsGuest(true);
      }

      return;
    }

      const response = await fetch(
        `${API_URL}/api/user/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      console.log(
        "PROFILE RESPONSE =>",
        JSON.stringify(result, null, 2)
      );

      const data = result?.data || result;
      const details =
        data?.owner_details ||
        data?.owner ||
        result?.owner ||
        data ||
        {};

      const statusSuccess =
        result?.status === "success" ||
        result?.status === true ||
        result?.status === 1 ||
        result?.status === "1" ||
        (!result?.status && !!data);

      if (response.ok && statusSuccess) {
        setUser({
          id:
            data?.id ||
            result?.user_id ||
            result?.id ||
            null,
          role: data?.role || result?.role || "",
          email_verified:
            data?.email_verified ||
            result?.email_verified ||
            false,

          full_name: details.full_name || "",
          email: details.email || "",
          phone: details.mobile_number || "",
          alternate_phone:
            details.alternate_contact_number || "",

          address:
            details.residential_address || "",

          emergency_name:
            details.emergency_contact_name || "",

          emergency_number:
            details.emergency_contact_number || "",

          aadhar_file:
            details.aadhar_file || "",

          created_at:
            data?.created_at || result?.created_at || "",

          updated_at:
            data?.updated_at || result?.updated_at || "",
        });
      }
    } catch (error) {
      console.log(
        "PROFILE ERROR =>",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const startEditing = () => {
    setFullName(user?.full_name || "");
    setPhone(user?.phone || "");
    setAlternatePhone(user?.alternate_phone || "");
    setAddress(user?.address || "");
    setEmergencyName(user?.emergency_name || "");
    setEmergencyNumber(user?.emergency_number || "");
    setAadharFile(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setAadharFile(null);
  };

  const pickAadhar = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (!result.canceled) {
        setAadharFile(result.assets[0]);
      }
    } catch (error) {
      console.log("AADHAAR PICK ERROR =>", error);
    }
  };

  const handleSaveProfile = async () => {
    if (
      !fullName ||
      !phone ||
      !address ||
      !emergencyName ||
      !emergencyNumber
    ) {
      Alert.alert(
        "Validation",
        "Please fill all required fields."
      );
      return;
    }

    setSaving(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Session Required",
          "Please sign in again to update your profile."
        );
        return;
      }

      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("mobile_number", phone);
      formData.append(
        "alternate_contact_number",
        alternatePhone
      );
      formData.append("residential_address", address);
      formData.append(
        "emergency_contact_name",
        emergencyName
      );
      formData.append(
        "emergency_contact_number",
        emergencyNumber
      );

      if (aadharFile) {
        formData.append("aadhar_file", {
          uri: aadharFile.uri,
          name:
            aadharFile.name ||
            `aadhar.${aadharFile.uri
              .split(".")
              .pop() ||
              "jpg"}`,
          type:
            aadharFile.mimeType ||
            "application/octet-stream",
        });
      }

      const response = await fetch(
        `${API_URL}/api/user/profile/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const result = await response.json();

      console.log(
        "PROFILE UPDATE RESPONSE =>",
        JSON.stringify(result, null, 2)
      );

      if (
        response.ok &&
        (result.status === true ||
          result.status === "success")
      ) {
        Alert.alert(
          "Success",
          "Profile updated successfully."
        );
        setEditing(false);
        setAadharFile(null);
        fetchProfile();
      } else {
        Alert.alert(
          "Update Failed",
          result.message ||
            "Unable to update profile."
        );
      }
    } catch (error) {
      console.log("PROFILE UPDATE ERROR =>", error);
      Alert.alert(
        "Error",
        "Unable to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSignIn = async () => {
    await AsyncStorage.removeItem("guestRole");
    setIsGuest(false);
    navigation.navigate("Auth");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#6b21a8"
        />
      </View>
    );
  }
if (isGuest) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={{
          uri: "https://i.pravatar.cc/150?img=12",
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Guest User
      </Text>

      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          color: "#666",
        }}
      >
        Sign in or create an account
        to view your profile,
        pets, bookings and other
        personal information.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#6b21a8",
          paddingHorizontal: 30,
          paddingVertical: 14,
          borderRadius: 12,
          marginTop: 25,
        }}
        onPress={handleSignIn}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Sign In / Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

  const currentAadharIsPdf = user?.aadhar_file
    ?.toLowerCase()
    .endsWith(".pdf");

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <LinearGradient
        colors={[
          "#fff1e6",
          "#ffe4f0",
          "#f3e8ff",
        ]}
        style={styles.container}
      >
        {/* Profile Image */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri:
                "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />
        </View>

        {/* Verification Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {user?.email_verified
              ? "⭐ Verified User"
              : "⚠️ Email Not Verified"}
          </Text>
        </View>

        {/* Name */}
       <Text style={styles.name}>
  {user?.full_name || "User"}
</Text>

<View style={styles.infoCard}>
  <Text style={styles.label}>Email</Text>
  <Text style={styles.value}>
    {user?.email}
  </Text>

  <Text style={styles.label}>
    Mobile Number
  </Text>
  <Text style={styles.value}>
    {user?.phone}
  </Text>

  <Text style={styles.label}>
    Alternate Contact Number
  </Text>
  <Text style={styles.value}>
    {user?.alternate_phone}
  </Text>

  <Text style={styles.label}>
    Residential Address
  </Text>
  <Text style={styles.value}>
    {user?.address}
  </Text>

  <Text style={styles.label}>
    Emergency Contact Name
  </Text>
  <Text style={styles.value}>
    {user?.emergency_name}
  </Text>

  <Text style={styles.label}>
    Emergency Contact Number
  </Text>
  <Text style={styles.value}>
    {user?.emergency_number}
  </Text>

  <Text style={styles.label}>Role</Text>
  <Text style={styles.value}>
    {user?.role}
  </Text>

  <Text style={styles.label}>
    Email Verification
  </Text>
  <Text style={styles.value}>
    {user?.email_verified
      ? "Verified ✅"
      : "Not Verified ❌"}
  </Text>

  <Text style={styles.label}>
    Account Created
  </Text>
  <Text style={styles.value}>
    {user?.created_at}
  </Text>

  <Text style={styles.label}>
    Last Updated
  </Text>
  <Text style={styles.value}>
    {user?.updated_at}
  </Text>
</View>

{editing ? (
  <View style={styles.editCard}>
    <Text style={styles.editTitle}>Edit Profile</Text>

    <Text style={styles.formLabel}>Full Name</Text>
    <TextInput
      value={fullName}
      onChangeText={setFullName}
      style={styles.input}
    />

    <Text style={styles.formLabel}>Mobile Number</Text>
    <TextInput
      value={phone}
      onChangeText={setPhone}
      style={styles.input}
      keyboardType="phone-pad"
    />

    <Text style={styles.formLabel}>Alternate Contact Number</Text>
    <TextInput
      value={alternatePhone}
      onChangeText={setAlternatePhone}
      style={styles.input}
      keyboardType="phone-pad"
    />

    <Text style={styles.formLabel}>Residential Address</Text>
    <TextInput
      value={address}
      onChangeText={setAddress}
      style={[styles.input, styles.multiLineInput]}
      multiline
    />

    <Text style={styles.formLabel}>Emergency Contact Name</Text>
    <TextInput
      value={emergencyName}
      onChangeText={setEmergencyName}
      style={styles.input}
    />

    <Text style={styles.formLabel}>Emergency Contact Number</Text>
    <TextInput
      value={emergencyNumber}
      onChangeText={setEmergencyNumber}
      style={styles.input}
      keyboardType="phone-pad"
    />

    <TouchableOpacity
      style={styles.fileButton}
      onPress={pickAadhar}
    >
      <Text style={styles.fileButtonText}>
        Choose Aadhaar File
      </Text>
    </TouchableOpacity>

    {aadharFile ? (
      <Text style={styles.fileName}>
        {aadharFile.name}
      </Text>
    ) : user?.aadhar_file ? (
      <TouchableOpacity
        style={styles.fileAction}
        onPress={() =>
          Linking.openURL(user.aadhar_file)
        }
      >
        <Text style={styles.fileActionText}>
          {currentAadharIsPdf
            ? "View current Aadhaar PDF"
            : "View current Aadhaar image"}
        </Text>
      </TouchableOpacity>
    ) : null}

    <View style={styles.btnRow}>
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={handleSaveProfile}
        disabled={saving}
      >
        <Text style={styles.primaryBtnText}>
          {saving ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.secondaryBtn, styles.cancelBtn]}
        onPress={cancelEdit}
      >
        <Text style={styles.secondaryBtnText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  </View>
) : null}

{user?.aadhar_file ? (
  <>
    <Text style={styles.docTitle}>
      Aadhaar Document
    </Text>

    {currentAadharIsPdf ? (
      <TouchableOpacity
        style={styles.fileAction}
        onPress={() =>
          Linking.openURL(user.aadhar_file)
        }
      >
        <Text style={styles.fileActionText}>
          View Aadhaar PDF
        </Text>
      </TouchableOpacity>
    ) : (
      <Image
        source={{
          uri: user.aadhar_file,
        }}
        style={styles.aadharImage}
        resizeMode="cover"
      />
    )}
  </>
) : null}
        {/* Description */}
        <Text style={styles.desc}>
          Manage your pets, bookings,
          and preferences in one place.
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={startEditing}
          >
            <Text
              style={styles.primaryBtnText}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() =>
              navigation.navigate("Pets", {
                screen: "PetList",
              })
            }
          >
            <Text
              style={
                styles.secondaryBtnText
              }
            >
              My Pets
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  avatarWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  badge: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginBottom: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },

  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  roleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6b21a8",
    marginTop: 12,
  },

  address: {
    marginTop: 12,
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    lineHeight: 22,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  btnRow: {
    width: "100%",
    gap: 12,
  },

  primaryBtn: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  secondaryBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: "bold",
    fontSize: 15,
  },
  infoCard: {
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 15,
  padding: 16,
  marginTop: 20,
  marginBottom: 20,
},

label: {
  fontSize: 12,
  color: "#888",
  fontWeight: "600",
  marginTop: 10,
},

value: {
  fontSize: 15,
  color: "#222",
  marginTop: 4,
},

docTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
  alignSelf: "flex-start",
},

aadharImage: {
  width: "100%",
  height: 220,
  borderRadius: 15,
  marginBottom: 20,
},

editCard: {
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 15,
  padding: 16,
  marginBottom: 20,
  marginTop: 10,
},

editTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 12,
  color: "#1f2937",
},

formLabel: {
  fontSize: 13,
  color: "#4b5563",
  marginTop: 12,
  marginBottom: 6,
},

input: {
  width: "100%",
  backgroundColor: "#f9fafb",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  padding: 12,
  color: "#111827",
},

multiLineInput: {
  minHeight: 80,
  textAlignVertical: "top",
},

fileButton: {
  marginTop: 12,
  backgroundColor: "#eef2ff",
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  alignItems: "center",
},

fileButtonText: {
  color: "#1d4ed8",
  fontWeight: "600",
},

fileName: {
  marginTop: 10,
  fontSize: 14,
  color: "#374151",
},

fileAction: {
  marginTop: 10,
  paddingVertical: 12,
  paddingHorizontal: 14,
  borderRadius: 12,
  backgroundColor: "#f3f4f6",
  width: "100%",
  alignItems: "center",
},

fileActionText: {
  color: "#2563eb",
  fontWeight: "600",
},

cancelBtn: {
  backgroundColor: "#fff",
  borderColor: "#d1d5db",
},
});