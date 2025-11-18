import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Text from "@/elements/Text";
import KeyPad from "@/components/KeyPad";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const SignUpConfirmPinScreen = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { code } = router.params;

  const [pinCode, setPinCode] = useState("");

  const colors = [
    COLORS.primary,
    COLORS.secondary,
    COLORS.yellow,
    COLORS.textColor,
  ];

  useEffect(() => {
    if (pinCode.length >= 4) {
      navigation.push("setup-pin", {
        result: code === pinCode ? "RIGHT" : "WRONG",
      });
    }
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
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Set up a PIN</Text>
        {/* <Text>Cancel</Text> */}
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={globalStyles.h1}>Confirm your PIN</Text>
        <Text style={[globalStyles.h4, styles.subtitle]}>
          Just to be safe, type that PIN one more time
        </Text>

        {/* Input Field */}
        <View style={styles.pinCode}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.pinCodeItem}>
              {pinCode.slice(i, i + 1) ? (
                <Text
                  style={[
                    styles.pinCodeItemText,
                    { backgroundColor: colors[i] },
                  ]}
                ></Text>
              ) : (
                <Text style={styles.pinCodeItemEmpty}>{"-"}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
      <KeyPad
        handleNumberPress={handleNumberPress}
        handleDelete={handleDelete}
        style={styles.keypad}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 500,
    color: "#111",
  },
  body: {
    marginTop: 40,
  },
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

export default SignUpConfirmPinScreen;
