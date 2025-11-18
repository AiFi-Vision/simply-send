import { StyleSheet } from "react-native";
import { COLORS } from "./colors"; // Import your variables

const globalStyles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "600", // or 'bold'
    color: COLORS.primary,
  },
  h2: {
    fontSize: 20,
    fontWeight: "500", // or 'medium'
    color: COLORS.primary,
  },
  h3: {
    fontSize: 16,
    fontWeight: "500", // or 'medium'
    color: COLORS.primary,
  },
  h4: {
    fontSize: 14,
    fontWeight: "400", // or 'normal'
    color: COLORS.textColor,
  },
  h5: {
    fontSize: 12,
    fontWeight: "400", // or 'small'
    color: COLORS.textColor,
  },
});

export default globalStyles;
