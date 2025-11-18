import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const tabs = ["Bank Account", "Cards"];
const SCREEN_WIDTH = Dimensions.get("window").width;

const maskCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, ""); // Remove non-digits
  const last4 = cleaned.slice(-4);
  return `**** **** **** ${last4}`;
};

const CreditCard = ({ info, navigation }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.cardContainer, { backgroundColor: info.color }]}>
          <Text style={{ fontSize: 25, color: "#FFF" }}>
            {maskCardNumber(info.number)}
          </Text>
          <Text style={{ fontSize: 18, color: "#FFF", marginBottom: 20 }}>
            {info.name.toUpperCase()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 6 }}>
              <Text style={{ fontSize: 8, color: "#FFF" }}>VALID</Text>
              <Text style={{ fontSize: 8, color: "#FFF" }}>THRU</Text>
            </View>
            <Text style={{ fontSize: 16, color: "#FFF" }}>{info.expire}</Text>
          </View>
          <Text
            style={{ position: "absolute", right: 32, top: 24, color: "#FFF" }}
          >
            Debit
          </Text>
          <Image
            source={require("@/assets/images/account/card-logo.png")}
            style={{ position: "absolute", right: 25, bottom: 24 }}
          />
        </View>
        <View
          style={{ flexDirection: "row", padding: 24, gap: 18, paddingTop: 34 }}
        >
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/account/block.png")}
              style={{ width: 60, height: 60, marginBottom: 12 }}
            />
            <Text style={{ textAlign: "center" }}>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/account/hide.png")}
              style={{ width: 60, height: 60, marginBottom: 12 }}
            />
            <Text style={{ textAlign: "center" }}>Hide</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push("edit-card", { info })}
          >
            <Image
              source={require("@/assets/images/account/delete.png")}
              style={{ width: 60, height: 60, marginBottom: 12 }}
            />
            <Text style={{ textAlign: "center", color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const ManageAccountScreen = () => {
  const navigation = useNavigation();
  const [accounts, setAccoutns] = useState([]);
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Jenny Wilson",
      number: "1234 1232 1231 0329",
      expire: "03/27",
      color: "#04009A",
      cvv: "123",
    },
    {
      id: 1,
      name: "Jenny Wilson",
      number: "1234 1232 1231 7843",
      expire: "06/28",
      color: "#3258F8",
      cvv: "123",
    },
    {
      id: 1,
      name: "Jenny Wilson",
      number: "1234 1232 1231 5319",
      expire: "05/24",
      color: "#27AE60",
      cvv: "123",
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: (SCREEN_WIDTH / tabs.length - 24) * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ContainerView
      prev="Manage Account"
      footer={
        <Button
          title={activeTab ? "Add card" : "Add bank account"}
          style={{ margin: 20 }}
          handle={() =>
            navigation.push(`${activeTab ? "add-card" : "connect-bank"}`)
          }
          type={activeTab && cards.length ? "outline" : "fullfill"}
        />
      }
      fullScreenMode
    >
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: -5,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#fff", // same as tab bar
            zIndex: 2,
          }}
        />
        <View style={styles.tabContainer}>
          <View style={styles.tabBody}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => handleTabPress(index)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTab,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Animated.View
            style={[
              styles.indicator,
              {
                width: SCREEN_WIDTH / tabs.length - 24,
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
        {activeTab ? (
          <View style={styles.body}>
            {cards.length ? (
              <View>
                {cards.map((item, index) => (
                  <CreditCard key={index} info={item} navigation={navigation} />
                ))}
              </View>
            ) : (
              <View>
                <Image
                  source={require("@/assets/images/account/empty-card.png")}
                  style={{ alignSelf: "center" }}
                />
                <Text
                  style={[
                    globalStyles.h1,
                    { textAlign: "center", marginVertical: 20 },
                  ]}
                >
                  No card added yet
                </Text>
                <Text style={[globalStyles.h4, { textAlign: "center" }]}>
                  Once you’ve added your card, you will see them here. Add card
                  to get started
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.body}>
            {accounts.length ? (
              <View></View>
            ) : (
              <View>
                <Image
                  source={require("@/assets/images/account/add-bank.png")}
                  style={{ alignSelf: "center" }}
                />
                <Text
                  style={[
                    globalStyles.h1,
                    { textAlign: "center", marginVertical: 20 },
                  ]}
                >
                  Add Bank account
                </Text>
                <Text
                  style={[
                    globalStyles.h4,
                    { textAlign: "center", marginHorizontal: 24 },
                  ]}
                >
                  Once you’ve added your bank account, you will see them here.
                  Add account to get started
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // iOS shadow (only bottom)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
    zIndex: 1,
  },
  tabBody: {
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
    paddingVertical: 12,
  },
  tabText: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
    fontWeight: "400",
  },
  activeTab: {
    fontWeight: "700",
    color: "#000",
  },
  indicator: {
    height: 3,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 0,
    left: 0,
    marginHorizontal: 24,
  },
  body: {
    marginTop: 12,
  },
  cardContainer: {
    height: 145,
    width: SCREEN_WIDTH - 24 * 2,
    borderRadius: 16,
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 24,
  },
});

export default ManageAccountScreen;
