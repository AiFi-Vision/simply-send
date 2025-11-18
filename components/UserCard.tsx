import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Text from "@/elements/Text";
import { getAvatarName, currencyImages } from "@/helper";
import { COLORS } from "@/styles/colors";

interface User {
  name: string;
  content: string;
  avatar?: any;
  currencyCode: string;
}

interface UserCardProps {
  user: User;
  handlePress: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, handlePress }) => {
  return (
    <TouchableOpacity style={styles.contentItem} onPress={handlePress}>
      <View style={styles.contentItemLeft}>
        <View style={styles.contentItemImage}>
          {user?.avatar ? (
            <Image source={user.avatar} style={styles.bankMarkIcon} />
          ) : (
            <Text style={styles.avatar}>{getAvatarName(user.name)}</Text>
          )}
          {currencyImages[user.currencyCode] && (
            <Image
              source={currencyImages[user.currencyCode]}
              style={styles.currency}
            />
          )}
        </View>
        <View style={styles.contentItemBody}>
          <Text style={styles.contentItemTitle}>{user.name}</Text>
          <Text style={styles.contentItemId}>{user.content}</Text>
        </View>
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
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemImage: {
    marginRight: 30,
  },
  contentItemBody: {},
  contentItemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textColor,
  },
  contentItemId: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  bankMarkIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius: 100,
  },
  avatar: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: "#E5E9FF",
    textAlign: "center",
    paddingTop: 14,
  },
  currency: {
    width: 18,
    height: 18,
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default UserCard;
