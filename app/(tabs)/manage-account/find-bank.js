import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TextInput } from "@/elements";
import ContainerView from "@/components/ContainerView";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";
import { BANKS } from "@/data";

const FindBankScreen = () => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");

  return (
    <ContainerView prev="Find my bank">
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Search"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>

        <Text style={globalStyles.h3}>Popular Banks</Text>
        {BANKS.length &&
          BANKS.filter((item) => item.name.includes(keyword)).map(
            (item, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() => {
                  navigation.push("plaid-bank");
                }}
              >
                <Image source={item.icon} style={styles.cardImage} />
                <Text
                  style={[
                    globalStyles.h3,
                    { color: COLORS.textColor, marginRight: 20 },
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={[globalStyles.h4, { color: "#888" }]}>
                  {item.content}
                </Text>
              </TouchableOpacity>
            )
          )}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 24,
    height: 66,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
  },
  cardImage: {
    width: 48,
    height: 48,
    marginRight: 20,
  },
});

export default FindBankScreen;
