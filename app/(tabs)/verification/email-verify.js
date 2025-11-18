import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ContainerView from "@/components/ContainerView";
import { Text, Button, TextInput } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

const EmailVerifyScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  return (
    <ContainerView
      title="Verify your email"
      footer={
        <Button
          handle={() => navigation.push("email-check", { email })}
          title="Verify my Email"
          style={styles.footer}
        />
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        <Image
          source={require("@/assets/images/verification/verify-email.png")}
        />
        <Text style={[globalStyles.h3, styles.title]}>
          Enter your email address and press the button below. We will send you
          an a verification link to verify your email
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>
        <Text style={[globalStyles.h4, styles.content]}>
          Tip: Make sure to check your inbox and spam folders
        </Text>
      </View>
      {/* Button */}
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    color: COLORS.textColor,
  },
  content: {
    lineHeight: 22,
    alignSelf: "flex-start",
  },
  footer: {
    margin: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginVertical: 25,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: "#000",
  },
});

export default EmailVerifyScreen;
