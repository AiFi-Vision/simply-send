import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Text } from "@/elements";
import ContainerView from "@/components/ContainerView";
import Item from "@/components/RecipientItem";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import { currencyImages } from "@/helper";

const SendButton = () => (
  <TouchableOpacity onPress={() => {}} style={styles.button}>
    <Image
      source={require("@/assets/images/recipients/send.png")}
      style={styles.buttonImage}
    />
    <Text style={styles.buttonText}>Send</Text>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigation();

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

  return (
    <ContainerView
      prev={
        <View style={styles.prev}>
          <Text style={styles.prevText}>Search recipients</Text>
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
            onChangeText={setKeyword}
          />
        </View>
        {keyword ? (
          <View style={styles.rowRecipients}>
            <Text style={globalStyles.h2}>Existing Contacts</Text>
            {recipients.length ? (
              recipients
                .filter((item) => item.name.includes(keyword))
                .map((item, index) => (
                  <Item
                    key={index}
                    user={{
                      ...item,
                      symbol: currencyImages[item.currencyCode],
                    }}
                    isBorder={false}
                    right={SendButton()}
                  />
                ))
            ) : (
              <View></View>
            )}
          </View>
        ) : (
          <View style={styles.empty}>
            <Image
              source={require("@/assets/images/recipients/search.png")}
              style={{ marginVertical: 20 }}
            />
            <Text style={globalStyles.h4}>Find your contacts</Text>
          </View>
        )}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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

  rowRecipients: {
    marginTop: 16,
  },
  empty: {
    alignItems: "center",
  },
});

export default SearchScreen;
