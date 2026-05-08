import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function BookingInterface() {
  const [pets, setPets] = useState(["Buddy", "Luna", "Max", "Bella"]);
  const [selectedPet, setSelectedPet] = useState("Buddy");

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000),
  );

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("checkin");

  // ✅ NEW STATES FOR ADD PET FORM
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPetName, setNewPetName] = useState("");
  const [newPetType, setNewPetType] = useState("Dog");

  const pricePerDay = 45;

  const calculateDays = () => {
    const diff = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 1;
  };

  const totalDays = calculateDays();
  const totalCost = totalDays * pricePerDay;

  // ✅ ADD PET WITH FORM DATA
  const handleAddPet = () => {
    if (!newPetName.trim()) {
      Alert.alert("Error", "Please enter pet name");
      return;
    }

    setPets([...pets, newPetName]);
    setSelectedPet(newPetName);

    // reset form
    setNewPetName("");
    setNewPetType("Dog");
    setShowAddPet(false);
  };

  const handleBooking = () => {
    if (checkOutDate <= checkInDate) {
      Alert.alert("Invalid Dates", "Check-out must be after check-in");
      return;
    }

    Alert.alert(
      "Booking Confirmed 🎉",
      `${selectedPet} booked for ${totalDays} days\nTotal: ₹${totalCost}`,
    );
  };

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* TITLE */}
        <Text style={styles.title}>
          Book Your Pet's <Text style={styles.gradientText}>Perfect Stay</Text>
        </Text>

        {/* PET CARD */}
        <View style={[styles.card, { borderColor: "#e9d5ff" }]}>
          <Text style={styles.heading}>Select Your Pet</Text>

          {/* Picker */}
          <Picker
            selectedValue={selectedPet}
            onValueChange={(v) => setSelectedPet(v)}
          >
            {pets.map((p) => (
              <Picker.Item key={p} label={p} value={p} />
            ))}
          </Picker>

          {/* Chips */}
          <View style={styles.petRow}>
            {pets.map((pet) => (
              <TouchableOpacity key={pet} onPress={() => setSelectedPet(pet)}>
                <LinearGradient
                  colors={
                    selectedPet === pet
                      ? ["#fb923c", "#ec4899"]
                      : ["#f1f5f9", "#f1f5f9"]
                  }
                  style={styles.petChip}
                >
                  <Text
                    style={{
                      color: selectedPet === pet ? "#fff" : "#374151",
                      fontWeight: "600",
                    }}
                  >
                    {pet}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}

            {/* ➕ Toggle Add Pet Form */}
            <TouchableOpacity onPress={() => setShowAddPet(!showAddPet)}>
              <LinearGradient
                colors={["#e0e7ff", "#c7d2fe"]}
                style={styles.addPetChip}
              >
                <Text style={{ fontWeight: "bold", color: "#4338ca" }}>
                  + Add Pet
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ✅ ADD PET FORM */}
          {showAddPet && (
            <View style={styles.addPetBox}>
              <TextInput
                placeholder="Pet name"
                value={newPetName}
                onChangeText={setNewPetName}
                style={styles.input}
              />

              <Picker
                selectedValue={newPetType}
                onValueChange={(v) => setNewPetType(v)}
              >
                <Picker.Item label="Dog" value="Dog" />
                <Picker.Item label="Cat" value="Cat" />
                <Picker.Item label="Rabbit" value="Rabbit" />
                <Picker.Item label="Other" value="Other" />
              </Picker>

              <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Add Pet
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* DATE CARD */}
        <View style={[styles.card, { borderColor: "#fed7aa" }]}>
          <Text style={styles.heading}>Choose Dates</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setPickerMode("checkin");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={18} />
            <Text>{checkInDate.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setPickerMode("checkout");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={18} />
            <Text>{checkOutDate.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={pickerMode === "checkin" ? checkInDate : checkOutDate}
              mode="date"
              minimumDate={new Date()}
              onChange={(e, d) => {
                setShowPicker(false);
                if (!d) return;

                if (pickerMode === "checkin") {
                  setCheckInDate(d);
                  if (d >= checkOutDate) {
                    setCheckOutDate(new Date(d.getTime() + 86400000));
                  }
                } else {
                  setCheckOutDate(d);
                }
              }}
            />
          )}

          {/* SUMMARY */}
          <LinearGradient
            colors={["#fff7ed", "#fdf2f8"]}
            style={styles.summaryBox}
          >
            <View style={styles.row}>
              <Text>Total Days</Text>
              <Text style={{ fontWeight: "bold", color: "#ea580c" }}>
                {totalDays}
              </Text>
            </View>

            <View style={styles.row}>
              <Text>₹ {pricePerDay} / day</Text>
              <Text style={{ color: "#db2777", fontWeight: "bold" }}>
                ₹{pricePerDay}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={{ fontWeight: "bold" }}>Total</Text>
              <Text style={styles.totalText}>₹{totalCost}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* BUTTON */}
        <TouchableOpacity onPress={handleBooking}>
          <LinearGradient colors={["#f97316", "#ec4899"]} style={styles.button}>
            <Text style={styles.buttonText}>Book Now →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
  },

  gradientText: { color: "#f97316" },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f2937",
  },

  petRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },

  petChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  addPetChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  addPetBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#c7d2fe",
    backgroundColor: "#eef2ff",
  },

  input: {
    borderWidth: 2,
    borderColor: "#c7d2fe",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "#f97316",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  dateInput: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fed7aa",
    marginBottom: 10,
  },

  summaryBox: {
    marginTop: 15,
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fed7aa",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ea580c",
  },

  button: {
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
