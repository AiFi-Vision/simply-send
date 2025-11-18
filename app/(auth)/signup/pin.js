import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import ProgressBar from "@/components/ProgressBar";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const SignUpPinScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={6} totalSteps={6} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Image
          source={require("@/assets/images/auth/Two factor authentication.png")}
        />
        <Text style={[globalStyles.h1, styles.bodyTitle]}>Set up a PIN</Text>
        <Text style={[globalStyles.h4, styles.bodyText]}>
          Choose a 4-digit code for a quick login option.
        </Text>
      </View>

      {/* Allow Button */}
      <Button handle={() => navigation.push("setup-pin")} title="Set up code" />
      <Text style={styles.skipText} onPress={() => navigation.push("face")}>
        Skip for now
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingTop: 24,
    marginTop: 60,
  },
  body: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
  },
  bodyTitle: {
    marginTop: 70,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  bodyText: {
    marginTop: 20,
    lineHeight: 22,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  skipText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    color: COLORS.secondary,
    marginVertical: 30,
  },
});

export default SignUpPinScreen;
