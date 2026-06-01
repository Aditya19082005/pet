import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { Picker } from "@react-native-picker/picker";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PhaseOneForm({
  petData,
  setPetData,
  styles,
  pickImages,
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

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Pet Name <Text style={{ color: "red" }}>*</Text>
      </Text>

      <TextInput
        placeholder="Pet Name"
        style={styles.input}
        value={petData.pet_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            pet_name: text,
          })
        }
      />

      {/* PET TYPE */}

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Pet Type <Text style={{ color: "red" }}>*</Text>
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          marginBottom: 12,
          overflow: "hidden",
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

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Breed <Text style={{ color: "red" }}>*</Text>
      </Text>

      <TextInput
        placeholder="Breed"
        style={styles.input}
        value={petData.breed}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            breed: text,
          })
        }
      />

      {/* GENDER */}

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Gender <Text style={{ color: "red" }}>*</Text>
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          marginBottom: 12,
          overflow: "hidden",
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

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Age <Text style={{ color: "red" }}>*</Text>
      </Text>

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
        value={petData.age}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            age: text,
          })
        }
      />

      {/* DATE OF BIRTH */}

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Date Of Birth <Text style={{ color: "red" }}>*</Text>
      </Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDobPicker(true)}
      >
        <Text
          style={{
            color: petData.date_of_birth ? "#000" : "#999",
          }}
        >
          {petData.date_of_birth || "Select Date Of Birth"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDobPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDobConfirm}
        onCancel={() => setShowDobPicker(false)}
      />

      {/* WEIGHT */}

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Weight (KG) <Text style={{ color: "red" }}>*</Text>
      </Text>

      <TextInput
        placeholder="Weight"
        keyboardType="numeric"
        style={styles.input}
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
        style={styles.input}
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

      <TouchableOpacity style={styles.imageBtn} onPress={pickImages}>
        <Text style={styles.imageBtnText}>Pick Images</Text>
      </TouchableOpacity>
    </View>
  );
}
