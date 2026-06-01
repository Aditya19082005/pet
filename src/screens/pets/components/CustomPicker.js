import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CustomPicker({
  selectedValue,
  onValueChange,
  items,
  style,
}) {
  return (
    <View
      style={[
        style,
        {
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          marginBottom: 12,
        },
      ]}
    >
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        <Picker.Item label="Select" value="" />

        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}
