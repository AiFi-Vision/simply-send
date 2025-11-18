import React, { useState } from "react";
import ContainerView from "@/components/ContainerView";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ChevronDown } from "lucide-react-native";
import { Text, Modal, TextInput } from "@/elements";
import { COLORS } from "@/styles/colors";
import { COUNTRIES, GIFTS, CATEGORIES } from "@/data";
import globalStyles from "@/styles/global";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const GiftCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.giftCard}
      onPress={() => navigation.push("detail", { item })}
    >
      {item.badge && (
        <Text
          style={[
            styles.badge,
            {
              backgroundColor:
                item.badge === "Featured"
                  ? "#FFF1CC"
                  : item.badge === "New"
                  ? "#FFCCCC"
                  : "#CBE9FD",
            },
          ]}
        >
          {item.badge}
        </Text>
      )}
      <Image source={item.icon} style={styles.cardImage} />
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item?.title}</Text>
        <View style={styles.cardRate}>
          <Text style={styles.cardRateText}>{item?.rate}</Text>
          <Image
            source={require("@/assets/images/extra/star.png")}
            style={{ width: 14, height: 14 }}
          />
        </View>
      </View>
      <Text style={styles.price}>
        ${item?.minPrice} - ${item?.maxPrice}
      </Text>
    </TouchableOpacity>
  );
};

const GiftScreen = () => {
  const [isCountryVisible, setIsCountryVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [sendingCountry, setSendingCountry] = useState(COUNTRIES[0]);
  const [activeTab, setActiveTab] = useState("All Gift Cards");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const setIsCountryHide = () => {
    setIsCountryVisible(false);
    setKeyword("");
  };

  return (
    <ContainerView
      prev="Gift Cards"
      background={
        <Image
          source={require("@/assets/images/gift/gift_bg.png")}
          style={styles.bgImage}
        />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setIsCountryVisible(true)}
        >
          <View style={styles.headerContent}>
            <Image
              source={sendingCountry?.icon}
              style={{ width: 38, height: 38, marginRight: 12 }}
            />
            <View>
              <Text style={[globalStyles.h5, { color: "#979797" }]}>
                Where are you sending to?
              </Text>
              <Text style={styles.headerText}>
                {sendingCountry?.name} ({sendingCountry?.value})
              </Text>
            </View>
          </View>
          <ChevronDown size={24} color="#888" />
        </TouchableOpacity>
        <View style={styles.filter}>
          <View style={styles.filterButton}>
            <Image source={require("@/assets/images/extra/filter.png")} />
            <Text style={[globalStyles.h3, { marginLeft: 12 }]}>
              More Filters
            </Text>
          </View>
          <View style={styles.tabBar}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {["All Gift Cards", "Top Products", "Apparel", "Automobiles"].map(
                (tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tabButton,
                      activeTab === tab && styles.activeTab, // Apply activeTab style for the selected tab
                    ]}
                    onPress={() => handleTabPress(tab)}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab && styles.activeText, // Change text color for the active tab
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </View>
        </View>
        {activeTab === "All Gift Cards" ? (
          <View style={styles.body}>
            <Text style={styles.category}>All Gift Cards</Text>
            <View style={styles.content}>
              {GIFTS.map((item, index) => (
                <GiftCard key={index} item={item} />
              ))}
            </View>
          </View>
        ) : activeTab === "Top Products" ? (
          <View style={styles.body}>
            {CATEGORIES.map((category, index) => (
              <View key={index}>
                <Text style={styles.category}>{category.title}</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.contentCategory}>
                    {GIFTS.filter(
                      (item) => item.isTop && item.category === category.id
                    ).map((item, index) => (
                      <GiftCard key={index} item={item} />
                    ))}
                  </View>
                </ScrollView>
              </View>
            ))}
          </View>
        ) : activeTab === "Apparel" ? (
          <View style={styles.body}>
            <Text style={styles.category}>Apparel</Text>
            <View style={styles.content}>
              {GIFTS.filter((item) => item.category === 5).map(
                (item, index) => (
                  <GiftCard key={index} item={item} />
                )
              )}
            </View>
          </View>
        ) : (
          <View style={styles.body}></View>
        )}
      </View>
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
                style={styles.modalCard}
                key={index}
                onPress={() => {
                  setSendingCountry(item);
                  setIsCountryHide();
                }}
              >
                <Image source={item.icon} style={styles.modalCardImage} />
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
  bgImage: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH / 375) * 197,
  },
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  filter: { marginTop: 20 },
  filterButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#000",
    paddingVertical: 12,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#DAF1E5", // Yellow background for active tab
  },
  tabText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#333",
  },
  activeText: {
    color: COLORS.secondary, // White text for active tab
  },
  body: {},
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  contentCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  giftCard: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: 175,
    height: 175,
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    zIndex: 1,
    fontSize: 9,
    fontWeight: "400",
    color: "#171E44",
  },
  cardImage: {
    width: "100%",
    height: 88,
  },
  cardHeader: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "600",
    fontFamily: 15,
    color: "#171E44",
  },
  cardRate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardRateText: {
    fontWeight: "500",
    fontFamily: 10,
    color: "#171E44",
    marginRight: 2,
  },
  price: {
    fontWeight: "400",
    fontSize: 13,
    color: "#565656",
  },
  category: {
    fontSize: 21,
    fontWeight: "600",
    color: "#171E44",
    marginVertical: 12,
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
  modalCard: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
  },
  modalCardImage: {
    width: 48,
    height: 48,
    marginRight: 20,
  },
});

export default GiftScreen;
