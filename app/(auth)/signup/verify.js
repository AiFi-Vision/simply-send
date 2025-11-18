import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import KeyPad from "@/components/KeyPad";
import { Button, Text } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

const VerifyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { inputData } = route.params;
  const [pinCode, setPinCode] = useState("");

  const handleVerify = () => {
    // Send OTP logic here
    navigation.push("name");
    console.log("Sending OTP to:", inputData);
  };

  const handleNumberPress = (num) => {
    if (!pinCode) {
      setPinCode(num);
    } else if (pinCode.length < 6) {
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
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={globalStyles.h1}>Enter verification code</Text>
        <Text style={[globalStyles.h4, styles.subtitle]}>
          Please enter the verification code send to you.
          <Text style={styles.subEmail}>{`\n${inputData}`}</Text>
        </Text>

        {/* Input Field */}
        <View style={styles.pinCode}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={styles.pinCodeItem}>
              <Text style={styles.pinCodeItemText}>
                {pinCode.slice(i, i + 1) || "-"}
              </Text>
            </View>
          ))}
        </View>

        {/* Resend */}
        <Text style={styles.footerText}>
          I Didn't Receive Code?{" "}
          <Text style={styles.createAccount}>Resend Code</Text>
        </Text>
      </View>

      {/* Button */}
      <Button handle={handleVerify} title="Next" disable={!pinCode} />
      <KeyPad
        handleNumberPress={handleNumberPress}
        handleDelete={handleDelete}
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
    marginBottom: 20,
  },
  subtitle: {
    marginVertical: 15,
    lineHeight: 22,
  },
  subEmail: {
    color: COLORS.secondary,
  },
  footerText: {
    textAlign: "center",
    color: "#444",
    marginTop: 10,
    fontWeight: 400,
    fontSize: 14,
  },
  createAccount: {
    fontWeight: 600,
    color: COLORS.secondary,
  },
  pinCode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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
    width: "15%",
  },
  pinCodeItemText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
  },
});

export default VerifyScreen;
