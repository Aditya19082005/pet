import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import phaseOneFormStyles from "../styles/PhaseOneFormStyles";
import FormLabel from "./FormLabel";

export default function PhaseOneForm({
  petData,
  setPetData,
  fieldErrors = {},
  pickImages,
  selectedImages,
  removeImage,
  profileImageIndex,
  setProfileImageIndex,
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
const { width } = useWindowDimensions();

const columnWidth =
  width >= 1200
    ? "32%"
    : width >= 768
    ? "48%"
    : "100%";
  return (
    <View style={phaseOneFormStyles.screen}>
      <ScrollView
        contentContainerStyle={phaseOneFormStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={phaseOneFormStyles.formContainer}>
          {/* GRID: top fields */}
          <View style={phaseOneFormStyles.gridRow}>
            {/* PET NAME */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Pet Name"
                required
                error={fieldErrors.pet_name}
              />
              <TextInput
                placeholder="Pet Name"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.pet_name && phaseOneFormStyles.inputError,
                ]}
                value={petData.pet_name}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    pet_name: text,
                  })
                }
              />
            </View>

            {/* PET TYPE */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Pet Type"
                required
                error={fieldErrors.pet_type}
              />
              <View
                style={[
                  phaseOneFormStyles.pickerWrapper,
                  fieldErrors.pet_type && phaseOneFormStyles.inputError,
                ]}
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
            </View>

            {/* BREED */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Breed"
                required
                error={fieldErrors.breed}
              />
              <TextInput
                placeholder="Breed"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.breed && phaseOneFormStyles.inputError,
                ]}
                value={petData.breed}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    breed: text,
                  })
                }
              />
            </View>

            {/* GENDER */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Gender"
                required
                error={fieldErrors.gender}
              />
              <View
                style={[
                  phaseOneFormStyles.pickerWrapper,
                  fieldErrors.gender && phaseOneFormStyles.inputError,
                ]}
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
            </View>

            {/* AGE */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Age"
                required
                error={fieldErrors.age}
              />
              <TextInput
                placeholder="Age"
                keyboardType="numeric"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.age && phaseOneFormStyles.inputError,
                ]}
                value={petData.age}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    age: text,
                  })
                }
              />
            </View>

            {/* WEIGHT */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Weight (KG)"
                required
                error={fieldErrors.weight}
              />
              <TextInput
                placeholder="Weight"
                keyboardType="numeric"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.weight && phaseOneFormStyles.inputError,
                ]}
                value={petData.weight}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    weight: text,
                  })
                }
              />
            </View>
          </View>

          {/* DATE OF BIRTH (full width) */}
          <FormLabel
            title="Date Of Birth"
            required
            error={fieldErrors.date_of_birth}
          />

          {Platform.OS === "web" ? (
            <TextInput
              placeholder="YYYY-MM-DD"
              style={[
                phaseOneFormStyles.input,
                fieldErrors.date_of_birth &&
                  phaseOneFormStyles.inputError,
              ]}
              value={petData.date_of_birth}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  date_of_birth: text,
                })
              }
            />
          ) : (
            <>
              <TouchableOpacity
                style={[
                  phaseOneFormStyles.dateInput,
                phaseOneFormStyles.inputError,
                ]}
                onPress={() => setShowDobPicker(true)}
              >
                <Text style={phaseOneFormStyles.dateInputText}>
                  {petData.date_of_birth || "Select Date Of Birth"}
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#6b21a8"
                />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={showDobPicker}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleDobConfirm}
                onCancel={() => setShowDobPicker(false)}
              />
            </>
          )}

          {/* GRID: fields below DOB */}
          <View style={phaseOneFormStyles.gridRow}>
            {/* COLOR MARKS */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Color Marks"
                error={fieldErrors.color_marks}
              />
              <TextInput
                placeholder="Color Marks"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.color_marks &&
                    phaseOneFormStyles.inputError,
                ]}
                value={petData.color_marks}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    color_marks: text,
                  })
                }
              />
            </View>

            {/* MICROCHIP ID */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Microchip ID"
                error={fieldErrors.microchip_id}
              />
              <TextInput
                placeholder="Microchip ID"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.microchip_id &&
                    phaseOneFormStyles.inputError,
                ]}
                value={petData.microchip_id}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    microchip_id: text,
                  })
                }
              />
            </View>

            {/* REGISTRATION NUMBER */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Registration Number"
                error={fieldErrors.registration_number}
              />
              <TextInput
                placeholder="Registration Number"
                style={[
                  phaseOneFormStyles.input,
                  fieldErrors.registration_number &&
                    phaseOneFormStyles.inputError,
                ]}
                value={petData.registration_number}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    registration_number: text,
                  })
                }
              />
            </View>

            {/* ADDITIONAL DETAILS */}
            <View
  style={[
    phaseOneFormStyles.gridItem,
    { width: columnWidth },
  ]}
>
              <FormLabel
                title="Additional Details"
                error={fieldErrors.additional_details}
              />
              <TextInput
                placeholder="Additional Details"
                style={[
                  phaseOneFormStyles.input,
                  phaseOneFormStyles.textArea,
                  fieldErrors.additional_details &&
                    phaseOneFormStyles.inputError,
                ]}
                multiline
                value={petData.additional_details}
                onChangeText={(text) =>
                  setPetData({
                    ...petData,
                    additional_details: text,
                  })
                }
              />
            </View>
          </View>

          {/* IMAGES (full width) */}
          <FormLabel
            title="Pet Images"
            error={fieldErrors.images}
          />
          <Text style={phaseOneFormStyles.helperText}>
            You can add one or more photos for the pet profile.
          </Text>

          <TouchableOpacity
            onPress={pickImages}
            style={phaseOneFormStyles.imageSelectButton}
          >
            <Text style={phaseOneFormStyles.imageSelectButtonText}>
              Select Images
            </Text>
          </TouchableOpacity>

          {selectedImages?.length > 0 && (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={phaseOneFormStyles.imagePreviewContainer}
              >
                {selectedImages.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      phaseOneFormStyles.imageThumbWrapper,
                      profileImageIndex === index &&
                        phaseOneFormStyles.selectedThumbWrapper,
                    ]}
                    onPress={() => setProfileImageIndex(index)}
                  >
                    <Image
                      source={{
                        uri:
                          img.uri ||
                          img.image_url ||
                          img.url ||
                          img.pet_image,
                      }}
                      style={phaseOneFormStyles.imageThumb}
                    />

                    <View
                      style={[
                        phaseOneFormStyles.profileBadge,
                        profileImageIndex === index
                          ? phaseOneFormStyles.profileBadgeActive
                          : phaseOneFormStyles.profileBadgeInactive,
                      ]}
                    >
                      <Text style={phaseOneFormStyles.profileBadgeText}>
                        {profileImageIndex === index
                          ? "Profile"
                          : "Set Profile"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      style={phaseOneFormStyles.removeImageBtn}
                    >
                      <Text style={phaseOneFormStyles.removeImageText}>
                        ✕
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {profileImageIndex === null && (
                <Text style={phaseOneFormStyles.helperText}>
                  Tap a photo to choose the pet profile image.
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}