import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import { Text, TextInput, Button, Modal } from "@/elements";
import ContainerView from "@/components/ContainerView";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";
import { CURRENCIES, BANKS } from "@/data";

const RecipientBusinessScreen = () => {
  const navigation = useNavigation();
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isBankVisible, setIsBankVisible] = useState(false);
  const [keyword, setKeyword] = useState("");

  const setIsCurrencyHide = () => {
    setIsCurrencyVisible(false);
    setKeyword("");
  };

  const setIsBankHide = () => {
    setIsBankVisible(false);
    setKeyword("");
  };

  const [info, setInfo] = useState({
    currency: null,
    name: "",
    email: "",
    accountNumber: "",
    bank: null,
  });

  const onChangeHandle = (e, target) => {
    setInfo({ ...info, [target]: e });
  };

  return (
    <ContainerView
      prev="Someone Business/ Organisation"
      title="Enter Business/ Organisation details"
      footer={
        <View style={styles.footer}>
          <Button
            title="Confirm"
            disable={
              !(
                info.currency &&
                info.bank &&
                info.email &&
                info.name &&
                info.accountNumber
              )
            }
            handle={() => navigation.push("someone-details", { info })}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setIsCurrencyVisible(true)}
        >
          {info.currency && (
            <Image
              source={info.currency?.icon}
              style={{ width: 30, height: 30 }}
            />
          )}
          <TextInput
            placeholder="Currency"
            style={styles.input}
            value={info.currency?.label}
            editable={false}
          />
          <ChevronDown size={18} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            value={info.email}
            onChangeText={(e) => onChangeHandle(e, "email")}
          />
        </View>

        <Text style={[globalStyles.h3, { marginTop: 16 }]}>Bank details</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Name of the busiess/organisation"
            style={styles.input}
            value={info.name}
            onChangeText={(e) => onChangeHandle(e, "name")}
          />
        </View>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setIsBankVisible(true)}
        >
          {info.bank && (
            <Image source={info.bank?.icon} style={{ width: 30, height: 30 }} />
          )}
          <TextInput
            placeholder="Bank Name"
            style={styles.input}
            value={info.bank?.name}
            editable={false}
          />
          <ChevronDown size={18} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Account number"
            style={styles.input}
            value={info.accountNumber}
            onChangeText={(e) => onChangeHandle(e, "accountNumber")}
          />
        </View>
      </View>
      <Modal visible={isCurrencyVisible} setVisible={setIsCurrencyHide}>
        <View style={styles.inputBox}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Search currency"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <Text style={globalStyles.h3}>All Currencies</Text>
        {CURRENCIES.length &&
          CURRENCIES.filter((item) => item.label.includes(keyword)).map(
            (item, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() => {
                  onChangeHandle(item, "currency");
                  setIsCurrencyHide();
                }}
              >
                <Image source={item.icon} style={styles.cardImage} />
                <Text
                  style={[
                    globalStyles.h3,
                    { color: COLORS.textColor, marginRight: 20 },
                  ]}
                >
                  {item.label}
                </Text>
                <Text style={[globalStyles.h4, { color: "#888" }]}>
                  {item.content}
                </Text>
              </TouchableOpacity>
            )
          )}
      </Modal>
      <Modal visible={isBankVisible} setVisible={setIsBankVisible}>
        <View style={styles.inputBox}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Search recipient bank"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <Text style={globalStyles.h3}>Bank names</Text>
        {BANKS.length &&
          BANKS.filter((item) => item.name.includes(keyword)).map(
            (item, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() => {
                  onChangeHandle(item, "bank");
                  setIsBankHide();
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
      </Modal>
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
    paddingHorizontal: 18,
    height: 66,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  footer: {
    margin: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 24,
    marginVertical: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#888", // Green border
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 100,
    backgroundColor: COLORS.secondary, // Filled green dot
  },
  radioBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 24,
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

export default RecipientBusinessScreen;
