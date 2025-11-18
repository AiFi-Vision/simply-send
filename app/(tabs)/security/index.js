import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Switch, Modal, Button } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const SecurityScreen = () => {
  const navigation = useNavigation();
  const [switchAutoLock, setSwitchAutoLock] = useState(true);
  const [switchFaceID, setSwitchFaceID] = useState(false);
  const [switchTouchID, setSwitchTouchID] = useState(false);
  const [showFaceIDModal, setShowFaceIDModal] = useState(false);
  const [showTouchIDModal, setShowTouchIDModal] = useState(false);

  useEffect(() => {
    switchFaceID && setShowFaceIDModal(true);
  }, [switchFaceID]);

  useEffect(() => {
    switchTouchID && setShowTouchIDModal(true);
  }, [switchTouchID]);

  return (
    <ContainerView prev="Privacy & Security" title="Privacy & Security">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.push("change-password")}
        >
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/auth/change-password.png")}
              style={{ width: 36, height: 36, marginRight: 16 }}
            />
            <Text style={styles.text}>Change Password</Text>
          </View>
          <ChevronRight size={18} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.push("transaction-pin")}
        >
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/auth/transaction-pin.png")}
              style={{ width: 36, height: 36, marginRight: 16 }}
            />
            <Text style={styles.text}>Transaction PIN</Text>
          </View>
          <ChevronRight size={18} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/auth/use-face.png")}
              style={{ width: 36, height: 36, marginRight: 16 }}
            />
            <Text style={styles.text}>Use Face ID to log in</Text>
          </View>
          <Switch
            value={switchFaceID}
            onChange={setSwitchFaceID}
            width={45}
            height={25}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/auth/fingerprint-green.png")}
              style={{ width: 36, height: 36, marginRight: 16 }}
            />
            <Text style={styles.text}>Use Touch ID to log in</Text>
          </View>
          <Switch
            value={switchTouchID}
            onChange={setSwitchTouchID}
            width={45}
            height={25}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/auth/auto-lock.png")}
              style={{ width: 36, height: 36, marginRight: 16 }}
            />
            <Text style={styles.text}>Auto Lock Security</Text>
          </View>
          <Switch
            value={switchAutoLock}
            onChange={setSwitchAutoLock}
            width={45}
            height={25}
          />
        </View>
        <Text style={[globalStyles.h4, { marginHorizontal: 40, opacity: 0.5 }]}>
          Require Face ID after 10 minutes of inactivity
        </Text>
      </View>
      <Modal
        visible={showFaceIDModal}
        setVisible={() => {
          setShowFaceIDModal(false);
          setSwitchFaceID(false);
        }}
        type="center"
      >
        <View style={styles.modal}>
          <Image source={require("@/assets/images/auth/Face ID-black.png")} />
          <Text style={styles.modalTitle}>Sign in with Face ID</Text>
          <Text style={styles.modalContent}>
            Protect your account with Face ID. Add an extra layer of security to
            your account.
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Button
              title="No,Cancel"
              style={styles.modalButton}
              handle={() => {
                setShowFaceIDModal(false);
                setSwitchFaceID(false);
              }}
              type="outline"
            />
            <Button
              title="Use Face ID"
              style={styles.modalButton}
              handle={() => {
                setShowFaceIDModal(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showTouchIDModal}
        setVisible={() => {
          setShowTouchIDModal(false);
          setSwitchTouchID(false);
        }}
        type="center"
      >
        <View style={styles.modal}>
          <Image
            source={require("@/assets/images/auth/fingerprint-black.png")}
          />
          <Text style={styles.modalTitle}>Sign in with Touch ID</Text>
          <Text style={styles.modalContent}>
            Protect your account with Fingerprint. Add an extra layer of
            security to your account.
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Button
              title="No,Cancel"
              style={styles.modalButton}
              handle={() => {
                setShowTouchIDModal(false);
                setSwitchTouchID(false);
              }}
              type="outline"
            />
            <Button
              title="Use Touch ID"
              style={styles.modalButton}
              handle={() => {
                setShowTouchIDModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    marginVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
  },
  modal: {
    alignItems: "center",
    marginVertical: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.primary,
    lineHeight: 24,
    marginTop: 32,
  },
  modalContent: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.textColor,
    lineHeight: 24,
  },
  modalButton: {
    width: "45%",
    paddingVertical: 12,
  },
});

export default SecurityScreen;
