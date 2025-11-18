import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  useRoute,
  useNavigation,
  StackActions,
} from "@react-navigation/native";
import Text from "@/elements/Text";
import KeyPad from "@/components/KeyPad";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import ContainerView from "@/components/ContainerView";

const SetUpNewPinScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();

  const result = router.params?.result || "";
  const [pinCode, setPinCode] = useState("");

  const colors = [
    COLORS.primary,
    COLORS.secondary,
    COLORS.yellow,
    COLORS.textColor,
  ];

  useEffect(() => {
    if (result === "RIGHT") navigation.dispatch(StackActions.popToTop());
  }, [result]);

  useEffect(() => {
    if (pinCode.length >= 4) navigation.push("confirm-pin", { code: pinCode });
  }, [pinCode]);

  const handleNumberPress = (num) => {
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
    <ContainerView
      prev="Set up a new PIN"
      title="Setup new PIN"
      footer={
        <KeyPad
          handleNumberPress={handleNumberPress}
          handleDelete={handleDelete}
          style={styles.keypad}
        />
      }
    >
      {result === "WRONG" ? (
        <Text style={[globalStyles.h4, styles.subtitle, { color: "red" }]}>
          Passcodes do not match, Please try again
        </Text>
      ) : (
        <Text style={[globalStyles.h4, styles.subtitle]}>
          Protect your account with transaction PIN. Add an extra layer of
          security to your account.
        </Text>
      )}

      {/* Input Field */}
      <View style={styles.pinCode}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.pinCodeItem}>
            {pinCode.slice(i, i + 1) ? (
              <Text
                style={[styles.pinCodeItemText, { backgroundColor: colors[i] }]}
              ></Text>
            ) : (
              <Text style={styles.pinCodeItemEmpty}>{"-"}</Text>
            )}
          </View>
        ))}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginVertical: 15,
    lineHeight: 22,
  },
  keypad: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 60,
  },
  pinCode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 40,
  },
  pinCodeItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 25,
    width: "20%",
  },
  pinCodeItemEmpty: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
  },
  pinCodeItemText: {
    borderRadius: 100,
    height: 15,
    width: 15,
  },
});

export default SetUpNewPinScreen;
