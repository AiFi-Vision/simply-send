import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import SuccessView from "@/components/Success";
import Text from "@/elements/Text";
import UserCard from "@/components/UserCard";
import { COLORS } from "@/styles/colors";

const WithDrawSuccess = () => {
  const user = {
    name: "Satish Ray",
    content: "account ending in 9044",
    avatar: require(`@/assets/images/users/user_1.png`),
    currencyCode: "USD",
  };
  return (
    <SuccessView
      title="Money added to your bank."
      content="You have successfully withdrawn $1000 USD and transferred it to below account."
    >
      <View style={styles.content}>
        <UserCard user={user} />
        <TouchableOpacity style={styles.contentItem}>
          <View style={styles.contentItemLeft}>
            <View style={styles.contentItemImage}>
              <Image
                source={require("@/assets/images/bank/bank_1.png")}
                style={styles.bankMarkIcon}
              />
            </View>
            <View style={styles.contentItemBody}>
              <Text style={styles.contentItemTitle}>Savings Account</Text>
              <Text style={styles.contentItemId}>
                {"1231231234".replace(/\d(?=\d{4})/g, "*")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SuccessView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  avatar: {
    width: 56,
    height: 56,
    marginRight: 10,
  },
});

export default WithDrawSuccess;
