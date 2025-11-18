import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";
import Item from "@/components/RecipientItem";
import { formatAmount } from "@/helper";
import globalStyles from "@/styles/global";

const tabs = ["My requests", "Pending requests", "Cancelled"];
const SCREEN_WIDTH = Dimensions.get("window").width;

const SendButton = ({ type = "Send" }) => (
  <TouchableOpacity
    onPress={() => {}}
    style={[styles.button, type === "Cancel" && { borderColor: "red" }]}
  >
    {type === "Send" && (
      <Image
        source={require("@/assets/images/recipients/send.png")}
        style={styles.buttonImage}
      />
    )}
    <Text style={[styles.buttonText, type === "Cancel" && { color: "red" }]}>
      {type}
    </Text>
  </TouchableOpacity>
);

const RequestScreen = () => {
  const [myRequests, setMyRequests] = useState([
    {
      date: "4 September, 2020",
      entries: [
        {
          id: 1,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "IN",
          amount: 15,
        },
        {
          id: 2,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "OUT",
          amount: 15,
        },
        {
          id: 3,
          user: {
            name: "Jenny Wilson",
          },
          type: "IN",
          amount: 15,
        },
        {
          id: 4,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "IN",
          amount: 15,
        },
      ],
    },
  ]);
  const [pendingRequests, setPendingRequests] = useState([
    {
      date: "2 September, 2020",
      entries: [
        {
          id: 1,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "IN",
          amount: 15,
        },
        {
          id: 2,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "OUT",
          amount: 15,
        },
        {
          id: 3,
          user: {
            name: "Jenny Wilson",
          },
          type: "IN",
          amount: 15,
        },
        {
          id: 4,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "IN",
          amount: 15,
        },
      ],
    },
    {
      date: "16 September, 2020",
      entries: [
        {
          id: 1,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "IN",
          amount: 15,
        },
        {
          id: 2,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "OUT",
          amount: 15,
        },
        {
          id: 3,
          user: {
            name: "Jenny Wilson",
          },
          type: "IN",
          amount: 15,
        },
        {
          id: 4,
          user: {
            name: "Jenny Wilson",
            avatar: require("@/assets/images/users/user_6.png"),
          },
          type: "IN",
          amount: 15,
        },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: ((SCREEN_WIDTH - 20 * 2) / tabs.length) * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ContainerView
      prev="Requests"
      fullScreenMode
      scrollViewHidden={true}
      footer={
        <View>
          {activeTab === 2 ? (
            <></>
          ) : activeTab === 1 ? (
            <View>
              <Text style={styles.total}>
                Total Amount:{" "}
                <Text style={{ color: COLORS.secondary }}>
                  $
                  {pendingRequests.reduce(
                    (arr, cur) =>
                      (arr += cur.entries.reduce(
                        (ar, cr) =>
                          (ar += cr.type === "IN" ? cr.amount : -cr.amount),
                        0
                      )),
                    0
                  )}
                </Text>
              </Text>
              <Button title="Send all payment" style={{ margin: 20 }} />
            </View>
          ) : (
            <Button
              title="Cancel all requests"
              style={{ margin: 20, backgroundColor: "#FB3640" }}
            />
          )}
        </View>
      }
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
                width: (SCREEN_WIDTH - 20 * 2) / tabs.length,
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false} // Hides vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar
        >
          {activeTab === 2 ? (
            <View style={styles.body}></View>
          ) : activeTab === 1 ? (
            <View style={styles.body}>
              {pendingRequests.length &&
                pendingRequests.map((request, index) => (
                  <View key={index} style={{ marginTop: 12 }}>
                    <Text style={[globalStyles.h2, { marginBottom: 12 }]}>
                      {request.date}
                    </Text>
                    {request.entries.length &&
                      request.entries.map((item, index) => (
                        <Item
                          key={index}
                          user={{
                            ...item.user,
                            content: `${
                              item.type === "IN" ? "" : "-"
                            }$${formatAmount(item.amount, 2)}`,
                          }}
                          isBorder={false}
                          right={<SendButton type="Send" />}
                          style={{ paddingVertical: 12 }}
                        />
                      ))}
                  </View>
                ))}
            </View>
          ) : (
            <View style={styles.body}>
              {myRequests.length &&
                myRequests.map((request, index) => (
                  <View key={index} style={{ marginTop: 12 }}>
                    <Text style={[globalStyles.h2, { marginBottom: 12 }]}>
                      {request.date}
                    </Text>
                    {request.entries.length &&
                      request.entries.map((item, index) => (
                        <Item
                          key={index}
                          user={{
                            ...item.user,
                            content: `${
                              item.type === "IN" ? "" : "-"
                            }$${formatAmount(item.amount, 2)}`,
                          }}
                          isBorder={false}
                          right={<SendButton type="Cancel" />}
                          style={{ paddingVertical: 12 }}
                        />
                      ))}
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  tabContainer: {
    // flexDirection: "row",
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
    justifyContent: "center",
  },
  tab: {
    textAlign: "center",
    width: (SCREEN_WIDTH - 20 * 2) / tabs.length,
    paddingVertical: 12,
  },
  tabText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    color: "#444",
    fontWeight: "400",
  },
  activeTab: {
    fontWeight: "600",
    color: "#000",
  },
  indicator: {
    height: 3,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 0,
    left: 0,
    marginHorizontal: 20,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
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
  total: {
    margin: 20,
    marginBottom: 0,
    paddingVertical: 14,
    textAlign: "center",
    backgroundColor: "#F2F3F3",
    borderRadius: 8,
    fontSize: 18,
  },
});

export default RequestScreen;
