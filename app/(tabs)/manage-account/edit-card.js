import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { TextInput, Button, Text, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const EditCardScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { info } = router.params;

  const [show, setShow] = useState(false);

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
      prev="Edit card details"
      title={`${info.name}'s card`}
      content="Following are details which you have entered."
      footer={
        <View>
          <Button
            title="Save card"
            handle={() => navigation.dispatch(StackActions.popToTop())}
            style={{ margin: 20 }}
          />
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{ marginBottom: 20 }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: "#E44E52",
                textAlign: "center",
              }}
            >
              Delete Card
            </Text>
          </TouchableOpacity>
        </View>
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
          <Image source={require("@/assets/images/account/edit.png")} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Card Holder Name"
            style={styles.input}
            value={info.name}
            onChangeText={(e) => onChangeHandle(e, "name")}
          />
          <Image source={require("@/assets/images/account/edit.png")} />
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
            <Image source={require("@/assets/images/account/edit.png")} />
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
            <Image source={require("@/assets/images/account/edit.png")} />
          </View>
        </View>
      </View>
      <Modal visible={show} setVisible={setShow} type="center">
        <Image
          source={require("@/assets/images/account/delete-card.png")}
          style={{ alignSelf: "center" }}
        />
        <Text
          style={[
            globalStyles.h1,
            { textAlign: "center", color: "#000", marginTop: 20 },
          ]}
        >
          Delete Card
        </Text>
        <Text style={styles.modalText}>
          Are you sure you want to delete this card?
        </Text>
        <View style={styles.modalButton}>
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={[styles.button, { borderColor: COLORS.secondary }]}
          >
            <Text style={[styles.buttonText, { color: COLORS.secondary }]}>
              No, Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.dispatch(StackActions.popToTop())}
            style={[
              styles.button,
              {
                borderColor: COLORS.secondary,
                backgroundColor: COLORS.secondary,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: COLORS.white }]}>
              Yes, delete
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.textColor,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  button: {
    width: "45%",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default EditCardScreen;
