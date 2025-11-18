import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";
import { useUserStore } from "@/store";

const MethodSelectScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { emailVerify, selfieVerify, docVerify } = useUserStore.getState().user;

  return (
    <ContainerView
      prev={
        <View style={styles.prev}>
          <Text style={styles.prevText}>Verify your identify</Text>
          <TouchableOpacity onPress={() => navigation.push("information")}>
            <Image source={require("@/assets/images/verification/info.png")} />
          </TouchableOpacity>
        </View>
      }
      footer={
        <View style={styles.footer}>
          {emailVerify && selfieVerify && docVerify ? (
            <Button
              title="Continue"
              handle={() => navigation.push("verify-success")}
            />
          ) : (
            <Text
              style={[globalStyles.h2, styles.skipButton]}
              onPress={() => router.push("/(tabs)/home")}
            >
              Skip for now
            </Text>
          )}
        </View>
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        <Image
          source={require("@/assets/images/verification/verified.png")}
          style={{ width: 260, height: 130 }}
        />
        <Text style={styles.title}>Here is what happens next</Text>
        <Text style={[globalStyles.h4, styles.content]}>
          Click the buttons below to complete your verification
        </Text>
        <View style={styles.cardGroup}>
          <View style={styles.card}>
            {emailVerify ? (
              <Ionicons
                name="checkmark"
                size={16}
                color="white"
                style={styles.radioButton}
              />
            ) : (
              <Image source={require("@/assets/images/extra/danger.png")} />
            )}
            <Text style={styles.cardTitle}>Verify email</Text>
            <Text style={styles.cardContent}>
              Verify your email to secure your account
            </Text>
            <Button
              title={emailVerify ? "VIEW" : "VERIFY"}
              type="outline"
              handle={() => navigation.push("email-verify")}
              style={{ paddingVertical: 8 }}
            />
          </View>
          <View style={styles.card}>
            {selfieVerify ? (
              <Ionicons
                name="checkmark"
                size={16}
                color="white"
                style={styles.radioButton}
              />
            ) : (
              <Image source={require("@/assets/images/extra/danger.png")} />
            )}
            <Text style={styles.cardTitle}>Selfie</Text>
            <Text style={styles.cardContent}>
              Take your selfie photo for verification
            </Text>
            <Button
              title={selfieVerify ? "VIEW" : "TAKE SELFIE"}
              type="outline"
              handle={() => navigation.push("selfie-dashboard")}
              style={{ paddingVertical: 8 }}
            />
          </View>
          <View style={styles.card}>
            {docVerify ? (
              <Ionicons
                name="checkmark"
                size={16}
                color="white"
                style={styles.radioButton}
              />
            ) : (
              <Image source={require("@/assets/images/extra/danger.png")} />
            )}
            <Text style={styles.cardTitle}>Doc Scan</Text>
            <Text style={styles.cardContent}>
              Scan your identity card or driving license
            </Text>
            <Button
              title={docVerify ? "VIEW" : "SCAN DOC"}
              type="outline"
              handle={() => navigation.push("doc-dashboard")}
              style={{ paddingVertical: 8 }}
            />
          </View>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  prev: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.textColor,
  },
  content: {
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  skipButton: {
    textAlign: "center",
    color: COLORS.secondary,
  },
  footer: {
    margin: 20,
  },
  prev: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  prevText: {
    color: "#000C14",
    fontSize: 20,
    fontWeight: "400",
  },
  cardGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    justifyContent: "space-between",
  },
  card: {
    padding: 16,
    borderRadius: 28,
    backgroundColor: "#fff",
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
    width: "47%",
  },
  cardTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.primary,
    marginVertical: 16,
  },
  cardContent: {
    fontWeight: "400",
    fontSize: 15,
    color: COLORS.textColor,
    opacity: 0.6,
    marginBottom: 16,
  },
  radioButton: {
    backgroundColor: "#74C12C",
    borderRadius: 100,
    padding: 4,
    width: 24,
  },
});

export default MethodSelectScreen;
