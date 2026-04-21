import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function BookingInterface() {
  const [selectedPet, setSelectedPet] = useState("Buddy");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("checkin");

  const pets = ["Buddy", "Luna", "Max", "Bella"];
  const pricePerDay = 45;

  const calculateDays = () => {
    const diff =
      Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) /
          (1000 * 60 * 60 * 24),
      ) || 1;
    return diff > 0 ? diff : 1;
  };

  const totalDays = calculateDays();
  const totalCost = totalDays * pricePerDay;

  const openDatePicker = (mode) => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      if (pickerMode === "checkin") setCheckInDate(selectedDate);
      else setCheckOutDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Your Pet Stay</Text>

      {/* PET SELECT */}
      <View style={styles.card}>
        <Text style={styles.heading}>Select Pet</Text>

        <Picker
          selectedValue={selectedPet}
          onValueChange={(value) => setSelectedPet(value)}
        >
          {pets.map((p) => (
            <Picker.Item key={p} label={p} value={p} />
          ))}
        </Picker>
      </View>

      {/* DATES */}
      <View style={styles.card}>
        <Text style={styles.heading}>Choose Dates</Text>

        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => openDatePicker("checkin")}
        >
          <Ionicons name="calendar-outline" size={20} />
          <Text style={styles.dateText}>
            Check-in: {checkInDate.toDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => openDatePicker("checkout")}
        >
          <Ionicons name="calendar-outline" size={20} />
          <Text style={styles.dateText}>
            Check-out: {checkOutDate.toDateString()}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={pickerMode === "checkin" ? checkInDate : checkOutDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      {/* PRICE */}
      <View style={styles.card}>
        <Text style={styles.heading}>Summary</Text>

        <Text>Total Days: {totalDays}</Text>
        <Text>Price/Day: ₹{pricePerDay}</Text>

        <Text style={styles.total}>Total: ₹{totalCost}</Text>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookText}>BOOK NOW</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e8ff",
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    marginBottom: 10,
  },

  dateText: {
    marginLeft: 10,
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#7c3aed",
  },

  bookBtn: {
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  bookText: {
    color: "white",
    fontWeight: "bold",
  },
});
