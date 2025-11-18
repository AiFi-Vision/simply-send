import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageProps,
  TouchableOpacity,
} from "react-native";
import Text from "@/elements/Text";
import { COLORS } from "@/styles/colors";
import { getAvatarName, formatTimeDifference } from "@/helper";
import globalStyles from "@/styles/global";

interface Message {
  content: string;
  createdAt: string;
  isVisit: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: ImageProps;
  isLive: boolean;
  messages: Message[];
}

interface ChatCardProps {
  user: User;
  handlePress: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ user, handlePress }) => {
  const { id, name, avatar, isLive, messages } = user;

  return (
    <TouchableOpacity style={styles.contentItem} onPress={handlePress}>
      <View style={styles.contentItemLeft}>
        <View style={styles.contentItemImage}>
          {avatar ? (
            <Image source={avatar} style={styles.bankMarkIcon} />
          ) : (
            <Text style={styles.avatar}>{getAvatarName(name)}</Text>
          )}
          {isLive && <View style={styles.live} />}
        </View>
        <View style={styles.contentItemBody}>
          <Text style={globalStyles.h2}>{name}</Text>
          <Text style={styles.contentItemId}>
            {messages.length && messages[0].content}
          </Text>
        </View>
      </View>
      <View style={styles.contentItemRight}>
        <Text style={globalStyles.h4}>
          {messages.length && formatTimeDifference(messages[0].createdAt)}
        </Text>
        {messages.length && messages.filter((item) => !item.isVisit).length ? (
          <Text style={styles.badge}>
            {messages.filter((item) => !item.isVisit).length}
          </Text>
        ) : (
          <View></View>
        )}
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
    paddingVertical: 12,
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemImage: {
    marginRight: 20,
    backgroundColor: "#EBEBEB",
    borderRadius: 100,
  },
  contentItemBody: {},
  contentItemId: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  bankMarkIcon: {
    width: 56,
    height: 56,
    resizeMode: "contain",
  },
  avatar: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 100,
    width: 56,
    height: 56,
    backgroundColor: "#E5E9FF",
    textAlign: "center",
    paddingTop: 16,
  },
  contentItemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  live: {
    width: 12,
    height: 12,
    position: "absolute",
    right: 4,
    bottom: 0,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: COLORS.secondary,
  },
  badge: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    textAlign: "center",
    borderRadius: 100,
    paddingTop: 8,
  },
});

export default ChatCard;
