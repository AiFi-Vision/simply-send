import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Text from "@/elements/Text";
import { COLORS } from "@/styles/colors";
import { formatAmount } from "@/helper";

// Define a union type for the `type` property (sent, received, cancelled)
type TransactionType = "sent" | "received" | "cancelled";

interface Transaction {
  name: string;
  date: string;
  type: TransactionType; // Use the specific type here
  amount: number;
  currencyCode: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  handlePress: () => void;
}

const formatDate = (dateString: string) => {
  // Normalize date formats (convert . or / to -)
  let normalizedDate = dateString.replace(/[./]/g, "-"); // Converts 2025.4.18 to 2025-4-18 or 2025/4/18 to 2025-4-18

  // Check for invalid date like "2024-12-32" and correct it if necessary
  const isValidDate = (date: string) => {
    return !isNaN(new Date(date).getTime());
  };

  // If the date is not valid, return an error message
  if (!isValidDate(normalizedDate)) {
    console.error("Invalid date:", dateString);
    return "Invalid Date";
  }

  const today = new Date();
  const date = new Date(normalizedDate); // Convert string to Date object

  // Check if it's today
  const isToday = today.toDateString() === date.toDateString();

  if (isToday) {
    return "Today";
  }

  // Otherwise, format the date as "7 Feb" or "5 Sun"
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return `${formattedDate}`;
};

const template = {
  sent: {
    image: require("@/assets/images/transaction/sent.png"),
    symbol: "-",
    color: COLORS.red,
  },
  received: {
    image: require("@/assets/images/transaction/received.png"),
    symbol: "+",
    color: COLORS.secondary,
  },
  cancelled: {
    image: require("@/assets/images/transaction/cancelled.png"),
    symbol: "",
    color: COLORS.textColor,
  },
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  handlePress,
}) => {
  const { type, name, date, amount, currencyCode } = transaction;

  return (
    <TouchableOpacity style={styles.contentItem} onPress={handlePress}>
      <View style={styles.contentItemLeft}>
        <View style={styles.contentItemImage}>
          <Image source={template[type]?.image} style={styles.bankMarkIcon} />
        </View>
        <View style={styles.contentItemBody}>
          <Text style={styles.contentItemTitle}>{name}</Text>
          <Text style={styles.contentItemId}>
            {type} {formatDate(date)}
          </Text>
        </View>
      </View>
      <View style={styles.contentItemRight}>
        <Text style={[styles.amount, { color: template[type]?.color }]}>
          {template[type]?.symbol}
          {formatAmount(amount, 2)}
          {currencyCode}
        </Text>
        <Text>{formatAmount(2000)} USD</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemImage: {
    marginHorizontal: 10,
    padding: 13,
    backgroundColor: "#EBEBEB",
    borderRadius: 100,
  },
  contentItemBody: {},
  contentItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textColor,
  },
  contentItemId: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  bankMarkIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  contentItemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TransactionCard;
