import React, { useState } from "react";
import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { TextInput, Button, Switch, Text } from "@/elements";

const AddCardDetailScreen = () => {
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    number: "",
    name: "",
    expire: "",
    cvv: "",
  });
  const [onSwitch, setOnSwitch] = useState(true);

  const onChangeHandle = (value, key) => {
    let formattedValue;
    if (key === "number") formattedValue = formatCardNumber(value);
    else if (key === "expire") formattedValue = formatDate(value);
    else formattedValue = value;
    setInfo({ ...info, [key]: formattedValue });
  };

  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, "");

    // Group into 4-digit chunks
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";

    return formatted;
  };

  const formatDate = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, "");

    // Limit to max 4 digits (MMDD)
    const sliced = cleaned.slice(0, 4);

    if (sliced.length < 3) {
      return sliced;
    }

    return `${sliced.slice(0, 2)}/${sliced.slice(2)}`;
  };

  return (
    <ContainerView
      prev="Add new card"
      title="Add new card"
      content="Card must be in your name and billing address should match your registration address."
      footer={
        <Button
          title="Add card"
          handle={() => navigation.dispatch(StackActions.popToTop())}
          style={{ margin: 20 }}
          disable={!(info.number && info.name && info.expire && info.cvv)}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Image source={require("@/assets/images/account/card-number.png")} />
          <TextInput
            placeholder="Card Number"
            style={styles.input}
            value={info.number}
            keyboardType="numeric"
            maxLength={19}
            onChangeText={(e) => onChangeHandle(e, "number")}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Card Holder Name"
            style={styles.input}
            value={info.name}
            onChangeText={(e) => onChangeHandle(e, "name")}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.inputBox, { width: "45%" }]}>
            <TextInput
              placeholder="Expire"
              style={styles.input}
              value={info.expire}
              keyboardType="numeric"
              maxLength={5}
              onChangeText={(e) => onChangeHandle(e, "expire")}
            />
          </View>
          <View style={[styles.inputBox, { width: "45%" }]}>
            <Image source={require("@/assets/images/account/cvv.png")} />
            <TextInput
              placeholder="CVV"
              style={styles.input}
              value={info.cvv}
              secureTextEntry={true}
              onChangeText={(e) => onChangeHandle(e, "cvv")}
            />
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <Text style={{ marginRight: 20 }}>Save Card to be Used later</Text>
          <Switch
            value={onSwitch}
            onChange={setOnSwitch}
            width={45}
            height={25}
          />
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 66,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
  },
});

export default AddCardDetailScreen;
