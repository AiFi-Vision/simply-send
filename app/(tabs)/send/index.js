import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import KeyPad from "@/components/KeyPad";
import AmountScroller from "@/components/AmountScroller";
import { formatAmount } from "@/helper";
import { Button, Text, TextInput } from "@/elements";
import { COLORS } from "@/styles/colors";

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
];

const SendScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(920);

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const handleNumberPress = (num) => {
    if (amount === "0") {
      setAmount(Number(num));
    } else {
      setAmount((prev) => Number(prev.toString() + num));
    }
  };

  const handleDelete = () => {
    if (amount > 0) {
      setAmount((prev) => Number(prev.toString().slice(0, -1)));
    } else {
      setAmount(0);
    }
  };

  const handleNext = () => {
    navigation.push("review-details", { amount, currency: selectedCurrency });
  };

  return (
    <ContainerView
      title="How much do you want to send?"
      prev="Send money"
      content={`Available Balance: $${formatAmount(balance)}`}
      footer={
        <AmountScroller
          onAmountChange={setAmount}
          maxAmount={10000}
          step={10}
          currency="$"
          amount={amount}
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
          onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
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

      {/* Next Button */}
      <Button handle={handleNext} title="Next" style={{ marginTop: 20 }} />

      <KeyPad
        handleNumberPress={handleNumberPress}
        handleDelete={handleDelete}
      />
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
  buttonWrapper: {},
  button: {
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
  },
  footer: {
    height: 125,
    backgroundColor: COLORS.primary,
  },
  warning: {
    fontSize: 12,
    fontWeight: "400",
    color: "#E44E52",
    textAlign: "center",
  },
});

export default SendScreen;
