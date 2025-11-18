import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";

const SignUpCompleteScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Body */}
      <View style={styles.body}>
        <Image source={require("@/assets/images/auth/complete.png")} />
        <Text style={styles.bodyPopup}>LET’S GET STARTED WITH SIMPLISEND</Text>
        <Text style={styles.bodyTitle}>Sign up Successful</Text>
        <Text style={styles.bodyText}>Lets send some money!</Text>
      </View>

      {/* Allow Button */}
      <Button
        handle={() => router.push("home")}
        title="Go to home"
        style={{ marginBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  body: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
  },
  bodyTitle: {
    marginTop: 70,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "600",
    color: COLORS.primary,
    paddingHorizontal: 25,
    marginHorizontal: 25,
    textAlign: "center",
  },
  bodyText: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    color: COLORS.primary,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  bodyPopup: {
    position: "absolute",
    top: 200,
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 52,
    textAlign: "center",
    color: "#334399",
    paddingHorizontal: 30,
  },
});

export default SignUpCompleteScreen;
