import React from "react";
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
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

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  children,
  ...props
}) => {
  const flattened = StyleSheet.flatten(style) || {};
  const fontWeight = String(flattened.fontWeight || "400");
  const fontFamily = weightToFont[fontWeight] || "Outfit-Regular";

  return (
    <Text {...props} style={[style, { fontFamily }]}>
      {children}
    </Text>
  );
};

export default CustomText;
