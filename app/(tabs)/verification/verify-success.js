import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button } from "@/elements";
import { useUserStore } from "@/store";
import { COLORS } from "@/styles/colors";

const VerifySuccessScreen = () => {
  const router = useRouter();

  const handle = () => {
    router.push("/(tabs)/home");
    useUserStore.getState().setUser({ isVerified: true });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("@/assets/images/verification/verify-success.png")}
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.title}>WE'RE VERIFYING YOUR IDENTITY</Text>
        <Text style={styles.content}>
          We're reviewing your documents, this can take up to 24 hours. We'll
          let you know as we are done. We're reviewing the following:
        </Text>
        <View style={{ padding: 12 }}>
          <Text style={styles.text}>
            {"\u2022"} Your full legal name as it appears on your ID
          </Text>
          <Text style={styles.text}>
            {"\u2022"} The validity of your submitted document
          </Text>
          <Text style={styles.text}>
            {"\u2022"} The legitimacy of your document
          </Text>
        </View>
      </View>
      <Button title="Go to home" handle={handle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.primary,
    marginTop: 80,
    marginBottom: 40,
  },
  content: {
    lineHeight: 22,
    fontSize: 16,
  },
  text: {
    marginVertical: 8,
  },
});

export default VerifySuccessScreen;
