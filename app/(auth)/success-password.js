import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";
import Text from "@/elements/Text";
import globalStyles from "@/styles/global";
import { Button } from "@/elements";

const ForgotPasswordScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.body}>
        <Image source={require("@/assets/images/auth/success.png")} />
        <Text style={[globalStyles.h1, { marginVertical: 20 }]}>
          Password changed successfully!
        </Text>
      </View>
      {/* Button */}
      <Button
        handle={() => router.push("login")}
        title="Continue"
        type="outline"
        style={{ marginBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  body: {
    alignItems: "center",
    marginTop: 200,
  },
});

export default ForgotPasswordScreen;
