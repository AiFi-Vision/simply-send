import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import Text from "@/elements/Text";
import TextInput from "@/elements/TextInput";
import ProgressBar from "@/components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [inputData, setInputData] = useState("");
  const [signUpType, setSignUpType] = useState("PHONE");

  const handleSendOTP = () => {
    // Send OTP logic here
    console.log("Sending OTP to:", inputData);
    if (inputData.trim()) {
      navigation.navigate("verify", { inputData });
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={1} totalSteps={6} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={[globalStyles.h1, styles.title]}>
          {signUpType === "PHONE" ? "Let's Get Started" : "Enter your email"}
        </Text>
        <Text style={styles.subtitle}>
          {`Enter your ${
            signUpType === "PHONE" ? "phone number" : "email"
          }, and you'll receive a code to verify it's you.`}
        </Text>

        {/* Phone Input */}
        {signUpType === "PHONE" ? (
          <View style={styles.inputContainer}>
            <Pressable style={styles.countrySelector}>
              <Image
                source={require("@/assets/images/currency/USD.png")}
                style={styles.flag}
              />
              <ChevronDown size={20} color="#1F2937" />
            </Pressable>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={inputData}
              onChangeText={setInputData}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        ) : (
          <View style={[styles.inputEmailContainer]}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#999"
              style={{ margin: 8 }}
            />
            <TextInput
              placeholder="Email Address"
              value={inputData}
              onChangeText={setInputData}
              style={styles.inputEmail}
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
          </View>
        )}

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By entering and tapping Next, you agree to the{" "}
          <Link href="/terms" style={styles.link}>
            Terms of Use
          </Link>
          {" & "}
          <Link href="/privacy" style={styles.link}>
            Privacy Policy
          </Link>
          .
        </Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() =>
            setSignUpType(signUpType === "PHONE" ? "EMAIL" : "PHONE")
          }
        >
          <Text style={styles.emailButtonText}>
            {signUpType === "PHONE" ? "Use Email" : "Use Mobile"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleSendOTP}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
    height: 66,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderColor: "#161F4C33",
    borderWidth: 1,
    gap: 8,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 2,
  },
  countryCode: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    borderColor: "#161F4C33",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  termsText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  link: {
    color: "#22C55E",
  },
  bottomContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  emailButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  emailButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  inputEmailContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginBottom: 20,
  },
  inputEmail: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: "#000",
  },
});
