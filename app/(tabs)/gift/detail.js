import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import { GIFTS } from "@/data";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const sections = [
  {
    title: "Description",
    content:
      "Convert your Crypto or Bitcoin (BTC) to Amazon.com Gift Cards & live on crypto! Use your Amazon.com Gift Card towards Clothes, Food, Books, Electronics, Music, and more. The Amazon.com website is the place to find and discover almost anything you want to buy on...",
  },
  {
    title: "How to Redeem",
    content:
      "1. Go to Amazon.com\n2. Enter your gift card code at checkout\n3. Enjoy your purchase!",
  },
  {
    title: "Terms & Conditions",
    content:
      "Gift cards are non-refundable and can only be used on Amazon.com. Subject to availability.",
  },
];

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

const ReviewCard = ({ item }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image source={item?.avatar} style={styles.reviewAvatar} />
      <View>
        <Text style={styles.reviewName}>{item.name}</Text>
        <StarRating rating={item.rate} />
      </View>
    </View>
    <Text style={styles.reviewContent}>{item.content}</Text>
  </View>
);

const StarRating = ({ rating, size = 18, color = "#F7871B" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={size} color={color} />
      ))}
      {hasHalfStar && <Ionicons name="star-half" size={size} color={color} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={size}
          color={color}
        />
      ))}
    </View>
  );
};

