import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@/components/ProgressBar";
import globalStyles from "@/styles/global";
import { Button, Text, TextInput } from "@/elements";

const SignUpAddressScreen = () => {
  const navigation = useNavigation();
  const [street, setStreet] = useState("");
  const [sub, setSub] = useState("");
  const [city, setCity] = useState("");
  const [statte, setStatte] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(street && sub && city && statte && zipCode);
  }, [street, sub, city, statte, zipCode]);

  const handleSendOTP = () => {
    // Send OTP logic here
    if (isFocused) {
      navigation.navigate("secure");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#111" />
        </TouchableOpacity>
      </View> */}
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={4} totalSteps={6} />
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={globalStyles.h1}>Address</Text>
        <Text style={[globalStyles.h4, styles.subtitle]}>
          Fill in any details that are missing
        </Text>

        {/* Input Field */}
        <View style={styles.inputGroup}>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Street Address"
              value={street}
              onChangeText={setStreet}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Address2 (apt or suite#)"
              value={sub}
              onChangeText={setSub}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="City"
              value={city}
              onChangeText={setCity}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="State"
              value={statte}
              onChangeText={setStatte}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Zip Code"
              value={zipCode}
              onChangeText={setZipCode}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
        </View>
        {/* Button */}
        <Button handle={handleSendOTP} title="Next" disable={!isFocused} />
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
    marginTop: 60,
  },
  body: {
    marginTop: 40,
  },
  subtitle: {
    marginVertical: 15,
    lineHeight: 22,
  },
  inputGroup: {
    marginVertical: 40,
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
    fontSize: 14,
  },
  icon: {
    marginRight: 8,
  },
});

export default SignUpAddressScreen;
