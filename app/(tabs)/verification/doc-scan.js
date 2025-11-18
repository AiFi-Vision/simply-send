import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

const DocScanScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <ContainerView
      footer={
        <View style={styles.footer}>
          <Button
            handle={() => navigation.push("doc-select")}
            title="Continue"
          />
          <Text
            style={[globalStyles.h2, styles.skipButton]}
            onPress={() => router.push("/(tabs)/home")}
          >
            Skip for now
          </Text>
        </View>
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        <Image source={require("@/assets/images/verification/doc-scan.png")} />
        <Text style={[globalStyles.h1, styles.title]}>Doc Scan</Text>
        <Text style={[globalStyles.h4, styles.content]}>
          Take your ID to verify your identity. We are required by law to verify
          your identity before you can use your simplisend account. Your
          information is securely stored with strong encryption.
        </Text>
      </View>
      {/* Button */}
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    lineHeight: 22,
    textAlign: "center",
  },
  footer: {
    margin: 20,
  },
  skipButton: {
    textAlign: "center",
    color: COLORS.secondary,
    padding: 20,
  },
});

export default DocScanScreen;
