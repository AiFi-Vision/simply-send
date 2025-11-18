import React, { useState } from "react";
import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text, Switch, Modal, TextInput } from "@/elements";
import { COLORS } from "@/styles/colors";
import { CURRENCIES } from "@/data";
import globalStyles from "@/styles/global";

const NotificationScreen = () => {
  const [switchWhatsApp, setSwitchWhatsApp] = useState(true);
  const [switchAnnouncement, setSwitchAnnouncement] = useState(true);
  const [switchPromotion, setSwitchPromotion] = useState(true);
  const [switchExchange, setSwitchWExchange] = useState(true);
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [currencies, setCurrencies] = useState([CURRENCIES[0], CURRENCIES[1]]);
  const [keyword, setKeyword] = useState("");

  const setIsCurrencyHide = () => {
    setIsCurrencyVisible(false);
    setKeyword("");
  };

  return (
    <ContainerView
      prev="Notifications"
      footer={
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Important</Text>
          <Text>This may take up to 24 hours to update</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.paragraph}>
          <Text style={styles.title}>Transfer Updates</Text>
          <View style={styles.form}>
            <Text style={styles.formTitle}>WhatsApp</Text>
            <Switch
              value={switchWhatsApp}
              onChange={setSwitchWhatsApp}
              width={45}
              height={25}
            />
          </View>
          <Text style={styles.text}>
            Notifications will be sent to the mobile number you have registered
            with.
          </Text>
          <Text style={styles.text}>
            If you want to change your mobile number, you can edit your details
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>General Notification</Text>
          <Text style={[styles.text, { marginBottom: 16 }]}>
            Get notifications about new receive methods plus promo codes for
            discounts
          </Text>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Announcements</Text>
            <Switch
              value={switchAnnouncement}
              onChange={setSwitchAnnouncement}
              width={45}
              height={25}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Promotions</Text>
            <Switch
              value={switchPromotion}
              onChange={setSwitchPromotion}
              width={45}
              height={25}
            />
          </View>
        </View>
        <View
          style={[
            styles.paragraph,
            { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
          ]}
        >
          <Text style={styles.title}>Exchange rates updates</Text>
          <Text style={styles.text}>
            Get daily updates about the latest exchange rates
          </Text>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Exchange rates</Text>
            <Switch
              value={switchExchange}
              onChange={setSwitchWExchange}
              width={45}
              height={25}
            />
          </View>
        </View>
        {switchExchange &&
          currencies.map((item, index) => (
            <View key={index} style={styles.currency}>
              <View style={styles.currencyLeft}>
                <Image source={item.icon} style={styles.currencyImage} />
                <Text style={styles.currencyText}>
                  {item.label} {item.content}
                </Text>
              </View>
              <FontAwesome
                name="trash"
                size={16}
                color={"#fff"}
                style={styles.currencyDelete}
                onPress={() =>
                  setCurrencies(
                    currencies.filter((it) => it.value !== item.value)
                  )
                }
              />
            </View>
          ))}
        {switchExchange && (
          <Text
            style={styles.addButton}
            onPress={() => setIsCurrencyVisible(true)}
          >
            Add
          </Text>
        )}
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
                  setCurrencies([...currencies, item]);
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
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  footer: {
    borderLeftWidth: 10,
    borderColor: COLORS.yellow,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#FFF6E0",
    margin: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  footerTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: COLORS.textColor,
    marginBottom: 4,
  },
  paragraph: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    color: COLORS.textColor,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  form: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formTitle: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
  },
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
  currency: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  currencyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyImage: {
    width: 35,
    height: 35,
    marginRight: 12,
  },
  currencyText: {
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.textColor,
  },
  currencyDelete: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: "red",
  },
  addButton: {
    color: COLORS.secondary,
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 12,
  },
});

export default NotificationScreen;
