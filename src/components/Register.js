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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pet_owner");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Validation", "Please fill all fields");
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

      console.log("REGISTER RESPONSE =>", result);

      if (result.status === "success") {
        Alert.alert(
          "Success",
          `Registration Successful\nUser ID: ${result.data.user_id}`
        );

        // Reset Form
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRole("pet_owner");
      } else {
        Alert.alert("Error", result.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        <Text style={styles.title}>Create Account 🐾</Text>

        <Text style={styles.subtitle}>
          Register as Pet Owner or Boarding Owner
        </Text>

        {/* Name */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#777"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Phone */}
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#777"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Role Buttons */}
        <Text style={styles.roleTitle}>Choose Role</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === "pet_owner" && styles.activeRole,
            ]}
            onPress={() => setRole("pet_owner")}
          >
            <Text
              style={[
                styles.roleText,
                role === "pet_owner" && styles.activeRoleText,
              ]}
            >
              Pet Owner
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === "boarding_owner" && styles.activeRole,
            ]}
            onPress={() => setRole("boarding_owner")}
          >
            <Text
              style={[
                styles.roleText,
                role === "boarding_owner" && styles.activeRoleText,
              ]}
            >
              Boarding Owner
            </Text>
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerText}>Register</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },

  container: {
    borderRadius: 24,
    padding: 22,
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
  },

  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});