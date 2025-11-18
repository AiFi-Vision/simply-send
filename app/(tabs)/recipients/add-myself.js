import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import { Text, TextInput, Button, Modal } from "@/elements";
import ContainerView from "@/components/ContainerView";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";
import { CURRENCIES, COUNTRIES } from "@/data";

const RecipientAddMySelfScreen = () => {
  const navigation = useNavigation();
  const [isACHVisible, setIsACHVisible] = useState(false);
  const [isAcountTypeVisible, setIsAcountTypeVisible] = useState(false);
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isCountryVisible, setIsCountryVisible] = useState(false);
  const [keyword, setKeyword] = useState("");

  const setIsCurrencyHide = () => {
    setIsCurrencyVisible(false);
    setKeyword("");
  };

  const setIsCountryHide = () => {
    setIsCountryVisible(false);
    setKeyword("");
  };

  const [info, setInfo] = useState({
    currency: null,
    name: "",
    ACH: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "",
    country: null,
    city: "",
    address: "",
    postCode: "",
  });

  const onChangeHandle = (e, target) => {
    setInfo({ ...info, [target]: e });
  };

  const RadioButton = ({ image, label, selected, onPress }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={styles.radioBody}>
        <Image source={image} />
        <Text style={styles.radioLabel}>{label}</Text>
      </View>
      <View
        style={[
          styles.outerCircle,
          selected && { borderColor: COLORS.secondary },
        ]}
      >
        {selected && <View style={styles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ContainerView
      prev="Myself"
      title="Enter your account details"
      footer={
        <View style={styles.footer}>
          <Button
            title="Confirm"
            disable={
              !(
                info.currency &&
                info.ACH &&
                info.name &&
                info.routingNumber &&
                info.accountNumber &&
                info.accountType
              )
            }
            handle={() => navigation.push("myself-details", { info })}
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

        <Text style={[globalStyles.h3, { marginTop: 16 }]}>Bank details</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setIsACHVisible(true)}
        >
          <TextInput
            placeholder="ACH"
            style={styles.input}
            value={info.ACH}
            editable={false}
          />
          <ChevronDown size={18} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Full name of account holder"
            style={styles.input}
            value={info.name}
            onChangeText={(e) => onChangeHandle(e, "name")}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="ACH routing number"
            style={styles.input}
            value={info.routingNumber}
            onChangeText={(e) => onChangeHandle(e, "routingNumber")}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Account number"
            style={styles.input}
            value={info.accountNumber}
            onChangeText={(e) => onChangeHandle(e, "accountNumber")}
          />
        </View>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setIsAcountTypeVisible(true)}
        >
          <TextInput
            placeholder="Account type"
            style={styles.input}
            value={info.accountType}
            editable={false}
          />
          <ChevronDown size={18} color={"#000"} />
        </TouchableOpacity>
        <Text style={[globalStyles.h3, { marginTop: 16 }]}>
          Recipient details
        </Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setIsCountryVisible(true)}
        >
          <TextInput
            placeholder="Country"
            style={styles.input}
            value={info.country?.name}
            editable={false}
          />
          <ChevronDown size={18} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="City"
            style={styles.input}
            value={info.city}
            onChangeText={(e) => onChangeHandle(e, "city")}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Address"
            style={styles.input}
            value={info.address}
            onChangeText={(e) => onChangeHandle(e, "address")}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="PostCode"
            style={styles.input}
            value={info.postCode}
            onChangeText={(e) => onChangeHandle(e, "postCode")}
          />
        </View>
      </View>
      <Modal visible={isACHVisible} setVisible={setIsACHVisible}>
        <RadioButton
          label="ACH"
          image={require("@/assets/images/recipients/ACH.png")}
          selected={info.ACH === "ACH"}
          onPress={() => onChangeHandle("ACH", "ACH")}
        />
        <RadioButton
          label="Wire"
          image={require("@/assets/images/recipients/Wire.png")}
          selected={info.ACH === "Wire"}
          onPress={() => onChangeHandle("Wire", "ACH")}
        />
        <RadioButton
          label="Swift"
          image={require("@/assets/images/recipients/Swift.png")}
          selected={info.ACH === "Swift"}
          onPress={() => onChangeHandle("Swift", "ACH")}
        />
      </Modal>
      <Modal visible={isAcountTypeVisible} setVisible={setIsAcountTypeVisible}>
        <RadioButton
          label="Checking"
          selected={info.accountType === "Checking"}
          onPress={() => onChangeHandle("Checking", "accountType")}
        />
        <RadioButton
          label="Savings"
          selected={info.accountType === "Savings"}
          onPress={() => onChangeHandle("Savings", "accountType")}
        />
      </Modal>
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
      <Modal visible={isCountryVisible} setVisible={setIsCountryHide}>
        <View style={styles.inputBox}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            placeholder="Search country"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <Text style={globalStyles.h3}>All Countries</Text>
        {COUNTRIES.length &&
          COUNTRIES.filter((item) => item.name.includes(keyword)).map(
            (item, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() => {
                  onChangeHandle(item, "country");
                  setIsCountryHide();
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

export default RecipientAddMySelfScreen;
