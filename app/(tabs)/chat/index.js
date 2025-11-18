import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ContainerView from "@/components/ContainerView";
import ChatCard from "@/components/ChatCard";

const ChatScreen = () => {
  const router = useRouter();
  const users = [
    {
      id: 1,
      name: "Ronald Richards",
      avatar: require("@/assets/images/users/user_5.png"),
      isLive: true,
      messages: [
        {
          content: "Hi, listen have you sent me the money?",
          createdAt: "2025-04-18 17:06",
          isVisit: true,
        },
      ],
    },
    {
      id: 2,
      name: "Ronald Richards",
      avatar: require("@/assets/images/users/user_8.png"),
      isLive: true,
      messages: [
        {
          content: "Hi, listen have you sent me the money?",
          createdAt: "2025-10-11 07:32",
          isVisit: false,
        },
      ],
    },
    {
      id: 3,
      name: "Ronald Richards",
      avatar: require("@/assets/images/users/user_9.png"),
      isLive: false,
      messages: [
        {
          content: "Hi, listen have you sent me the money?",
          createdAt: "2025-04-18 14:32",
          isVisit: false,
        },
        {
          content: "Hi, listen have you sent me the money?",
          createdAt: "2025-04-18 14:32",
          isVisit: false,
        },
      ],
    },
    {
      id: 4,
      name: "Ronald Richards",
      avatar: require("@/assets/images/users/user_6.png"),
      isLive: false,
      messages: [
        {
          content: "Hi, listen have you sent me the money?",
          createdAt: "2025-04-18 07:32",
          isVisit: true,
        },
      ],
    },
    {
      id: 5,
      name: "Ronald Richards",
      avatar: require("@/assets/images/users/user_7.png"),
      isLive: false,
      messages: [
        {
          content: "Hi, listen have you sent me the money?",
          createdAt: "2025-04-17 07:32",
          isVisit: true,
        },
      ],
    },
  ];

  return (
    <ContainerView prev="Chat" title="Chats">
      {users.map((user, index) => (
        <ChatCard
          user={user}
          key={index}
          handlePress={() => router.push(`/(tabs)/chat/details/${user.id}`)}
        />
      ))}
    </ContainerView>
  );
};

const styles = StyleSheet.create({});

export default ChatScreen;
