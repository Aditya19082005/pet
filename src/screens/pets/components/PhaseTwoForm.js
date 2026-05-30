import React from "react";

import { View, TextInput, Switch, Text } from "react-native";

export default function PhaseTwoForm({ petData, setPetData, styles }) {
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
        style={styles.input}
        value={petData.vaccination_notes}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_notes: text,
          })
        }
      />

      <TextInput
        placeholder="Deworming Date"
        style={styles.input}
        value={petData.deworming_date}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            deworming_date: text,
          })
        }
      />

      <TextInput
        placeholder="Flea Tick Treatment Date"
        style={styles.input}
        value={petData.flea_tick_treatment_date}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            flea_tick_treatment_date: text,
          })
        }
      />

      <TextInput
        placeholder="Medical History"
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
        <Text>Neutered / Spayed</Text>

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
