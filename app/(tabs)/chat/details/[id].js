import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import UserCard from "@/components/UserCard";
import ContainerView from "@/components/ContainerView";
import { Text, TextInput, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";

const DetailsScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [user, setUser] = useState({
    id: 1,
    name: "Ronald Richards",
    avatar: require("@/assets/images/users/user_5.png"),
    isLive: true,
    content: "simplisend.me/@ronald.richards",
    currencyCode: "USD",
    messages: [
      {
        content: "Hi, listen have you sent me the money?",
        createdAt: "2025-04-18 17:06",
        isVisit: true,
        type: "SENT",
      },
      {
        content:
          "Hi, listen have you sent me the money? Hi, listen have you sent me the money? Hi, listen have you sent me the money? Hi, listen have you sent me the money?",
        createdAt: "2025-04-18 17:06",
        isVisit: true,
        type: "RECEIVED",
      },
      {
        content: "Hi, listen have you sent me the money?",
        createdAt: "2025-04-18 17:06",
        isVisit: true,
        type: "SENT",
      },
      {
        content: "Hi, listen have you sent me the money?",
        createdAt: "2025-04-18 17:06",
        isVisit: true,
        type: "SENT",
      },
    ],
  });
  const { id } = useLocalSearchParams();

  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSend = () => {
    if (message) {
      setUser({
        ...user,
        messages: [
          ...user.messages,
          { content: message, type: "SENT", isVisit: true },
        ],
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === "Enter") {
      console.log("Enter key pressed");
      // Handle Enter key logic here
      handleSend();
    }
  };

  return (
    <ContainerView
      prev={<UserCard user={user} />}
      footer={
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.symbol}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.symbolText}>$</Text>
          </TouchableOpacity>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Type Message..."
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              onKeyPress={handleKeyPress}
            />
            <TouchableOpacity onPress={handleSend}>
              <Image source={require("@/assets/images/chat/chat_send.png")} />
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.body}>
          {user?.messages.map((item, index) => (
            <Text
              style={[
                styles.message,
                item.type === "SENT" ? styles.sentMsg : styles.receivedMsg,
              ]}
              key={index}
            >
              {item.content}
            </Text>
          ))}
        </View>
      </View>
      <Modal visible={isVisible} setVisible={setIsVisible}>
        <View style={styles.modalBody}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              setIsVisible(false);
              router.push("/(tabs)/send");
            }}
          >
            <View style={styles.contentItemLeft}>
              <View style={styles.contentItemImage}>
                <Image
                  source={require("@/assets/images/chat/send_money.png")}
                />
              </View>
              <View>
                <Text style={styles.contentItemTitle}>Send Money</Text>
                <Text style={styles.contentItemId}>
                  Send money to your friends
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              setIsVisible(false);
              // navigation.navigate("/(tabs)/request/select-amount", { user });
              router.push({
                pathname: "/(tabs)/request/select-amount",
                params: { user },
              });
            }}
          >
            <View style={styles.contentItemLeft}>
              <View style={styles.contentItemImage}>
                <Image
                  source={require("@/assets/images/chat/request_money.png")}
                />
              </View>
              <View>
                <Text style={styles.contentItemTitle}>Request Money</Text>
                <Text style={styles.contentItemId}>
                  Send pay request for money
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  body: {},
  message: {
    width: "80%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
  },
  sentMsg: {
    borderBottomRightRadius: 16,
    backgroundColor: "#F5F5F5",
    alignSelf: "flex-start",
  },
  receivedMsg: {
    borderBottomLeftRadius: 16,
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    alignSelf: "flex-end",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#26323833",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 8,
    height: 48,
    width: "80%",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
  symbol: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  symbolText: {
    fontSize: 20,
    color: "#fff",
  },
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    padding: 16,
    marginVertical: 20,
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemImage: {
    marginRight: 16,
    padding: 12,
    backgroundColor: "#27AE6033",
    borderRadius: 100,
  },
  contentItemTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.secondary,
  },
  contentItemId: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textColor,
  },
});

export default DetailsScreen;
