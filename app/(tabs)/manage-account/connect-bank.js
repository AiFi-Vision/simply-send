import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const ConnectBankScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Connect your bank"
      footer={
        <View style={styles.footer}>
          <Button
            title="Continue"
            style={{ margin: 20 }}
            handle={() => navigation.push("find-bank")}
          />
          <Text style={styles.footerText}>
            By selecting “Continue”, you agree to{" "}
            <Text style={{ color: COLORS.secondary }}>terms & conditions</Text>
          </Text>
        </View>
      }
    >
      <View style={styles.container}>
        <Text
          style={[globalStyles.h1, { textAlign: "center", marginVertical: 20 }]}
        >
          Connect your bank
        </Text>
        <Image
          source={require("@/assets/images/account/connect-bank.png")}
          style={{ alignSelf: "center", marginVertical: 40 }}
        />
        <View style={styles.item}>
          <Ionicons name="checkmark" style={styles.checkmarkStyle} size={16} />
          <Text style={styles.itemText}>
            We use bank level encryption to protect your information
          </Text>
        </View>
        <View style={styles.item}>
          <Ionicons name="checkmark" style={styles.checkmarkStyle} size={16} />
          <Text style={styles.itemText}>
            We will never access your credentials
          </Text>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  checkmarkStyle: {
    color: "#fff",
    backgroundColor: "#74C12C",
    padding: 2,
    borderRadius: 100,
    marginRight: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  itemText: {
    fontWeight: "400",
    fontSize: 18,
    color: COLORS.textColor,
    opacity: 0.6,
  },
  footerText: {
    textAlign: "center",
    marginHorizontal: 40,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "400",
    opacity: 0.6,
  },
});

export default ConnectBankScreen;
