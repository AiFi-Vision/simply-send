import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  size?: number;
  color?: string; // Checkmark & selected fill color
  borderColorSelected?: string;
  borderColorUnselected?: string;
  style?: ViewStyle;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  size = 24,
  color = COLORS.secondary,
  borderColorSelected = COLORS.secondary,
  borderColorUnselected = COLORS.primary,
  style,
}) => {
  const outerBorderColor = selected
    ? borderColorSelected
    : borderColorUnselected;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.radioCircle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: outerBorderColor,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {selected && (
        <Ionicons
          name="checkmark"
          size={size * 0.6}
          color="white"
          style={{
            backgroundColor: color,
            borderRadius: size / 2,
            padding: size * 0.1,
            borderWidth: 1,
            borderColor: borderColorSelected,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioCircle: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RadioButton;
