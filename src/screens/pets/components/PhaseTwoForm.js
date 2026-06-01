import React, { useState } from "react";

import { View, TextInput, Switch, Text, TouchableOpacity } from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PhaseTwoForm({ petData, setPetData, styles }) {
  const [showDewormingPicker, setShowDewormingPicker] = useState(false);

  const [showFleaTickPicker, setShowFleaTickPicker] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <View>
      <TextInput
        placeholder="Mother Name"
        style={styles.input}
        value={petData.mother_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            mother_name: text,
          })
        }
      />

      <TextInput
        placeholder="Father Name"
        style={styles.input}
        value={petData.father_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            father_name: text,
          })
        }
      />

      <TextInput
        placeholder="Breeding Line"
        style={styles.input}
        value={petData.breeding_line}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            breeding_line: text,
          })
        }
      />

      <TextInput
        placeholder="Vaccination Status"
        style={styles.input}
        value={petData.vaccination_status}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_status: text,
          })
        }
      />

      <TextInput
        placeholder="Vaccination Details"
        multiline
        style={styles.input}
        value={petData.vaccination_details}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_details: text,
          })
        }
      />

      <TextInput
        placeholder="Vaccination Notes"
        multiline
        style={styles.input}
        value={petData.vaccination_notes}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_notes: text,
          })
        }
      />

      {/* DEWORMING DATE */}

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Deworming Date
      </Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDewormingPicker(true)}
      >
        <Text
          style={{
            color: petData.deworming_date ? "#000" : "#999",
          }}
        >
          {petData.deworming_date || "Select Deworming Date"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDewormingPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setPetData({
            ...petData,
            deworming_date: formatDate(date),
          });

          setShowDewormingPicker(false);
        }}
        onCancel={() => setShowDewormingPicker(false)}
      />

      {/* FLEA TICK DATE */}

      <Text
        style={{
          marginBottom: 5,
          fontWeight: "600",
        }}
      >
        Flea Tick Treatment Date
      </Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowFleaTickPicker(true)}
      >
        <Text
          style={{
            color: petData.flea_tick_treatment_date ? "#000" : "#999",
          }}
        >
          {petData.flea_tick_treatment_date ||
            "Select Flea Tick Treatment Date"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showFleaTickPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setPetData({
            ...petData,
            flea_tick_treatment_date: formatDate(date),
          });

          setShowFleaTickPicker(false);
        }}
        onCancel={() => setShowFleaTickPicker(false)}
      />

      <TextInput
        placeholder="Medical History"
        multiline
        style={styles.input}
        value={petData.medical_history}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            medical_history: text,
          })
        }
      />

      <TextInput
        placeholder="Allergies"
        style={styles.input}
        value={petData.allergies}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            allergies: text,
          })
        }
      />

      <TextInput
        placeholder="Medical Conditions"
        multiline
        style={styles.input}
        value={petData.medical_conditions}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            medical_conditions: text,
          })
        }
      />

      <TextInput
        placeholder="Current Medication"
        style={styles.input}
        value={petData.current_medication}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            current_medication: text,
          })
        }
      />

      <TextInput
        placeholder="Surgery History"
        multiline
        style={styles.input}
        value={petData.surgery_history}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            surgery_history: text,
          })
        }
      />

      <View style={{ marginBottom: 15 }}>
        <Text
          style={{
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Neutered / Spayed
        </Text>

        <Switch
          value={petData.neutered_spayed}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              neutered_spayed: value,
            })
          }
        />
      </View>
    </View>
  );
}
