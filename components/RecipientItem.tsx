import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import Text from "@/elements/Text";
import { getAvatarName } from "@/helper";
import { COLORS } from "@/styles/colors";

// Define the user type interface
interface User {
  name: string;
  content: string;
  avatar?: ImageSourcePropType; // Optional avatar image
  symbol?: ImageSourcePropType; // Optional currency symbol image
}

interface RecipientItemProps {
  user: User;
  right: React.ReactNode; // The content to render on the right side
  isBorder?: boolean; // Optional prop to control the border
  style?: ViewStyle;
}

const RecipientItem: React.FC<RecipientItemProps> = ({
  user,
  right,
  isBorder = true,
  style,
}) => {
  return (
    <View style={[styles.contentItem, isBorder && styles.contentBorder, style]}>
      <View style={styles.contentItemLeft}>
        <View style={styles.contentItemImage}>
          {user?.avatar ? (
            <Image source={user.avatar} style={styles.bankMarkIcon} />
          ) : (
            <Text style={styles.avatar}>{getAvatarName(user.name)}</Text>
          )}
          {user?.symbol && (
            <Image source={user.symbol} style={styles.currency} />
          )}
        </View>
        <View style={styles.contentItemBody}>
          <Text style={styles.contentItemTitle}>{user.name}</Text>
          <Text style={styles.contentItemId}>{user.content}</Text>
        </View>
      </View>
      {right}
    </View>
  );
};

const styles = StyleSheet.create({
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  contentBorder: {
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
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
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textColor,
  },
  contentItemId: {
    fontSize: 14,
    fontWeight: "400",
    color: "#A5A8B0",
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
    borderWidth: 1,
    borderColor: "#e8e8e8",
    width: 48,
    height: 48,
    backgroundColor: "#fff",
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

export default RecipientItem;
