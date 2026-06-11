import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import {
  fetchCapacityApi,
  checkAvailabilityApi,
  fetchBookedDatesApi,
} from "../services/boardingService";

export default function BoardingBookingScreen({ route, navigation }) {
  const { centerId, centerName, pricePerDay } = route.params;

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const [checkInDate, setCheckInDate] = useState(new Date());

  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000),
  );

  const [bookedDates, setBookedDates] = useState([]);
  const [fetchingBookedDates, setFetchingBookedDates] = useState(false);

  const [pickerMode, setPickerMode] = useState("checkin");

  const [capacity, setCapacity] = useState(null);

  const [available, setAvailable] = useState(null);

  const [loadingCapacity, setLoadingCapacity] = useState(false);

  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    const checkGuestAndLoad = async () => {
      const guestRole = await AsyncStorage.getItem("guestRole");
      if (guestRole) {
        Alert.alert(
          "Sign in required",
          "Please sign in or create an account to continue booking.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => navigation.goBack(),
            },
            {
              text: "Sign In / Sign Up",
              onPress: () => navigation.navigate("Auth"),
            },
          ],
        );
        return;
      }

      loadPets();
      getCapacity();
    };

    checkGuestAndLoad();
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const normalizeBookedDates = (dates) => {
    if (!Array.isArray(dates)) return [];
    return dates
      .map((date) => {
        if (typeof date === "string") return date;
        if (date && typeof date === "object") return date.date || date.booked_date || "";
        return "";
      })
      .filter(Boolean);
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const hasBookedDateInRange = (startDate, endDate) => {
    const range = getDatesBetween(startDate, endDate);
    return range.some((date) => bookedDates.includes(date));
  };

  const getMarkedDates = () => {
    const marked = {};

    bookedDates.forEach((date) => {
      marked[date] = {
        disabled: true,
        disableTouchEvent: true,
        color: "#fee2e2",
        textColor: "#991b1b",
      };
    });

    const selectedRange = getDatesBetween(checkInDate, checkOutDate);
    selectedRange.forEach((date) => {
      const isStart = date === formatDate(checkInDate);
      const isEnd = date === formatDate(checkOutDate);

      marked[date] = {
        ...(marked[date] || {}),
        disabled: marked[date]?.disabled ?? false,
        disableTouchEvent: marked[date]?.disableTouchEvent ?? false,
        startingDay: isStart,
        endingDay: isEnd,
        color: isStart || isEnd ? "#f97316" : "#fed7aa",
        textColor: "#111827",
      };
    });

    return marked;
  };

  const loadBookedDatesForMonth = async (date) => {
    if (!centerId || !date) return;

    try {
      setFetchingBookedDates(true);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const data = await fetchBookedDatesApi(centerId, year, month);
      setBookedDates(normalizeBookedDates(data));
    } catch (error) {
      console.log("Booked dates fetch failed:", error);
      setBookedDates([]);
    } finally {
      setFetchingBookedDates(false);
    }
  };

  const isDateBooked = async (date) => {
    const isoDate = formatDate(date);
    if (bookedDates.includes(isoDate)) {
      return true;
    }

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const loadedMonth = checkInDate.getMonth() + 1;
    const loadedYear = checkInDate.getFullYear();

    if (month !== loadedMonth || year !== loadedYear) {
      const data = await fetchBookedDatesApi(centerId, year, month);
      const normalized = normalizeBookedDates(data);
      if (normalized.includes(isoDate)) {
        return true;
      }

      if (year === loadedYear && month === loadedMonth) {
        setBookedDates(normalized);
      }
    }

    return false;
  };

  useEffect(() => {
    loadBookedDatesForMonth(checkInDate);
  }, [centerId, checkInDate.getFullYear(), checkInDate.getMonth()]);

  const totalDays = Math.max(
    1,
    Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)),
  );

  const totalCost = totalDays * Number(pricePerDay || 0);

  const loadPets = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/pets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      console.log("PETS RESPONSE:", JSON.stringify(data, null, 2));

      const petList = data.data || [];

      setPets(petList);

      if (petList.length > 0) {
        setSelectedPetId(petList[0].pet_id || petList[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCapacity = async () => {
    try {
      setLoadingCapacity(true);
      const data = await fetchCapacityApi(centerId);
      console.log("Capacity:", data);
      setCapacity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCapacity(false);
    }
  };

  const checkAvailability = async () => {
    try {
      setCheckingAvailability(true);
      const data = await checkAvailabilityApi({
        centerId,
        startDate: formatDate(checkInDate),
        endDate: formatDate(checkOutDate),
      });

      console.log("Availability:", data);
      setAvailable(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Failed to check availability");
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleDateSelection = async (date) => {
    if (!date) return;

    if (await isDateBooked(date)) {
      Alert.alert(
        "Unavailable",
        `${formatDate(date)} is already booked. Please select another date.`,
      );
      return;
    }

    if (pickerMode === "checkin") {
      setCheckInDate(date);
      if (date >= checkOutDate) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOutDate(nextDay);
      }
      return;
    }

    if (date <= checkInDate) {
      Alert.alert("Invalid Dates", "End date must be after the start date");
      return;
    }

    if (hasBookedDateInRange(checkInDate, date)) {
      Alert.alert(
        "Unavailable range",
        "The selected stay overlaps unavailable dates. Please choose a different range.",
      );
      return;
    }

    setCheckOutDate(date);
  };

  const createBooking = async () => {
    try {
      if (!selectedPetId) {
        Alert.alert("Error", "Please select a pet");
        return;
      }

      if (checkOutDate <= checkInDate) {
        Alert.alert("Invalid Dates", "End date must be after start date");
        return;
      }

      const token = await AsyncStorage.getItem("token");

      setBookingLoading(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            center_id: centerId,
            pet_id: selectedPetId,
            start_date: formatDate(checkInDate),
            end_date: formatDate(checkOutDate),
            special_instructions: specialInstructions,
          }),
        },
      );

      const data = await response.json();

      console.log("Booking:", data);

      if (data.status === "success") {
        Alert.alert("Success", "Booking created successfully");

        navigation.goBack();
      } else {
        Alert.alert("Failed", data.message || "Booking creation failed");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Unable to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <View style={styles.card}>
          <Text style={styles.centerName}>{centerName}</Text>

          <Text style={styles.price}>₹{pricePerDay} / day</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Select Pet</Text>

          <Picker
            selectedValue={selectedPetId}
            onValueChange={(value) => setSelectedPetId(value)}
          >
            {pets.map((pet, index) => (
              <Picker.Item
                key={pet.pet_id || pet.id || index}
                label={pet.pet_name || pet.name || "Pet"}
                value={pet.pet_id || pet.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Booking Dates</Text>

          <View style={styles.dateRow}>
            <TouchableOpacity
              style={[
                styles.datePill,
                pickerMode === "checkin" && styles.activePill,
              ]}
              onPress={() => setPickerMode("checkin")}
            >
              <Text style={[styles.dateLabel, pickerMode === "checkin" && styles.activePillText]}>
                Check In
              </Text>
              <Text style={[styles.dateValue, pickerMode === "checkin" && styles.activePillText]}>
                {checkInDate.toDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.datePill,
                pickerMode === "checkout" && styles.activePill,
              ]}
              onPress={() => setPickerMode("checkout")}
            >
              <Text style={[styles.dateLabel, pickerMode === "checkout" && styles.activePillText]}>
                Check Out
              </Text>
              <Text style={[styles.dateValue, pickerMode === "checkout" && styles.activePillText]}>
                {checkOutDate.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <Calendar
            current={formatDate(checkInDate)}
            minDate={formatDate(new Date())}
            markingType="period"
            markedDates={getMarkedDates()}
            disableAllTouchEventsForDisabledDays={true}
            onDayPress={(day) => handleDateSelection(new Date(day.dateString))}
            onMonthChange={({ dateString }) => {
              const [year, month] = dateString.split("-").map(Number);
              loadBookedDatesForMonth(new Date(year, month - 1, 1));
            }}
            theme={{
              todayTextColor: "#10b981",
              arrowColor: "#f97316",
              disabledArrowColor: "#d1d5db",
            }}
            style={{ marginTop: 12, borderRadius: 16 }}
          />

          <View style={styles.legendRow}>
            <View style={[styles.markerBadge, { backgroundColor: "#fee2e2" }]} />
            <Text style={styles.markerText}>Booked / unavailable dates</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.markerBadge, { backgroundColor: "#f97316" }]} />
            <Text style={styles.markerText}>Selected stay range</Text>
          </View>

          {fetchingBookedDates ? (
            <ActivityIndicator style={{ marginTop: 10 }} />
          ) : bookedDates.length > 0 ? (
            <Text
              style={{
                marginTop: 10,
                color: "#ef4444",
                fontWeight: "600",
              }}
            >
              {bookedDates.length} unavailable date(s) in this month.
            </Text>
          ) : (
            <Text style={{ marginTop: 10, color: "#4b5563" }}>
              No unavailable dates found for the selected month.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.orangeBtn}
            onPress={checkAvailability}
          >
            <Text style={styles.btnText}>Check Availability</Text>
          </TouchableOpacity>

          {checkingAvailability && (
            <ActivityIndicator
              style={{
                marginTop: 10,
              }}
            />
          )}

          {available?.data && (
            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text>Total Days : {available.data.total_days}</Text>

              <Text>Available Days : {available.data.available_days}</Text>

              <Text>Price Per Day : ₹{available.data.price_per_day}</Text>

              <Text>Capacity : {available.data.capacity}</Text>

              <Text
                style={{
                  marginTop: 10,
                  color: available.data.is_available ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {available.data.is_available ? "Available" : "Not Available"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Special Instructions</Text>

          <TextInput
            placeholder="Please feed twice daily..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text>Total Days : {totalDays}</Text>

          <Text
            style={{
              marginTop: 8,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Total Amount : ₹{totalCost}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={createBooking}
          disabled={bookingLoading}
        >
          <Text style={styles.btnText}>
            {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
  },

  centerName: {
    fontSize: 22,
    fontWeight: "bold",
  },

  price: {
    marginTop: 5,
    color: "#ea580c",
    fontWeight: "700",
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  datePill: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 12,
  },

  activePillText: {
    color: "#ffffff",
  },

  activePill: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },

  dateLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },

  dateValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  markerBadge: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },

  markerText: {
    color: "#4b5563",
  },

  orangeBtn: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  bookBtn: {
    backgroundColor: "#ec4899",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
