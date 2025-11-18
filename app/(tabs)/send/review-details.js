import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Button, TextInput } from "@/elements";
import { formatAmount } from "@/helper";
import { COLORS } from "@/styles/colors";

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
];

const SendReviewDetailsScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { amount, currency } = router.params;
  const [balance, setBalance] = useState(920);

  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const handleNext = () => {
    navigation.push("payment-confirm", { amount, currency: selectedCurrency });
  };

  return (
    <ContainerView
      prev="Review detials"
      content={`Available Balance: $${formatAmount(balance, 2)}`}
      footer={
        <Button
          handle={handleNext}
          title={`Add $ ${formatAmount(amount)} ${selectedCurrency.code}`}
          style={{ margin: 20 }}
        />
      }
    >
      <Text style={styles.amountTitle}>Enter Amount</Text>
      <View style={styles.amountContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.inputPrefix}>{selectedCurrency.symbol}</Text>
          <TextInput
            placeholder="Select Amount"
            style={styles.input}
            value={formatAmount(amount)}
            placeholderTextColor="#888"
            editable={false}
          />
        </View>
        <Pressable
          style={styles.currencySelector}
          // onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
        >
          <Image
            source={require("@/assets/images/currency/USD.png")}
            style={styles.currenyIcon}
          />
          <Text style={styles.currencyCode}>{selectedCurrency.code}</Text>
          <ChevronDown size={20} color="#6B7280" />
        </Pressable>
      </View>
      {amount > balance && (
        <Text style={styles.warning}>
          Umm sorry, you can’t withdraw more than your wallet balance
        </Text>
      )}

      {showCurrencyPicker && (
        <View style={styles.currencyPicker}>
          {currencies.map((currency) => (
            <TouchableOpacity
              key={currency.code}
              style={styles.currencyOption}
              onPress={() => {
                setSelectedCurrency(currency);
                setShowCurrencyPicker(false);
              }}
            >
              <Text style={styles.currencyOptionText}>
                {currency.symbol} {currency.code}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  amountTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.primary,
  },
  amountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#999",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    height: 74,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginRight: 4,
  },
  currenyIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#999",
    borderWidth: 1,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 3,
    width: "65%",
    height: 74,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 32,
    fontWeight: 600,
    color: COLORS.primary,
  },
  inputPrefix: {
    fontWeight: "500",
    fontSize: 24,
    color: COLORS.primary,
  },
  currencyPicker: {
    position: "absolute",
    top: 105,
    width: 100,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  currencyOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  currencyOptionText: {
    fontSize: 16,
    color: "#374151",
  },
  warning: {
    fontSize: 12,
    fontWeight: "400",
    color: "#E44E52",
    textAlign: "center",
  },
});

export default SendReviewDetailsScreen;
