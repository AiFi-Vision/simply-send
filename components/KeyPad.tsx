import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Delete } from "lucide-react-native";
import Text from "@/elements/Text";

// Define types for the props
interface KeyPadProps {
  handleNumberPress: (num: string) => void; // Function to handle number press, receives a string
  handleDelete: () => void; // Function to handle delete
  style?: StyleProp<ViewStyle>;
}

const KeyPad: React.FC<KeyPadProps> = ({
  handleNumberPress,
  handleDelete,
  style,
}) => {
  return (
    <View style={[style, styles.KeyPadContainer]}>
      {[...Array(9)].map((_, i) => (
        <TouchableOpacity
          key={i + 1}
          style={styles.KeyPadButton}
          onPress={() => handleNumberPress((i + 1).toString())}
        >
          <Text style={styles.KeyPadButtonText}>{i + 1}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.KeyPadButton} disabled>
        <Text style={styles.KeyPadButtonText}> </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.KeyPadButton}
        onPress={() => handleNumberPress("0")}
      >
        <Text style={styles.KeyPadButtonText}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.KeyPadButton} onPress={handleDelete}>
        <Delete size={24} color="#1F2937" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  KeyPadContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 20,
    gap: 24,
  },
  KeyPadButton: {
    width: "25%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },
  KeyPadButtonText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#1F2937",
    opacity: 0.6,
  },
});

export default KeyPad;
