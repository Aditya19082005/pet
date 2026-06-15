import React from "react";

import { View, TextInput, Switch, Text } from "react-native";

import { Picker } from "@react-native-picker/picker";

import FormLabel from "./FormLabel";

export default function PhaseThreeForm({
  petData,
  setPetData,
  styles,
  fieldErrors = {},
}) {
  return (
    <View>
      <TextInput
        placeholder="Vet Name"
        style={styles.input}
        value={petData.vet_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vet_name: text,
          })
        }
      />

      <TextInput
        placeholder="Vet Clinic Name"
        style={styles.input}
        value={petData.vet_clinic_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vet_clinic_name: text,
          })
        }
      />

      <TextInput
        placeholder="Vet Contact"
        keyboardType="phone-pad"
        style={styles.input}
        value={petData.vet_contact}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vet_contact: text,
          })
        }
      />

      <TextInput
        placeholder="Special Care Required"
        style={[styles.input, styles.textArea]}
        multiline
        value={petData.special_care_required}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            special_care_required: text,
          })
        }
      />

      <TextInput
        placeholder="Eating Habit"
        style={styles.input}
        value={petData.eating_habit}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            eating_habit: text,
          })
        }
      />

      <TextInput
        placeholder="Water Intake Habit"
        style={styles.input}
        value={petData.water_intake_habit}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            water_intake_habit: text,
          })
        }
      />

      <TextInput
        placeholder="Anxiety Issues"
        style={styles.input}
        value={petData.anxiety_issues}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            anxiety_issues: text,
          })
        }
      />

      <TextInput
        placeholder="Biting History"
        style={styles.input}
        value={petData.biting_history}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            biting_history: text,
          })
        }
      />

      {/* FOOD TYPE */}

      <FormLabel title="Food Type" required error={fieldErrors.food_type} />

      <View
        style={[
          styles.pickerWrapper,
          fieldErrors.food_type && styles.inputError,
        ]}
      >
        <Picker
          selectedValue={petData.food_type}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              food_type: value,
            })
          }
        >
          <Picker.Item label="Select Food Type" value="" />

          <Picker.Item label="Veg" value="veg" />

          <Picker.Item label="Non Veg" value="non_veg" />

          <Picker.Item label="Both" value="both" />
        </Picker>
      </View>

      <TextInput
        placeholder="Food Brand"
        style={[styles.input, styles.textArea]}
        value={petData.food_brand}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            food_brand: text,
          })
        }
      />

      <TextInput
        placeholder="Feeding Schedule"
        style={[styles.input, styles.textArea]}
        value={petData.feeding_schedule}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            feeding_schedule: text,
          })
        }
      />

      <TextInput
        placeholder="Quantity Per Meal"
        style={[styles.input, styles.textArea]}
        value={petData.quantity_per_meal}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            quantity_per_meal: text,
          })
        }
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Friendly With Humans</Text>

        <Switch
          value={petData.friendly_with_humans}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              friendly_with_humans: value,
            })
          }
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Friendly With Dogs</Text>

        <Switch
          value={petData.friendly_with_dogs}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              friendly_with_dogs: value,
            })
          }
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Aggressive Behavior</Text>

        <Switch
          value={petData.aggressive_behavior}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              aggressive_behavior: value,
            })
          }
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Treats Allowed</Text>

        <Switch
          value={petData.treats_allowed}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              treats_allowed: value,
            })
          }
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Food Allergies</Text>

        <Switch
          value={petData.food_allergies}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              food_allergies: value,
            })
          }
        />
      </View>

      {petData.food_allergies && (
        <TextInput
          placeholder="Food Allergy Details"
          style={styles.input}
          value={petData.food_allergy_details}
          onChangeText={(text) =>
            setPetData({
              ...petData,
              food_allergy_details: text,
            })
          }
        />
      )}
    </View>
  );
}

