import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { formatAmount } from "@/helper";
import Text from "@/elements/Text";
import { COLORS } from "@/styles/colors";

const WalletPaymentMethod = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { amount, currency } = router.params;

  const selectPaymentMethod = () => {
    navigation.push("payment-confirm", { amount, currency });
  };

  const paymentData = [
    {
      title: "Wire transfer",
      content:
        "8.91 USD in total fees. Your bank may charge an additional fee. Recipient gets 821.08 GBP. Should arrive by Tuesday.",
      icon: require("@/assets/images/wallet/wire_transfer.png"),
    },
    {
      title: "Debit Card",
      content:
        "18.85 USD in total fees. Your bank may charge an additional fee. Recipient gets 821.08 GBP. Should arrive by Tuesday.",
      icon: require("@/assets/images/wallet/debit_card.png"),
    },
    {
      title: "Credit Card",
      content:
        "46.44 USD in total fees. Your bank may charge an additional fee. Recipient gets 821.08 GBP. Should arrive by Tuesday.",
      icon: require("@/assets/images/wallet/credit_card.png"),
    },
  ];

  return (
    <ContainerView
      title={`Choose how do you want to send ${formatAmount(amount, 2)} ${
        currency.code
      }`}
      prev="Payment method"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Other payment method</Text>
        <TouchableOpacity
          style={styles.methodRow}
          onPress={selectPaymentMethod}
        >
          <Image
            source={require("@/assets/images/wallet/apple_pay.png")}
            style={styles.methodImage}
          />
          <View style={styles.methodWrapper}>
            <Text style={styles.methodTitle}>Apple Pay</Text>
            <Text style={styles.methodContent}>
              With a debit card from your wallet, it's 18.85 USD in total fees,
              so recipient gets 812.85 GBP. With a credit card from your wallet,
              it's 46.44 USD in total fees, so recipient gets 789.99 GBP. Should
              arrive in seconds.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("@/assets/images/wallet/apple_pay_white.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        {paymentData.map((item, index) => (
          <TouchableOpacity
            style={styles.methodRow}
            key={index}
            onPress={selectPaymentMethod}
          >
            <Image source={item.icon} style={styles.methodImage} />
            <View style={styles.methodWrapper}>
              <Text style={styles.methodTitle}>{item.title}</Text>
              <Text style={styles.methodContent}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    color: COLORS.primary,
    fontWeight: "400",
    fontSize: 14,
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: "#e8e8e8",
  },
  methodRow: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    marginVertical: 20,
  },
  methodWrapper: {
    flex: 1,
    maxWidth: "80%",
  },
  methodImage: {
    width: 42,
    resizeMode: "contain",
    padding: 10,
    marginRight: 12,
  },
  methodTitle: {
    color: COLORS.textColor,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 8,
  },
  methodContent: {
    color: COLORS.textColor,
    fontSize: 12,
    fontWeight: "400",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 12,
  },
  buttonImage: {
    width: 54,
    resizeMode: "contain",
  },
});

export default WalletPaymentMethod;
