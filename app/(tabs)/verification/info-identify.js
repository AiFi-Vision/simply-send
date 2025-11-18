import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";
import globalStyles from "@/styles/global";

const InfoIdentifyScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Information"
      title="Why am I being asked to verify my identity?"
    >
      <View style={styles.container}>
        <Text style={styles.content}>
          SimpliSend may, from time to time, require you to prove your identity
          in order to stop fraud and make any modifications to your account. As
          mandated by our regulators (the FINCTRAC in Canada and the FinCEN in
          the U.S), we will also ask you to confirm your identification before
          increasing the transaction limit. All identification documents must be
          confirmed and verified by our compliance team before you can start
          using the SimpliSend mobile app. This is part of our dedication to
          continuing to be a dependable financial service provider. For the
          purpose of identity verification, we do not accept emailed copies of
          your identification papers.
        </Text>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFF6E0" }]}
          onPress={() => navigation.push("info-simplisend")}
        >
          <View>
            <Text style={[globalStyles.h4, { color: "#3862F8" }]}>Next</Text>
            <Text style={styles.cardText}>
              What does simplisend do with my information?
            </Text>
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

export default InfoIdentifyScreen;
