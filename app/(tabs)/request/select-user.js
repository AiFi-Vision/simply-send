import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Text from "@/elements/Text";
import TextInput from "@/elements/TextInput";
import ContainerView from "@/components/ContainerView";
import UserCard from "@/components/UserCard"; // Import UserCard component
import { COLORS } from "@/styles/colors";

const RequestSelectUserScreen = () => {
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigation();

  const totalUsers = [
    {
      name: "Wade Warren",
      content: "account ending in 9044",
      currencyCode: "GBP",
    },
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
    {
      name: "Brooklyn Simmons",
      content: "account ending in 9044",
      avatar: require(`@/assets/images/users/user_3.png`),
      currencyCode: "USD",
    },
    {
      name: "Jenny Wilson",
      content: "account ending in 9044",
      avatar: require(`@/assets/images/users/user_4.png`),
      currencyCode: "USD",
    },
  ];

  const [users, setUsers] = useState(totalUsers || []);

  const handleSearch = (word) => {
    setUsers(totalUsers.filter((item) => item.name.includes(word)));
    setKeyword(word);
  };

  const handlePress = (user) => {
    navigation.push("select-amount", { user });
  };

  return (
    <ContainerView
      title="From whom are you requesting money?"
      prev="Request Money"
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
        <Text style={styles.contactTitle}>Your Contact</Text>
        {users.length ? (
          users.map((item, index) => (
            <UserCard
              key={index}
              user={item}
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
    marginTop: 30,
  },
  contactTitle: {
    marginVertical: 20,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "400",
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
});

export default RequestSelectUserScreen;
