import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Text from "@/elements/Text";
import TextInput from "@/elements/TextInput";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/elements";
import globalStyles from "@/styles/global";

const SignUpNameScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSendOTP = () => {
    // Send OTP logic here
    console.log("Sending OTP to:", firstName, lastName);
    if (firstName && lastName) {
      navigation.navigate("birth");
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
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={2} totalSteps={6} />
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={globalStyles.h1}>What's your Name?</Text>
        <Text style={[globalStyles.normalText, styles.subtitle]}>
          We ask for your personal information to verity your identity
        </Text>

        {/* Input Field */}
        <View style={[styles.inputBox, isFocused && styles.inputFocused]}>
          <Ionicons
            name="person-outline"
            size={20}
            color={isFocused ? "#000" : "#999"}
            style={styles.icon}
          />
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            placeholderTextColor="#888"
            onFocus={() => setIsFocused(true)}
          />
        </View>

        {/* Input Field */}
        <View style={[styles.inputBox, isFocused && styles.inputFocused]}>
          <Ionicons
            name="person-outline"
            size={20}
            color={isFocused ? "#000" : "#999"}
            style={styles.icon}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            placeholderTextColor="#888"
            onFocus={() => setIsFocused(true)}
          />
        </View>

        {/* Button */}
        <Button
          handle={handleSendOTP}
          title="Next"
          disable={!isFocused}
          style={{ marginTop: 20 }}
        />
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
  progressContainer: {
    paddingTop: 24,
  },
  body: {
    marginTop: 40,
  },
  subtitle: {
    marginVertical: 15,
    lineHeight: 22,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 24,
    marginBottom: 25,
    height: 66,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#59b77f",
  },
  icon: {
    marginRight: 8,
  },
});

export default SignUpNameScreen;
