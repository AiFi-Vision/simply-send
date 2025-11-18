import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextInput, Text } from "@/elements";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import Item from "@/components/RecipientItem";
import { currencyImages } from "@/helper";

const SendButton = (router) => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/send")}
      style={styles.button}
    >
      <Image
        source={require("@/assets/images/recipients/send.png")}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Send</Text>
    </TouchableOpacity>
  );
};

const RecipientsScreen = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const [me, setMe] = useState({
    name: "Wade Warren",
    content: "Bank of America",
    currencyCode: "USD",
  });

  const [recipients, setRecipients] = useState([
    {
      name: "Satish Ray",
      content: "account ending in 9044",
      avatar: require(`@/assets/images/users/user_1.png`),
      currencyCode: "USD",
    },
    {
      name: "Esther Howard",
      content: "account ending in 9044",
      avatar: require(`@/assets/images/users/user_2.png`),
      currencyCode: "XAF",
    },
    {
      name: "Albert Flores",
      content: "account ending in 9044",
      currencyCode: "XOF",
    },
  ]);

  const [contacts, setContacts] = useState([
    {
      name: "Wade Warren",
      content: "+1 972 883 8484",
    },
    {
      name: "Kathryn Murphy",
      content: "+1 972 883 8484",
    },
    {
      name: "Kristin Watson",
      content: "+1 972 883 8484",
    },
  ]);

  const [others, setOthers] = useState([
    {
      name: "Wade Warren",
      content: "+1 972 883 8484",
    },
    {
      name: "Kathryn Murphy",
      content: "+1 972 883 8484",
    },
    {
      name: "Kristin Watson",
      content: "+1 972 883 8484",
    },
    {
      name: "Kathryn Murphy",
      content: "+1 972 883 8484",
    },
    {
      name: "Kristin Watson",
      content: "+1 972 883 8484",
    },
  ]);

  return (
    <ContainerView
      prev={
        <View style={styles.prev}>
          <Text style={styles.prevText}>Recipients</Text>
        </View>
      }
      title="Recipients"
    >
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Name, email, phone"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <View style={styles.findBanner}>
          <Image
            source={require("@/assets/images/recipients/find.png")}
            style={{ width: 60, height: 60, marginRight: 20 }}
          />
          <View>
            <Text style={globalStyles.h4}>
              Send to friends on Simplisend in seconds
            </Text>
            <Text
              style={{
                color: COLORS.secondary,
                fontSize: 16,
                fontWeight: "500",
                paddingTop: 10,
              }}
              onPress={() => router.push("/(tabs)/recipients/search")}
            >
              Find Friends
            </Text>
          </View>
        </View>
        <View style={styles.rowMe}>
          <Text style={[globalStyles.h4, { fontWeight: 600 }]}>
            Your account
          </Text>
          <View style={styles.me}>
            <Item
              user={{ ...me, symbol: currencyImages[me.currencyCode] }}
              right={SendButton(router)}
            />
          </View>
        </View>
        <View style={styles.rowRecipients}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[globalStyles.h4, { fontWeight: 600 }]}>
              Your recipient
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/recipients/add")}
            >
              <Text style={[globalStyles.h4, { color: COLORS.secondary }]}>
                {" "}
                + Add new recipient
              </Text>
            </TouchableOpacity>
          </View>
          {recipients.length ? (
            recipients.map((item, index) => (
              <Item
                key={index}
                user={{ ...item, symbol: currencyImages[item.currencyCode] }}
                isBorder={false}
                right={SendButton(router)}
              />
            ))
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.rowContacts}>
          <Text style={[globalStyles.h4, { fontWeight: 600 }]}>Contacts</Text>
          {contacts.length ? (
            contacts.map((item, index) => (
              <Item
                key={index}
                user={{
                  ...item,
                  symbol: require("@/assets/images/recipients/symbol.png"),
                }}
                right={SendButton(router)}
              />
            ))
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.rowOthers}>
          <Text style={[globalStyles.h4, { fontWeight: 600 }]}>Others</Text>
          {others.length ? (
            others.map((item, index) => (
              <Item
                key={index}
                user={item}
                right={<Text style={styles.invite}>Invite</Text>}
              />
            ))
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 150,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 24,
    marginBottom: 25,
    height: 66,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 18,
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
  findBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.secondary,
    fontWeight: 500,
    fontSize: 14,
  },
  buttonImage: {
    width: 18,
    height: 18,
    marginRight: 10,
  },

  rowMe: {},
  rowRecipients: {
    marginTop: 16,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
  rowContacts: { marginTop: 16 },
  rowOthers: { marginTop: 16 },
  invite: {
    color: "#897EA0",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default RecipientsScreen;
