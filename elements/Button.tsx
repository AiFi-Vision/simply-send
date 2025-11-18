import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { COLORS } from "@/styles/colors";
import Text from "./Text";

interface ButtonProps {
  handle: () => void;
  title: string;
  type: string;
  disable: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  handle,
  title,
  type = "fullfill",
  disable = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={handle}
      style={[
        type === "fullfill" ? styles.buttonFullFill : styles.buttonOutline,
        style,
        disable && styles.disabled,
      ]}
      disabled={disable}
    >
      <Text
        style={type === "fullfill" ? styles.textFullFill : styles.textOutline}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonFullFill: {
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    // borderColor: COLORS.secondary,
    // borderWidth: 1,
  },
  textFullFill: {
    color: COLORS.white,
    fontWeight: 600,
    fontSize: 18,
  },

  buttonOutline: {
    backgroundColor: COLORS.white,
    paddingVertical: 24,
    borderRadius: 16,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    alignItems: "center",
  },
  textOutline: {
    color: COLORS.secondary,
    fontWeight: 600,
    fontSize: 18,
  },

  disabled: {
    opacity: 0.5,
  },
});

export default Button;
