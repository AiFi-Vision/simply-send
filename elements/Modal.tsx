import React, { ReactNode } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

// Define the props type for the ModalScreen component
interface ModalScreenProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  type?: string;
  isCloseButton?: boolean;
}

const ModalScreen: React.FC<ModalScreenProps> = ({
  visible,
  setVisible,
  children,
  style,
  type = "bottom",
  isCloseButton,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={[styles.modalOverlay, style]}>
          <View
            style={[
              styles.modalContent,
              type === "bottom" && styles.modalContentToBottom,
            ]}
          >
            {isCloseButton && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
                <Ionicons name="close" size={20} color="#000" />
              </TouchableOpacity>
            )}
            <ScrollView
              style={[styles.modalBody, type === "bottom" && { width: "100%" }]}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
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
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    maxHeight: SCREEN_HEIGHT - 100,
  },
  modalContentToBottom: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    bottom: 0,
  },
  modalBody: {
    flex: 1,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
});

export default ModalScreen;
