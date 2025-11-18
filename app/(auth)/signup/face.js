import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";

const SignUpFaceScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Body */}
      <View style={styles.body}>
        <Image source={require("@/assets/images/auth/Face ID.png")} />
        <Text style={styles.bodyTitle}>
          Make logging in faster with Face ID
        </Text>
        <Text style={styles.bodyText}>
          Protect your account with Face ID. Add an extra layer of security to
          your account.
        </Text>
      </View>

      {/* Allow Button */}
      <Button handle={() => {}} title="Set up Face ID" />
      <Text style={styles.skipText} onPress={() => navigation.push("finger")}>
        Skip for now
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
  },
  body: {
    marginTop: 300,
    flex: 1,
    alignItems: "center",
  },
  bodyTitle: {
    marginTop: 70,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "600",
    color: "#fff",
    paddingHorizontal: 25,
    marginHorizontal: 25,
    textAlign: "center",
  },
  bodyText: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    color: "#fff",
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

export default SignUpFaceScreen;
