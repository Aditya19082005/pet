import React from "react";

import { View, TextInput, TouchableOpacity, Text } from "react-native";

export default function PhaseOneForm({
  petData,
  setPetData,
  styles,
  pickImages,
}) {
  return (
    <View>
      <TextInput
        placeholder="Pet Name"
        style={styles.input}
        value={petData.pet_name}
        onChangeText={(text) => setPetData({ ...petData, pet_name: text })}
      />

      <TextInput
        placeholder="Pet Type"
        style={styles.input}
        value={petData.pet_type}
        onChangeText={(text) => setPetData({ ...petData, pet_type: text })}
      />

      <TextInput
        placeholder="Breed"
        style={styles.input}
        value={petData.breed}
        onChangeText={(text) => setPetData({ ...petData, breed: text })}
      />

      <TextInput
        placeholder="Gender"
        style={styles.input}
        value={petData.gender}
        onChangeText={(text) => setPetData({ ...petData, gender: text })}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
        value={petData.age}
        onChangeText={(text) => setPetData({ ...petData, age: text })}
      />

      <TextInput
        placeholder="Date Of Birth"
        style={styles.input}
        value={petData.date_of_birth}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            date_of_birth: text,
          })
        }
      />

      <TextInput
        placeholder="Weight"
        keyboardType="numeric"
        style={styles.input}
        value={petData.weight}
        onChangeText={(text) => setPetData({ ...petData, weight: text })}
      />

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

      <TextInput
        placeholder="Additional Details"
        style={styles.input}
        value={petData.additional_details}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            additional_details: text,
          })
        }
      />

      <TouchableOpacity style={styles.imageBtn} onPress={pickImages}>
        <Text style={styles.imageBtnText}>Pick Images</Text>
      </TouchableOpacity>
    </View>
  );
}
