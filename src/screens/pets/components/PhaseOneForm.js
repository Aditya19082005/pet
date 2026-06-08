import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import FormLabel from "./FormLabel";

export default function PhaseOneForm({
  petData,
  setPetData,
  styles,
  fieldErrors = {},
  pickImages,
  selectedImages,
  removeImage,
}) {
  const [showDobPicker, setShowDobPicker] = useState(false);

  const handleDobConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    setPetData({
      ...petData,
      date_of_birth: formattedDate,
    });

    setShowDobPicker(false);
  };

  return (
    <View>
      {/* PET NAME */}

      <FormLabel
        title="Pet Name"
        required
        error={fieldErrors.pet_name}
      />

      <TextInput
        placeholder="Pet Name"
        style={[styles.input, fieldErrors.pet_name && styles.inputError]}
        value={petData.pet_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            pet_name: text,
          })
        }
      />

      {/* PET TYPE */}

      <FormLabel
        title="Pet Type"
        required
        error={fieldErrors.pet_type}
      />

      <View
        style={{
          borderWidth: 1,
          borderColor: fieldErrors.pet_type ? "#ef4444" : "#e5e7eb",
          borderRadius: 14,
          marginBottom: 12,
          overflow: "hidden",
          backgroundColor: fieldErrors.pet_type ? "#fff1f2" : "#fff",
        }}
      >
        <Picker
          selectedValue={petData.pet_type}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              pet_type: value,
            })
          }
        >
          <Picker.Item label="Select Pet Type" value="" />
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
          <Picker.Item label="Bird" value="bird" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* BREED */}

      <FormLabel
        title="Breed"
        required
        error={fieldErrors.breed}
      />

      <TextInput
        placeholder="Breed"
        style={[styles.input, fieldErrors.breed && styles.inputError]}
        value={petData.breed}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            breed: text,
          })
        }
      />

      {/* GENDER */}

      <FormLabel
        title="Gender"
        required
        error={fieldErrors.gender}
      />

      <View
        style={{
          borderWidth: 1,
          borderColor: fieldErrors.gender ? "#ef4444" : "#e5e7eb",
          borderRadius: 14,
          marginBottom: 12,
          overflow: "hidden",
          backgroundColor: fieldErrors.gender ? "#fff1f2" : "#fff",
        }}
      >
        <Picker
          selectedValue={petData.gender}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              gender: value,
            })
          }
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Unknown" value="unknown" />
        </Picker>
      </View>

      {/* AGE */}

      <FormLabel
        title="Age"
        required
        error={fieldErrors.age}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={[styles.input, fieldErrors.age && styles.inputError]}
        value={petData.age}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            age: text,
          })
        }
      />

      {/* DATE OF BIRTH */}

      <FormLabel
        title="Date Of Birth"
        required
        error={fieldErrors.date_of_birth}
      />

      <TouchableOpacity
        style={[styles.dateInput, fieldErrors.date_of_birth && styles.inputError]}
        onPress={() => setShowDobPicker(true)}
      >
        <Text style={styles.dateInputText}>
          {petData.date_of_birth || "Select Date Of Birth"}
        </Text>
        <Ionicons name="calendar-outline" size={18} color="#f97316" />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDobPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDobConfirm}
        onCancel={() => setShowDobPicker(false)}
      />

      {/* WEIGHT */}

      <FormLabel
        title="Weight (KG)"
        required
        error={fieldErrors.weight}
      />

      <TextInput
        placeholder="Weight"
        keyboardType="numeric"
        style={[styles.input, fieldErrors.weight && styles.inputError]}
        value={petData.weight}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            weight: text,
          })
        }
      />

      {/* COLOR MARKS */}

      <TextInput
        placeholder="Color Marks"
        style={styles.input}
        value={petData.color_marks}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            color_marks: text,
          })
        }
      />

      {/* MICROCHIP */}

      <TextInput
        placeholder="Microchip ID"
        style={styles.input}
        value={petData.microchip_id}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            microchip_id: text,
          })
        }
      />

      {/* REGISTRATION */}

      <TextInput
        placeholder="Registration Number"
        style={styles.input}
        value={petData.registration_number}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            registration_number: text,
          })
        }
      />

      {/* ADDITIONAL DETAILS */}

      <TextInput
        placeholder="Additional Details"
        style={[styles.input, { minHeight: 90, textAlignVertical: "top" }]}
        multiline
        value={petData.additional_details}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            additional_details: text,
          })
        }
      />

      {/* IMAGES */}

      <Text style={styles.fieldLabel}>Pet Images</Text>
      <Text style={styles.helperText}>You can add one or more photos for the pet profile.</Text>

      <TouchableOpacity
        onPress={pickImages}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          paddingVertical: 14,
          paddingHorizontal: 15,
          marginBottom: 12,
          backgroundColor: "#fafafa",
        }}
      >
        <Text
          style={{
            color: "#666",
            fontSize: 15,
          }}
        >
        Select Images
        </Text>
      </TouchableOpacity>

      {selectedImages?.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 15 }}
        >
          {selectedImages.map((img, index) => (
            <View key={index} style={styles.imageThumbWrapper}>
              <Image
                source={{
                  uri: img.uri || img.image_url || img.url || img.pet_image,
                }}
                style={styles.imageThumb}
              />

              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={styles.removeImageBtn}
              >
                <Text style={styles.removeImageText}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
