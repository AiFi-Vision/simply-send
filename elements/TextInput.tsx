import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";

const weightToFont: { [key: string]: string } = {
  "100": "Outfit-Thin",
  "200": "Outfit-ExtraLight",
  "300": "Outfit-Light",
  "400": "Outfit-Regular",
  "500": "Outfit-Medium",
  "600": "Outfit-SemiBold",
  "700": "Outfit-Bold",
  "800": "Outfit-ExtraBold",
  "900": "Outfit-Black",
};

interface CustomTextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  style,
  ...props
}) => {
  const flattened = StyleSheet.flatten(style) || {};
  const fontWeight = String(flattened.fontWeight || "400");
  const fontFamily = weightToFont[fontWeight] || "Outfit-Regular";

  return (
    <TextInput
      {...props}
      style={[style, { fontFamily }]}
      placeholderTextColor={"#999"} // optional styling
      // placeholderTextColor={flattened.color || "#999"} // optional styling
    />
  );
};

export default CustomTextInput;