const GiftDetailScreen = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { item } = router.params;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState("5");
  const [reviews, setReviews] = useState([
    {
      name: "James Duran",
      avatar: require("@/assets/images/users/user_6.png"),
      rate: 4.5,
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco",
    },
    {
      name: "James Duran",
      avatar: require("@/assets/images/users/user_6.png"),
      rate: 4.5,
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco",
    },
    {
      name: "James Duran",
      avatar: require("@/assets/images/users/user_6.png"),
      rate: 4.5,
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco",
    },
    {
      name: "James Duran",
      avatar: require("@/assets/images/users/user_6.png"),
      rate: 4.5,
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco",
    },
    {
      name: "James Duran",
      avatar: require("@/assets/images/users/user_6.png"),
      rate: 4.5,
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco",
    },
    {
      name: "James Duran",
      avatar: require("@/assets/images/users/user_6.png"),
      rate: 4.5,
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco",
    },
  ]);

  const toggleSection = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color="#000"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false} // Hides vertical scrollbar
        showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar
      >
        {/* Main Content */}
        <View style={styles.body}>
          <Image source={item?.icon} style={styles.logo} />
          <View style={styles.card}>
            <Text style={[globalStyles.h1, { color: COLORS.textColor }]}>
              {item.title} Gift Card
            </Text>
            <View style={styles.rate}>
              <Image
                source={require("@/assets/images/extra/star_m.png")}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.rateText}>
                {item.rate}({reviews.length} reviews)
              </Text>
              <Text style={[styles.rateText, { marginHorizontal: 12 }]}>|</Text>
              <Text style={styles.rateText}>
                ${item.minPrice} - ${item.maxPrice}
              </Text>
            </View>
            <View style={styles.cardAction}>
              <TouchableOpacity onPress={() => {}} style={styles.cardButton}>
                <Image
                  source={require("@/assets/images/extra/radio-check.png")}
                />
                <Text style={[globalStyles.h5, { marginLeft: 6 }]}>
                  Instant, Private, Safe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.cardButton}>
                <Image
                  source={require("@/assets/images/extra/radio-check.png")}
                />
                <Text style={[globalStyles.h5, { marginLeft: 6 }]}>
                  Email Delivery
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                globalStyles.h2,
                { color: COLORS.textColor, marginVertical: 12 },
              ]}
            >
              General Info
            </Text>
            <Text style={styles.generalText}>
              Pay on Amazon with Crypto. Buy Amazon.com Gift Cards with Bitcoin,
              Lightning, Ethereum, Binance Pay, Tether, Dogecoin, Litecoin or
              Dash. Shop from Amazon.com's millions of items, delivered straight
              to your door.
            </Text>
            <View style={styles.generalCard}>
              <Image
                source={require("@/assets/images/extra/warning.png")}
                style={styles.generalImage}
              />
              <Text style={{ width: "85%" }}>
                This gift card is only redeemable on the e-commerce platform
              </Text>
            </View>
            <View style={styles.generalCard}>
              <Image
                source={require("@/assets/images/extra/warning.png")}
                style={styles.generalImage}
              />
              <Text style={{ width: "85%" }}>
                The redeeming Amazon.com account is required to have a second
                payment method added (Credit cards/Bank accounts) and a verified
                USA address.
              </Text>
            </View>
            <View style={styles.generalCard}>
              <Image
                source={require("@/assets/images/countries/US.png")}
                style={styles.generalImage}
              />
              <Text style={{ width: "85%" }}>
                This gift code may only work in USA
              </Text>
            </View>
          </View>
          <View style={styles.accordionList}>
            {sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <TouchableOpacity
                  onPress={() => toggleSection(index)}
                  style={styles.accordionHeader}
                >
                  <Text
                    style={[
                      globalStyles.h2,
                      { color: COLORS.textColor, marginVertical: 12 },
                    ]}
                  >
                    {section.title}
                  </Text>
                  {activeIndex === index ? (
                    <ChevronUp size={24} color="#000" />
                  ) : (
                    <ChevronDown size={24} color="#000" />
                  )}
                </TouchableOpacity>
                {activeIndex === index && (
                  <View style={styles.accordionContent}>
                    <Text style={styles.accordionBody}>{section.content}</Text>
                    {index === 0 && (
                      <Text style={styles.readMore}>Read more</Text>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={styles.review}>
            <Text
              style={[
                globalStyles.h2,
                { color: COLORS.textColor, marginVertical: 12 },
              ]}
            >
              Reviews ({reviews.length})
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.productsContent}>
                {reviews.map((item, index) => (
                  <ReviewCard key={index} item={item} />
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={{ backgroundColor: COLORS.white }}>
            <View style={styles.products}>
              <Text
                style={[
                  globalStyles.h2,
                  { color: COLORS.textColor, marginVertical: 12 },
                ]}
              >
                Similar Products
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.productsContent}>
                  {GIFTS.map((item, index) => (
                    <GiftCard key={index} item={item} />
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.footer}>
              <Button
                title="Buy Gift Card"
                style={{ paddingVertical: 18 }}
                handle={() => setIsVisible(true)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal visible={isVisible} setVisible={setIsVisible}>
        <Text
          style={[
            globalStyles.h2,
            { color: COLORS.textColor, marginVertical: 12 },
          ]}
        >
          Select Amount
        </Text>
        <View style={styles.modal}>
          {["5", "10", "15", "50", "100", "125", "150", "Custom"].map(
            (item, index) => (
              <Text
                style={[
                  styles.modalButton,
                  item === selectedKey && styles.activeButton,
                ]}
                onPress={() => setSelectedKey(item)}
                key={index}
              >
                {item !== "Custom" && "$"}
                {item}
              </Text>
            )
          )}
        </View>
        <Button title="Checkout" style={{ paddingVertical: 18 }} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    marginTop: 60,
    marginBottom: 16,
    marginLeft: 16,
    width: 32,
  },
  headerIcon: {
    padding: 6,
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
  body: {},
  footer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    padding: 20,
  },
  logo: {
    width: 256,
    height: 180,
    // resizeMode: "contain",
    borderRadius: 12,
    alignSelf: "center",
  },
  accordionList: {},
  section: {
    marginBottom: 4,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionContent: {
    marginTop: 8,
  },
  accordionBody: {
    fontSize: 14,
    color: "#333",
  },
  readMore: {
    marginTop: 8,
    color: "#008000",
    fontWeight: "600",
  },
  card: {
    marginTop: 60,
    marginBottom: 4,
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  rateText: {
    color: "#979797",
    fontSize: 13,
    fontWeight: "400",
  },
  cardAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  cardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 11,
    backgroundColor: "#DEF7E9",
    borderRadius: 8,
    width: "48%",
  },
  generalText: {
    fontWeight: "400",
    fontSize: 15,
    color: COLORS.textColor,
    lineHeight: 20,
    marginBottom: 12,
  },
  generalCard: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderColor: "#EDEDED",
    borderWidth: 1,
    marginVertical: 6,
  },
  generalImage: {
    borderRadius: 100,
    width: 24,
    height: 24,
    marginRight: 12,
  },
  review: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 4,
  },
  products: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 4,
  },
  productsContent: {
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
  reviewCard: {
    padding: 16,
    borderRadius: 8,
    borderColor: "#EDEDED",
    borderWidth: 1,
    width: 320,
    height: 220,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  reviewName: {
    fontWeight: "600",
    fontSize: 15,
    color: COLORS.textColor,
  },
  reviewContent: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textColor,
    marginTop: 20,
  },
  modal: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  modalButton: {
    paddingVertical: 18,
    backgroundColor: COLORS.white,
    borderColor: "#EDEDED",
    borderWidth: 2,
    borderRadius: 8,
    width: "23%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
  activeButton: {
    borderColor: COLORS.secondary,
    backgroundColor: "#DEF7E8",
  },
});

export default GiftDetailScreen;
