import React from "react";
import {
  View,
  TextInput,
  Switch,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import phaseThreeFormStyles from "../styles/PhaseThreeFormStyles";
import FormLabel from "./FormLabel";

export default function PhaseThreeForm({
  petData,
  setPetData,
  fieldErrors = {},
}) {
  // Responsive column width (same breakpoints as Phase One & Two)
  const { width } = useWindowDimensions();
  const columnWidth =
    width >= 1200
      ? "32%"
      : width >= 768
      ? "48%"
      : "100%";

  return (
    <View style={phaseThreeFormStyles.screen}>
      <ScrollView
        contentContainerStyle={phaseThreeFormStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* GRID: vet info */}
        <View style={phaseThreeFormStyles.gridRow}>
          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Vet Name"
              style={phaseThreeFormStyles.input}
              value={petData.vet_name}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  vet_name: text,
                })
              }
            />
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Vet Clinic Name"
              style={phaseThreeFormStyles.input}
              value={petData.vet_clinic_name}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  vet_clinic_name: text,
                })
              }
            />
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Vet Contact"
              keyboardType="phone-pad"
              style={phaseThreeFormStyles.input}
              value={petData.vet_contact}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  vet_contact: text,
                })
              }
            />
          </View>
        </View>

        {/* Special care (full-width) */}
        <TextInput
          placeholder="Special Care Required"
          style={[
            phaseThreeFormStyles.input,
            phaseThreeFormStyles.textArea,
          ]}
          multiline
          value={petData.special_care_required}
          onChangeText={(text) =>
            setPetData({
              ...petData,
              special_care_required: text,
            })
          }
        />

        {/* GRID: habits & behavior text fields */}
        <View style={phaseThreeFormStyles.gridRow}>
          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Eating Habit"
              style={phaseThreeFormStyles.input}
              value={petData.eating_habit}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  eating_habit: text,
                })
              }
            />
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Water Intake Habit"
              style={phaseThreeFormStyles.input}
              value={petData.water_intake_habit}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  water_intake_habit: text,
                })
              }
            />
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Anxiety Issues"
              style={phaseThreeFormStyles.input}
              value={petData.anxiety_issues}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  anxiety_issues: text,
                })
              }
            />
          </View>
        </View>

        <View style={phaseThreeFormStyles.gridRow}>
          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Biting History"
              style={phaseThreeFormStyles.input}
              value={petData.biting_history}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  biting_history: text,
                })
              }
            />
          </View>
        </View>

        {/* FOOD TYPE (full-width picker + details) */}
        <FormLabel title="Food Type" required error={fieldErrors.food_type} />

        <View
          style={[
            phaseThreeFormStyles.pickerWrapper,
            fieldErrors.food_type && phaseThreeFormStyles.inputError,
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

        <View style={phaseThreeFormStyles.gridRow}>
          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Food Brand"
              style={[
                phaseThreeFormStyles.input,
                phaseThreeFormStyles.textArea,
              ]}
              value={petData.food_brand}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  food_brand: text,
                })
              }
            />
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Feeding Schedule"
              style={[
                phaseThreeFormStyles.input,
                phaseThreeFormStyles.textArea,
              ]}
              value={petData.feeding_schedule}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  feeding_schedule: text,
                })
              }
            />
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <TextInput
              placeholder="Quantity Per Meal"
              style={[
                phaseThreeFormStyles.input,
                phaseThreeFormStyles.textArea,
              ]}
              value={petData.quantity_per_meal}
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  quantity_per_meal: text,
                })
              }
            />
          </View>
        </View>

        {/* GRID: switches */}
        <View style={phaseThreeFormStyles.gridRow}>
          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <View style={phaseThreeFormStyles.switchContainer}>
              <Text style={phaseThreeFormStyles.switchLabel}>
                Friendly With Humans
              </Text>
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
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <View style={phaseThreeFormStyles.switchContainer}>
              <Text style={phaseThreeFormStyles.switchLabel}>
                Friendly With Dogs
              </Text>
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
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <View style={phaseThreeFormStyles.switchContainer}>
              <Text style={phaseThreeFormStyles.switchLabel}>
                Aggressive Behavior
              </Text>
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
          </View>
        </View>

        <View style={phaseThreeFormStyles.gridRow}>
          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <View style={phaseThreeFormStyles.switchContainer}>
              <Text style={phaseThreeFormStyles.switchLabel}>
                Treats Allowed
              </Text>
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
          </View>

          <View
            style={[
              phaseThreeFormStyles.gridItem,
              { width: columnWidth },
            ]}
          >
            <View style={phaseThreeFormStyles.switchContainer}>
              <Text style={phaseThreeFormStyles.switchLabel}>
                Food Allergies
              </Text>
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
          </View>
        </View>

        {petData.food_allergies && (
          <TextInput
            placeholder="Food Allergy Details"
            style={phaseThreeFormStyles.input}
            value={petData.food_allergy_details}
            onChangeText={(text) =>
              setPetData({
                ...petData,
                food_allergy_details: text,
              })
            }
          />
        )}
      </ScrollView>
    </View>
  );
}