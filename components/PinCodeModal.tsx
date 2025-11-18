import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "@/elements/Text";
import KeyPad from "./KeyPad";
import { COLORS } from "@/styles/colors";

interface PinCodeModalProps {
  pinCode: string;
  setPinCode: (pin: string) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  nextRouter: string;
}

const PinCodeModal: React.FC<PinCodeModalProps> = ({
  pinCode,
  setPinCode,
  isVisible,
  setIsVisible,
  nextRouter,
}) => {
  const navigation = useNavigation();

  const handleNumberPress = (num: string) => {
    if (!pinCode) {
      setPinCode(num);
    } else if (pinCode.length < 4) {
      setPinCode((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    if (pinCode.length > 1) {
      setPinCode((prev) => prev.slice(0, -1));
    } else {
      setPinCode("");
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Enter Pin</Text>
              <Text style={styles.modalSubTitle}>
                Please input your pin to securely transfer money to Lekan Busayo
              </Text>

              {/* Input Field */}
              <View style={styles.modalPinCode}>
                {[...Array(4)].map((_, i) => (
                  <View key={i} style={styles.pinCodeItem}>
                    <Text style={styles.pinCodeItemText}>
                      {pinCode.slice(i, i + 1) ? "*" : "-"}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Button */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsVisible(false);
                  navigation.push(nextRouter);
                }}
              >
                <Image source={require("@/assets/images/home/next.png")} />
                <Text style={styles.modalButtonText}>Swipe to continue</Text>
              </TouchableOpacity>
            </View>
            <KeyPad
              handleNumberPress={handleNumberPress}
              handleDelete={handleDelete}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay with opacity
  },
  modalContent: {
    position: "absolute",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    width: "100%",
    bottom: 0,
  },
  modalBody: {
    marginTop: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: COLORS.primary,
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.textColor,
    marginVertical: 15,
    lineHeight: 22,
  },
  modalPinCode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 24,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  modalButtonText: {
    marginLeft: 30,
    color: "#fff",
    fontWeight: 600,
    fontSize: 20,
  },
  pinCodeItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#59b77f",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 25,
    width: "20%",
  },
  pinCodeItemText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
  },
});

export default PinCodeModal;
