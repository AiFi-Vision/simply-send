import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import { formatAmount } from "@/helper";
import PinCodeModal from "@/components/PinCodeModal";
import { COLORS } from "@/styles/colors";

const WalletSelectBankScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const router = useRouter();
  const { amount, currency } = route.params;

  const [isVisible, setIsVisible] = useState(false);

  const [bankAccounts, setBankAccounts] = useState([
    {
      title: "Savings Account",
      id: "123123123123",
      mark: require(`@/assets/images/bank/bank_1.png`),
      currency: {
        amount: 900,
        symbol: "$",
      },
    },
    {
      title: "Savings Account",
      id: "123123123123",
      mark: require(`@/assets/images/bank/bank_2.png`),
      currency: {
        amount: 1000,
        symbol: "€",
      },
    },
    {
      title: "Savings Account",
      id: "123123123123",
      mark: require(`@/assets/images/bank/bank_3.png`),
      currency: {
        amount: 500,
        symbol: "£",
      },
    },
  ]);

  const handleNext = () => {
    navigation.push("payment-method", { amount, currency });
  };

  const [pinCode, setPinCode] = useState("");

  return (
    <ContainerView
      title="Choose from which account you want to add money"
      prev="Select bank account"
      footer={
        <Button
          handle={handleNext}
          title="Use another payment method"
          style={{ margin: 20 }}
          type="outline"
        />
      }
    >
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.headerLeft}>Account</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/manage-account")}
          >
            <Text style={styles.headerRight}>+ Add new account</Text>
          </TouchableOpacity>
        </View>
        {bankAccounts.length &&
          bankAccounts.map((item, index) => (
            <TouchableOpacity
              style={styles.contentItem}
              key={index}
              onPress={() => setIsVisible(true)}
            >
              <View style={styles.contentItemLeft}>
                <View style={styles.contentItemImage}>
                  <Image source={item.mark} style={styles.bankMarkIcon} />
                </View>
                <View style={styles.contentItemBody}>
                  <Text style={styles.contentItemTitle}>{item.title}</Text>
                  <Text style={styles.contentItemId}>
                    {item.id.replace(/\d(?=\d{4})/g, "*")}
                  </Text>
                </View>
              </View>
              <View style={styles.contentItemRight}>
                <Text>{item.currency.symbol}</Text>
                <Text>{formatAmount(item.currency.amount, 2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
      {/* Custom Modal */}
      <PinCodeModal
        pinCode={pinCode}
        setPinCode={setPinCode}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        nextRouter={"success"}
      />
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
  },
  contentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.primary,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
  },
  contentItemImage: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderColor: "#999",
    marginRight: 10,
  },
  contentItemBody: {},
  contentItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textColor,
  },
  contentItemId: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  bankMarkIcon: {
    width: 28,
    height: 20,
    resizeMode: "contain",
  },
  contentItemRight: {
    display: "flex",
    flexDirection: "row",
  },
});

export default WalletSelectBankScreen;
