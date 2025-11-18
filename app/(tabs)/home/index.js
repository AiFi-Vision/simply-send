import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Plus, ChevronRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store";
import TransactionCard from "@/components/TransactionCard";
import ExchangeRate from "@/components/ExchangeRate";
import { formatAmount } from "@/helper";
import { Text, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const [emoji, setEmoji] = useState("");

  const transactions = [
    {
      name: "Ronald Richards",
      type: "received",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "sent",
      date: "2025/04/17",
      amount: 500,
      currencyCode: "GBP",
    },
    {
      name: "Ronald Richards",
      type: "cancelled",
      date: "2025/04/18",
      amount: 500,
      currencyCode: "USD",
    },
  ];

  const handleEmoji = (type) => {
    setEmoji(type);
    setIsVisible(true);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(tabs)/notification")}
          >
            <Image
              source={require("@/assets/images/home/notification.png")}
              style={styles.notificationIcon}
            />
            <View style={styles.badge}></View>
          </TouchableOpacity>
          <View style={styles.headerRightBanch}>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => router.push("/(tabs)/quick-payment")}
            >
              <Image
                source={require("@/assets/images/extra/qrscan.png")}
                style={styles.qrIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push("/(tabs)/profile")}
            >
              {user.avatar ? (
                <Image source={user.avatar} style={{ width: 42, height: 42 }} />
              ) : (
                <Text style={styles.profileText}>{user.firstName[0]}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Andrew</Text>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceAmount}>0.00</Text>
            <Text style={styles.currencySymbol}>
              <Image
                source={require("@/assets/images/home/$.png")}
                style={styles.qrIcon}
              />
            </Text>
          </View>
          <Text style={styles.balanceLabel}>Balance</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/(tabs)/wallet/add")}
          >
            <Plus size={24} color={COLORS.primary} />
            <Image
              source={require("@/assets/images/currency/USD.png")}
              style={styles.flagIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Verification Card */}
      {!user.isVerified && (
        <View style={[styles.verificationCard, styles.sectionBox]}>
          <View style={styles.verificationCardLeft}>
            <Text style={styles.verificationTitle}>VERIFICATION</Text>
            <Text style={styles.verificationSubTitle}>Andrew's profile!</Text>
            <Text style={styles.verificationText}>
              We are required by law to verify your identity. This is a one time
              verification process. We keep your information safe, encrypted and
              never share it!
            </Text>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => router.push("/(tabs)/verification")}
            >
              <Text style={styles.verifyButtonText}>Verify My Identity</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verificationCardRight}>
            <Image source={require("@/assets/images/home/checklist.png")} />
          </View>
        </View>
      )}

      {/* Global accounts */}
      <View style={styles.recentTransactions}>
        <View style={styles.recentTransactionsText}>
          <Text style={styles.sectionTitle}>Global accounts</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.recentTransactionsTextRight}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.globalAccount}>
          <View style={styles.globalAccountCard}>
            <Image
              source={require("@/assets/images/currency/USD.png")}
              style={styles.globalAccountCardImage}
            />
            <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
              {formatAmount(0, 2)}
            </Text>
            <Text style={globalStyles.h5}>US Dollars</Text>
            <Text style={[globalStyles.h5, styles.globalAccountCurrency]}>
              USD
            </Text>
          </View>
          <View style={styles.globalAccountCard}>
            <Image
              source={require("@/assets/images/currency/XOF.png")}
              style={styles.globalAccountCardImage}
            />
            <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
              {formatAmount(800, 2)}
            </Text>
            <Text style={globalStyles.h5}>CFA Franc</Text>
            <Text style={[globalStyles.h5, styles.globalAccountCurrency]}>
              XOF
            </Text>
          </View>
        </View>
      </View>

      {/* Action Card */}
      <View style={styles.actionCard}>
        <TouchableOpacity
          style={styles.actionCardItem}
          onPress={() => router.push("/(tabs)/wallet")}
        >
          <Image
            source={require("@/assets/images/home/wallet.png")}
            style={styles.actoinCardItemImage}
          />
          <Text style={styles.actionCardItemTitle}>Fund Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCardItem}
          onPress={() => router.push("/(tabs)/withdraw")}
        >
          <Image
            source={require("@/assets/images/home/withdraw.png")}
            style={styles.actoinCardItemImage}
          />
          <Text style={styles.actionCardItemTitle}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCardItem}
          onPress={() => router.push("/(tabs)/chat")}
        >
          <Image
            source={require("@/assets/images/home/chat.png")}
            style={styles.actoinCardItemImage}
          />
          <Text style={styles.actionCardItemTitle}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCardItem}
          onPress={() => router.push("/(tabs)/manage-account")}
        >
          <Image
            source={require("@/assets/images/home/accounts.png")}
            style={styles.actoinCardItemImage}
          />
          <Text style={styles.actionCardItemTitle}>Accounts</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Send Money to</Text>
        <View style={styles.addNewSection}>
          <TouchableOpacity
            style={styles.addNewButton}
            onPress={() => router.push("/(tabs)/recipients/add")}
          >
            <Plus size={24} color="#4CAF50" strokeWidth={3} />
          </TouchableOpacity>
          <Text style={styles.addNewText}>Add new</Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.recentTransactions}>
        <View style={styles.recentTransactionsText}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home/transactions")}
          >
            <Text style={styles.recentTransactionsTextRight}>See all</Text>
          </TouchableOpacity>
        </View>
        <View>
          {transactions.map((item, index) => (
            <TransactionCard key={index} transaction={item} />
          ))}
        </View>
      </View>

      {/* Account Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        {/* Account limits */}
        <View style={styles.sectionBox}>
          <Text style={styles.limitLabel}>Account limits</Text>
          <View style={styles.limitRow}>
            <Image
              source={require("@/assets/images/currency/NGN.png")}
              style={styles.currencyImage}
            />
            <Text style={styles.limitTotal}>$0.00 left of</Text>
            <Text style={styles.limitAmount}> 0.00 this week</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.learnMore}>Learn more</Text>
            <ChevronRight size={16} color="#4B5563" />
          </View>
        </View>

        {/* Exchange Rate */}
        <View style={styles.sectionBox}>
          <Text style={styles.limitLabel}>Exchange Rate</Text>
          <ExchangeRate />
          <View style={styles.rightContent}>
            <Text style={styles.learnMore}>Learn more</Text>
            <ChevronRight size={16} color="#4B5563" />
          </View>
        </View>
      </View>

      {/* Multi-Currency Card */}
      <View style={styles.currencyCard}>
        {/* <Text style={styles.currencyCardTitle}>
          Open Multi-Currency Accounts on Simplisend
        </Text>
        <View style={styles.currencyFlags}>
          <Text>🇿🇦 ZAR</Text>
          <Text>🇳🇬 NGN</Text>
          <Text>💰 CFA</Text>
          <Text>🇨🇦 CAD</Text>
        </View>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreButtonText}>Learn More</Text>
        </TouchableOpacity> */}
        <Image
          source={require("@/assets/images/home/multi-currency.png")}
          resizeMode="stretch"
        />
      </View>

      {/* Currency Graph */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Graph</Text>
        {/* Account limits */}
        <View style={styles.sectionBox}>
          <View style={styles.graphHeader}>
            <Text style={styles.graphHeaderRight}>
              Last Upate 2 Minutes Ago
            </Text>
            <ExchangeRate />
          </View>
          <Image
            source={require("@/assets/images/home/graph.png")}
            style={{ width: "100%" }}
          />
        </View>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.suggestionsGrid}>
        <Text style={styles.sectionTitle}>Suggested for you</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.actionGrid}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/send")}>
              <Image source={require("@/assets/images/home/Slide_1.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(tabs)/request")}>
              <Image source={require("@/assets/images/home/Slide_2.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home/transactions")}
            >
              <Image source={require("@/assets/images/home/Slide_3.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home/transactions")}
            >
              <Image source={require("@/assets/images/home/Slide_3.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home/transactions")}
            >
              <Image source={require("@/assets/images/home/Slide_3.png")} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Feedback Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How are you liking Simplisend</Text>
        <View style={[styles.emojiRow, styles.sectionBox]}>
          <TouchableOpacity onPress={() => handleEmoji("You are happy")}>
            <Image source={require("@/assets/images/home/emotion_1.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEmoji("You are lucky")}>
            <Image source={require("@/assets/images/home/emotion_2.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEmoji("You are sad")}>
            <Image source={require("@/assets/images/home/emotion_3.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEmoji("You are angry")}>
            <Image source={require("@/assets/images/home/emotion_4.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isVisible} setVisible={setIsVisible} type="center">
        <View style={styles.modal}>
          <Text>{emoji}</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 200, // Add padding to account for tab bar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerRightBanch: {
    width: 100,
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FCD34D",
    paddingRight: 2,
    paddingLeft: 8,
  },
  notificationIcon: {
    width: 25,
    height: 25,
  },
  qrIcon: {
    width: 15,
    // height: 15,
  },
  iconButton: {
    padding: 8,
  },
  qrButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#E5E9FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 500,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 400,
    color: COLORS.textColor,
  },
  balanceCard: {
    marginTop: 12,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.primary,
    letterSpacing: -1,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A1A1A",
    marginLeft: 4,
    marginTop: 4,
  },
  balanceLabel: {
    fontSize: 15,
    color: "#666",
    marginBottom: 16,
  },
  addButton: {
    position: "absolute",
    right: 20,
    top: 10,
    backgroundColor: "#E5E9FF",
    borderRadius: 20,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  flagIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    color: COLORS.primary,
  },
  verificationCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  verificationCardLeft: {
    width: "60%",
  },
  verificationTitle: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 8,
  },
  verificationSubTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.textColor,
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textColor,
    lineHeight: 18,
    marginBottom: 16,
  },
  verifyButton: {
    borderWidth: 1,
    borderColor: "#3B4CB8",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  verifyButtonText: {
    color: "#3B4CB8",
    fontSize: 14,
    fontWeight: "600",
  },
  verificationCardRight: {
    marginTop: 20,
    marginRight: -10,
  },
  actionCard: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "#DEF3E9",
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionCardItem: {
    width: "25%",
    height: 66,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  actoinCardItemImage: {
    width: 30,
    margin: 6,
  },
  actionCardItemTitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "400",
  },
  quickActionsSection: {
    paddingVertical: 10,
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primary,
    marginBottom: 16,
  },
  addNewSection: {
    width: 60,
    height: 60,
    alignItems: "center",
  },
  addNewButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0FFF0",
  },
  addNewText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "400",
    color: "#171E44",
  },
  recentTransactions: {
    margin: 20,
  },
  recentTransactionsText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recentTransactionsTextRight: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "400",
  },
  recentTransactionsSubText: {
    color: COLORS.textColor,
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    margin: 20,
  },
  sectionBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
  },
  limitLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.primary,
  },
  limitRow: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  limitAmount: {
    fontSize: 14,
    color: "#6B7280",
  },
  limitTotal: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  learnMore: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  currencyCard: {
    // margin: 16,
    // padding: 16,
    // backgroundColor: "#3B4CB8",
    // borderRadius: 12,
    alignItems: "center",
  },
  currencyCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  currencyFlags: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  learnMoreButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  learnMoreButtonText: {
    color: "#3B4CB8",
    fontSize: 14,
    fontWeight: "600",
  },
  suggestionsGrid: {
    padding: 16,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 12,
  },
  quickAction: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: "#1F2937",
    textAlign: "center",
  },
  currencyImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  graphHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 40,
  },
  graphHeaderRight: {
    fontSize: 9,
    fontWeight: "400",
  },
  emojiRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  badge: {
    borderRadius: 100,
    padding: 4,
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 6,
    right: 9,
  },
  globalAccount: {
    flexDirection: "row",
    gap: 12,
  },
  globalAccountCard: {
    padding: 16,
    borderRadius: 18,
    borderColor: "#26323833",
    borderWidth: 1,
    width: 120,
    height: 128,
  },
  globalAccountCardImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginBottom: 20,
  },
  globalAccountCurrency: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  modal: {
    flexDirection: "row",
    justifyContent: "center",
    width: 120,
  },
});

export default HomeScreen;
