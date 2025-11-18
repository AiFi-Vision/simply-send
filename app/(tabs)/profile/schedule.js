import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";
import UserCard from "@/components/UserCard";

const tabs = ["Scheduled transfers", "Cancelled"];
const SCREEN_WIDTH = Dimensions.get("window").width;

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: "Jenny Wilson",
      time: "07:20",
      date: "04 January 2023",
      isCanceled: false,
    },
    {
      id: 2,
      name: "Yara Khalil",
      time: "05:20",
      date: "04 January 2023",
      avatar: require("@/assets/images/users/user_6.png"),
      isCanceled: false,
    },
    {
      id: 3,
      name: "Ester Howard",
      time: "12:20",
      date: "04 January 2023",
      isCanceled: false,
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
      prev="Scheduled Transfers"
      fullScreenMode
      scrollViewHidden={true}
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
        <ScrollView
          showsVerticalScrollIndicator={false} // Hides vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar
        >
          <View style={styles.body}>
            {schedules.length &&
              schedules
                .filter((it) => it.isCanceled === !!activeTab)
                .map((item, index) => (
                  <View key={index} style={styles.card}>
                    <UserCard
                      user={{
                        name: item.time,
                        content: "Scheduled time",
                        avatar: require("@/assets/images/schedule/time.png"),
                      }}
                    />
                    <UserCard
                      user={{
                        name: item.date,
                        content: "Scheduled date",
                        avatar: require("@/assets/images/schedule/date.png"),
                      }}
                    />
                    <UserCard
                      user={{
                        name: item.name,
                        content: "Scheduled transfer to",
                        avatar: item.avatar,
                      }}
                    />
                    {!activeTab && (
                      <Button
                        title="Cancel"
                        style={{ backgroundColor: "#E44E52" }}
                        handle={() =>
                          setSchedules(
                            schedules.map((sch) =>
                              sch.id === item.id
                                ? { ...item, isCanceled: true }
                                : sch
                            )
                          )
                        }
                      />
                    )}
                  </View>
                ))}
          </View>
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
    fontWeight: "600",
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
    flex: 1,
    paddingTop: 20,
    // backgroundColor: "#f0f0f0",
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    // iOS shadow (only bottom)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  },
});

export default ScheduleScreen;
