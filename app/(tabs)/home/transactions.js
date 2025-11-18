import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput, Text } from "@/elements";
import ContainerView from "@/components/ContainerView";
import TransactionCard from "@/components/TransactionCard"; // Import TransactionCard component
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const TransactionsScreen = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const filterValue = ["Today", "Yesterday", "Cancelled", "Received", "Sent"];
  const totalTransactions = [
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "sent",
      date: "2025/04/17",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "cancelled",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "USD",
    },
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/17",
      amount: 500,
      currencyCode: "GBP",
    },

    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/16",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "GBP",
    },
  ];

  const [transactions, setTransactions] = useState(totalTransactions || []);

  const handleSearch = (word) => {
    setTransactions(
      totalTransactions.filter((item) => item.name.includes(word))
    );
    setKeyword(word);
  };

  const handlePress = (transaction) => {};

  return (
    <ContainerView
      prev={
        <View style={styles.prev}>
          <Text style={styles.prevText}>History</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/analytics")}>
            <Image
              source={require("@/assets/images/transaction/Chart_light.png")}
            />
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Name, email, phone"
            style={styles.input}
            value={keyword}
            onChangeText={handleSearch}
          />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.filter}>
            {filterValue.map((item, index) => (
              <TouchableOpacity key={index} style={styles.filterItem}>
                <Text style={globalStyles.h4}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {transactions.length ? (
          transactions.map((item, index) => (
            <TransactionCard
              key={index}
              transaction={item}
              handlePress={() => handlePress(item)}
            />
          ))
        ) : (
          <View></View>
        )}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 150,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    marginBottom: 25,
    height: 66,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 18,
  },
  filter: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  filterItem: {
    padding: 12,
    borderRadius: 12,
    borderColor: COLORS.textColor,
    borderWidth: 1,
  },
  prev: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  prevText: {
    color: "#000C14",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default TransactionsScreen;
