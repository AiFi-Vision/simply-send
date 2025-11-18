import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, Button } from "@/elements";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "@/styles/global";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSendOTP = () => {
    // Send OTP logic here
    console.log("Sending OTP to:", email);
    if (email.trim()) {
      navigation.navigate("verify", { email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("login")}>
          <Ionicons name="arrow-back-outline" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot password</Text>
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={globalStyles.h1}>Forgot Password</Text>
        <Text style={[globalStyles.h4, styles.subtitle]}>
          Please enter the Email. We will send an OTP to your registered Email
          to reset your password.
        </Text>

        {/* Input Field */}
        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={isFocused ? "#000" : "#999"}
            style={styles.icon}
          />
          <TextInput
            placeholder="Email / Mobile Number"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
            keyboardType="email-address"
            onFocus={() => setIsFocused(true)}
          />
        </View>

        {/* Button */}
        <Button handle={handleSendOTP} title="Sent OTP" disable={!isFocused} />
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginVertical: 25,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#59b77f",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: "#000",
  },
});

export default ForgotPasswordScreen;
