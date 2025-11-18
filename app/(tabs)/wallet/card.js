import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import Text from "@/elements/Text";
import { formatAmount } from "@/helper";
import { COLORS } from "@/styles/colors";

const WalletCardScreen = () => {
  const [balance, setBalance] = useState(920);
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Add Money"
      footer={
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => navigation.push("add")}
          >
            <Ionicons name="add-outline" size={32} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.footerText}>Add Money</Text>
        </View>
      }
    >
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/wallet/card.png")}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Card Balance</Text>
          <View style={styles.balance}>
            <Text style={styles.balanceAmount}>{formatAmount(balance, 2)}</Text>
            <Image
              source={require("@/assets/images/home/$.png")}
              style={styles.balanceIcon}
            />
          </View>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
  },
  cardImage: {
    width: "100%",
    resizeMode: "contain",
  },
  cardContent: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontWeight: "400",
    fontSize: 20,
    color: COLORS.textColor,
  },
  balance: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  balanceAmount: {
    color: COLORS.primary,
    fontSize: 64,
    fontWeight: "600",
  },
  balanceIcon: {
    top: 20,
    marginLeft: 10,
    width: 15,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: "#6BBB77", // Circle background color
    padding: 12,
    borderRadius: 30, // Makes it a circle
    marginBottom: 8, // Space between icon and text
  },
  footerText: {
    color: "#6BBB77",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default WalletCardScreen;
