import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Text from "../elements/Text";

type ExchangeRateProps = {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  rateHide?: boolean;
  onPress?: () => void;
};

export default function ExchangeRate({
  fromCurrency = "USD",
  toCurrency = "NGN",
  rate = 446.87,
  rateHide,
  onPress,
}: ExchangeRateProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={styles.flagContainer}>
          <Image
            source={require(`@/assets/images/currency/USD.png`)}
            // source={require(`@/assets/images/currency/${fromCurrency}.png`)}
            style={styles.flag}
          />
          <Image
            source={require(`@/assets/images/currency/NGN.png`)}
            style={[styles.flag, styles.secondFlag]}
          />
        </View>
        {!rateHide && (
          <Text style={styles.exchangeText}>
            1 {fromCurrency}={rate.toFixed(2)} {toCurrency}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  secondFlag: {
    marginLeft: -12, // Overlap the flags
    borderWidth: 1,
    borderColor: "#fff",
  },
  exchangeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
