import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";
import globalStyles from "@/styles/global";

const InfoSimplisendScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Information"
      title="What does simplisend do with my information?"
    >
      <View style={styles.container}>
        <Text style={styles.content}>
          For our customers to use our services, we collect essential and
          additional information required by law. This mainly refers to
          information, such as anti-money laundering requirements or confirming
          your identity to prevent potential fraud. Additionally, we may use
          your information to enable certain features on the platform, and
          inform you about new features (based on your preferences). We will
          never sell your information to a third party without your permission.
          Learn more about{" "}
          <Text style={{ color: COLORS.secondary }}>
            SimpliSend's privacy policies.
          </Text>
        </Text>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFF6E0" }]}
          onPress={() => navigation.push("info-document")}
        >
          <View>
            <Text style={[globalStyles.h4, { color: "#3862F8" }]}>Next</Text>
            <Text style={styles.cardText}>Accepted identity documents</Text>
          </View>
          <ChevronRight size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 25,
    color: COLORS.textColor,
    marginVertical: 16,
  },
  card: {
    borderRadius: 18,
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.textColor,
    lineHeight: 25,
  },
});

export default InfoSimplisendScreen;
