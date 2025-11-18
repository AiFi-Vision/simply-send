import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import ContainerView from "@/components/ContainerView";
import Text from "@/elements/Text";
import { formatAmount } from "@/helper";
import { COLORS } from "@/styles/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FundWalletScreen = () => {
  const [balance, setBalance] = useState(920);

  return (
    <ContainerView
      prev="Fund Wallet"
      footer={
        <View style={styles.footerContainer}>
          <Image
            source={require("@/assets/images/home/tabbar.png")}
            style={{ width: SCREEN_WIDTH, height: (SCREEN_WIDTH / 375) * 135 }}
          />
          <TouchableOpacity
            style={styles.footerImage}
            onPress={() => router.push("/(tabs)/quick-payment")}
          >
            <View style={styles.iconWrapper}>
              <Image
                source={require("@/assets/images/extra/qrscan_white.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
            <Text style={styles.footerText}>Quick Payment</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Balance</Text>
        <View style={styles.balance}>
          <Text style={styles.balanceAmount}>{formatAmount(balance, 2)}</Text>
          <Image
            source={require("@/assets/images/home/$.png")}
            style={styles.balanceIcon}
          />
        </View>
        {/* Custom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/wallet/card")}
          >
            <Ionicons name="add-outline" size={24} color={COLORS.secondary} />
            <Text style={styles.buttonText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/withdraw")}
          >
            <Ionicons
              name="remove-outline"
              size={24}
              color={COLORS.secondary}
            />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionSendButton]}
          onPress={() => router.push("/(tabs)/send")}
        >
          <Image
            source={require("@/assets/images/extra/upright.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionRequestButton]}
          onPress={() => router.push("/(tabs)/request")}
        >
          <Image
            source={require("@/assets/images/extra/downleft.png")}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Request</Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
  },
  cardTitle: {
    fontWeight: "400",
    fontSize: 20,
    color: COLORS.textColor,
  },
  balance: {
    paddingVertical: 10,
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "400",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  actionButton: {
    backgroundColor: "#B8DDB6",
    paddingVertical: 100,
    paddingHorizontal: 50,
    borderRadius: 110,
    width: 180,
    alignItems: "center",
  },
  actionSendButton: {
    backgroundColor: "#B8DDB6",
    marginBottom: 55,
  },
  actionRequestButton: {
    backgroundColor: COLORS.yellow,
    marginTop: 55,
  },
  actionIcon: {
    width: 28,
    marginBottom: 10,
  },
  actionText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "500",
  },
  footerContainer: {
    position: "absolute",
    bottom: -3,
  },
  footerImage: {
    position: "absolute",
    bottom: 32,
    left: SCREEN_WIDTH / 2 - 54,
    alignItems: "center",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary, // Circle background color
    padding: 18,
    borderRadius: 46, // Makes it a circle
    marginBottom: 12,
  },
  footerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
});

export default FundWalletScreen;
