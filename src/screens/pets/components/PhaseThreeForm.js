import React from "react";

import { View, TextInput, Switch, Text } from "react-native";

export default function PhaseThreeForm({ petData, setPetData, styles }) {
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
        style={styles.input}
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

      <TextInput
        placeholder="Food Type"
        style={styles.input}
        value={petData.food_type}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            food_type: text,
          })
        }
      />

      <TextInput
        placeholder="Food Brand"
        style={styles.input}
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
        style={styles.input}
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
        style={styles.input}
        value={petData.quantity_per_meal}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            quantity_per_meal: text,
          })
        }
      />

      <View style={{ marginBottom: 15 }}>
        <Text>Friendly With Humans</Text>

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

      <View style={{ marginBottom: 15 }}>
        <Text>Friendly With Dogs</Text>

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

      <View style={{ marginBottom: 15 }}>
        <Text>Aggressive Behavior</Text>

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

      <View style={{ marginBottom: 15 }}>
        <Text>Treats Allowed</Text>

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

      <View style={{ marginBottom: 15 }}>
        <Text>Food Allergies</Text>

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
    </View>
  );
}
