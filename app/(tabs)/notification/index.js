import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "@/elements/Text";
import { COLORS } from "@/styles/colors";
import { formatAmount, formatTimeDifference } from "@/helper";
import ContainerView from "@/components/ContainerView";
import globalStyles from "@/styles/global";

const templeteMessages = (name, amount) => {
  return {
    "Payment received": (
      <Text>
        You received a payment of{" "}
        <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
          ${formatAmount(amount, 2)}
        </Text>{" "}
        from {name}.
      </Text>
    ),
    "Payment cancelled": (
      <Text>
        Your Request has been refused by {name}. You cannot now connect with
        him.
      </Text>
    ),
    "Scheduled transfer Confirmed": (
      <Text>
        Your scheduled transfer of{" "}
        <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
          ${formatAmount(amount, 2)}
        </Text>{" "}
        payment to {name} has been scheduled.
      </Text>
    ),
    "Payment request": (
      <Text>
        Your Request has been for{" "}
        <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
          ${formatAmount(amount, 2)}
        </Text>{" "}
        payment has been accepted by {name}.
      </Text>
    ),
  };
};

const Notification = ({ item }) => {
  const { type, image, name, amount, createdAt } = item;

  return (
    <TouchableOpacity style={styles.contentItem}>
      <View style={styles.contentItemLeft}>
        <View style={styles.contentItemImage}>
          <Image source={image} style={styles.bankMarkIcon} />
        </View>
        <View style={styles.contentItemBody}>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            {type}
          </Text>
          <Text style={styles.contentItemId}>
            {templeteMessages(name, amount)[type]}
          </Text>
        </View>
      </View>
      <View style={styles.contentItemRight}>
        <Text style={globalStyles.h5}>{formatTimeDifference(createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationScreen = () => {
  const notifications = [
    {
      id: 1,
      type: "Payment received",
      image: require("@/assets/images/users/user_5.png"),
      name: "Yogle Ismada",
      amount: 860,
      createdAt: "2025-4-11 07:32",
    },
    {
      id: 2,
      type: "Payment cancelled",
      image: require("@/assets/images/users/user_6.png"),
      name: "Gregory smith",
      createdAt: "2025-4-15 07:32",
    },
    {
      id: 3,
      type: "Payment request",
      image: require("@/assets/images/users/user_6.png"),
      name: "Gregory smith",
      amount: 860,
      createdAt: "2025-4-24 07:32",
    },
    {
      id: 4,
      type: "Scheduled transfer Confirmed",
      image: require("@/assets/images/users/user_5.png"),
      name: "Yogle Ismada",
      amount: 860,
      createdAt: "2025-4-23 07:32",
    },
    {
      id: 5,
      type: "Payment received",
      image: require("@/assets/images/users/user_5.png"),
      name: "Yogle Ismada",
      amount: 860,
      createdAt: "2025-4-17 07:32",
    },
    {
      id: 6,
      type: "Payment received",
      image: require("@/assets/images/users/user_5.png"),
      name: "Yogle Ismada",
      amount: 860,
      createdAt: "2025-3-11 07:32",
    },
  ];

  return (
    <ContainerView prev="Notifications" style={styles.container}>
      <ScrollView>
        {notifications.map((item, index) => (
          <Notification item={item} key={index} />
        ))}
      </ScrollView>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 2,
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  contentItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemImage: {
    marginRight: 20,
    backgroundColor: "#EBEBEB",
    borderRadius: 100,
  },
  contentItemBody: {
    width: "80%",
  },
  contentItemId: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textColor,
    opacity: 0.5,
  },
  bankMarkIcon: {
    width: 56,
    height: 56,
    resizeMode: "contain",
  },
  contentItemRight: {
    position: "absolute",
    right: 0,
    top: 8,
    opacity: 0.5,
  },
});

export default NotificationScreen;
