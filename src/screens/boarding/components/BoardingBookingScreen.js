import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import styles from "../styles/boardingStyles";
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
    let rawDates = [];

    if (Array.isArray(dates)) {
      rawDates = dates;
    } else if (dates && Array.isArray(dates.data)) {
      rawDates = dates.data;
    } else if (dates && Array.isArray(dates.booked_dates)) {
      rawDates = dates.booked_dates;
    }

    return rawDates
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
        startingDay: true,
        endingDay: true,
        color: "#fee2e2",
        textColor: "#991b1b",
      };
    });

    const selectedRange = getDatesBetween(checkInDate, checkOutDate);
    selectedRange.forEach((date) => {
      if (marked[date]?.disabled) {
        return;
      }

      const isStart = date === formatDate(checkInDate);
      const isEnd = date === formatDate(checkOutDate);

      marked[date] = {
        ...(marked[date] || {}),
        disabled: false,
        disableTouchEvent: false,
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
      const dates = normalizeBookedDates(data);

      console.log("Fetched booked dates:", dates);
      setBookedDates(dates);
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
      style={styles.bookingScreenContainer}
    >
      <ScrollView contentContainerStyle={styles.bookingScreenContent}>
        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenCenterName}>{centerName}</Text>

          <Text style={styles.bookingScreenPrice}>₹{pricePerDay} / day</Text>
        </View>

        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Select Pet</Text>

          <View style={styles.bookingScreenInputWrapper}>
            <Picker
              selectedValue={selectedPetId}
              onValueChange={(value) => setSelectedPetId(value)}
              style={styles.bookingScreenPicker}
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
        </View>

        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Booking Dates</Text>

          <View style={styles.bookingScreenDateRow}>
            <TouchableOpacity
              style={[
                styles.bookingScreenDatePill,
                pickerMode === "checkin" && styles.bookingScreenActivePill,
              ]}
              onPress={() => setPickerMode("checkin")}
            >
              <Text style={[styles.bookingScreenDateLabel, pickerMode === "checkin" && styles.bookingScreenActivePillText]}>
                Check In
              </Text>
              <Text style={[styles.bookingScreenDateValue, pickerMode === "checkin" && styles.bookingScreenActivePillText]}>
                {checkInDate.toDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bookingScreenDatePill,
                pickerMode === "checkout" && styles.bookingScreenActivePill,
              ]}
              onPress={() => setPickerMode("checkout")}
            >
              <Text style={[styles.bookingScreenDateLabel, pickerMode === "checkout" && styles.bookingScreenActivePillText]}>
                Check Out
              </Text>
              <Text style={[styles.bookingScreenDateValue, pickerMode === "checkout" && styles.bookingScreenActivePillText]}>
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
            style={styles.calendarWrapper}
          />

          <View style={styles.bookingScreenLegendRow}>
            <View style={[styles.bookingScreenMarkerBadge, { backgroundColor: "#fee2e2" }]} />
            <Text style={styles.bookingScreenMarkerText}>Booked / unavailable dates</Text>
          </View>
          <View style={styles.bookingScreenLegendRow}>
            <View style={[styles.bookingScreenMarkerBadge, { backgroundColor: "#f97316" }]} />
            <Text style={styles.bookingScreenMarkerText}>Selected stay range</Text>
          </View>

          {fetchingBookedDates ? (
            <ActivityIndicator style={styles.smallLoader} />
          ) : bookedDates.length > 0 ? (
            <Text style={styles.warningText}>
              {bookedDates.length} unavailable date(s) in this month.
            </Text>
          ) : (
            <Text style={styles.statusNote}>
              No unavailable dates found for the selected month.
            </Text>
          )}
        </View>

        <View style={styles.bookingScreenCard}>
          <TouchableOpacity
            style={styles.bookingScreenOrangeBtn}
            onPress={checkAvailability}
          >
            <Text style={styles.bookingScreenBtnText}>Check Availability</Text>
          </TouchableOpacity>

          {checkingAvailability && (
            <ActivityIndicator style={styles.smallLoader} />
          )}

          {available?.data && (
            <View style={styles.availableInfoContainer}>
              <Text>Total Days : {available.data.total_days}</Text>

              <Text>Available Days : {available.data.available_days}</Text>

              <Text>Price Per Day : ₹{available.data.price_per_day}</Text>

              <Text>Capacity : {available.data.capacity}</Text>

              <Text
                style={[
                  styles.availabilityText,
                  { color: available.data.is_available ? "green" : "red" },
                ]}
              >
                {available.data.is_available ? "Available" : "Not Available"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Special Instructions</Text>

          <TextInput
            placeholder="Please feed twice daily..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            style={styles.bookingScreenInput}
          />
        </View>

        <View style={styles.bookingScreenCard}>
          <Text>Total Days : {totalDays}</Text>

          <Text style={styles.totalCostText}>
            Total Amount : ₹{totalCost}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookingScreenBookBtn}
          onPress={createBooking}
          disabled={bookingLoading}
        >
          <Text style={styles.bookingScreenBtnText}>
            {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

