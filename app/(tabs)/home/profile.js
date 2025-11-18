import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import { Text, Modal } from "@/elements";
import { useUserStore } from "@/store";

const ProfileScreen = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const user = useUserStore((state) => state.user);

  const account_settings = [
    {
      image: require("@/assets/images/profile/payment.png"),
      label: "Manage payment Methods",
      link: "/(tabs)/manage-account",
    },
    {
      image: require("@/assets/images/profile/receive.png"),
      label: "Receive Funds settings",
      link: "/(tabs)/profile/receive",
    },
    {
      image: require("@/assets/images/profile/security.png"),
      label: "Privacy & Security",
      link: "/(tabs)/security",
    },
    {
      image: require("@/assets/images/profile/quick.png"),
      label: "Quick Payment",
      link: "/(tabs)/quick-payment",
    },
    {
      image: require("@/assets/images/profile/schedule.png"),
      label: "Scheduled Transfers",
      link: "/(tabs)/profile/schedule",
    },
    {
      image: require("@/assets/images/profile/account.png"),
      label: "Account Limits",
      link: "/(tabs)/profile/account",
    },
    {
      image: require("@/assets/images/profile/notification.png"),
      label: "Notifications",
      link: "/(tabs)/profile/notification",
    },
    {
      image: require("@/assets/images/profile/request.png"),
      label: "Requested Payments",
      link: "/(tabs)/profile/request",
    },
    {
      image: require("@/assets/images/profile/chat.png"),
      label: "Chat settings",
      link: "",
    },
  ];

  const referral_credits = [
    {
      image: require("@/assets/images/profile/gift.png"),
      label: "Gift cards",
      link: "/(tabs)/gift",
    },
    {
      image: require("@/assets/images/profile/refer.png"),
      label: "Refer a Friend",
      link: "/(tabs)/profile/refer",
    },
  ];

  const support = [
    {
      image: require("@/assets/images/profile/help.png"),
      label: "Get Help",
      link: "/(tabs)/profile/help",
    },
    {
      image: require("@/assets/images/profile/feedback.png"),
      label: "Give Feedback",
      link: "/(tabs)/profile/feedback",
    },
  ];

  const legal = [
    {
      image: require("@/assets/images/profile/terms.png"),
      label: "Terms of Service",
      link: "/(tabs)/profile/terms",
    },
    {
      image: require("@/assets/images/profile/policy.png"),
      label: "Privacy Policy",
      link: "/(tabs)/profile/policy",
    },
  ];

  return (
    <ContainerView prev="Profile">
      <View style={styles.container}>
        <Text style={globalStyles.h4}>
          Personalize how you’ll appear to people you know within Simplisend.
        </Text>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => router.push("(tabs)/profile")}
        >
          <Image
            source={user?.avatar || require("@/assets/images/users/empty.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.profileName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            {user?.isVerified ? (
              <View style={styles.verify}>
                <Text
                  style={[styles.verifyText, { borderColor: COLORS.secondary }]}
                >
                  Verified
                </Text>
                <Image
                  source={require("@/assets/images/profile/verified.png")}
                />
              </View>
            ) : (
              <View style={styles.verify}>
                <Text
                  style={[styles.verifyText, { borderColor: COLORS.yellow }]}
                >
                  Verification Pending
                </Text>
                <Image
                  source={require("@/assets/images/profile/non_verified.png")}
                />
              </View>
            )}
          </View>
          <ChevronRight size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Settings</Text>
          {account_settings.map((item, index) => (
            <TouchableOpacity
              style={styles.cardItem}
              key={index}
              onPress={() => router.push(item.link)}
            >
              <View style={styles.cardLeft}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
              <ChevronRight size={18} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Referral & Credits</Text>
          {referral_credits.map((item, index) => (
            <TouchableOpacity
              style={styles.cardItem}
              key={index}
              onPress={() => router.push(item.link)}
            >
              <View style={styles.cardLeft}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
              <ChevronRight size={18} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Support</Text>
          {support.map((item, index) => (
            <TouchableOpacity
              style={styles.cardItem}
              key={index}
              onPress={() => router.push(item.link)}
            >
              <View style={styles.cardLeft}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
              <ChevronRight size={18} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Legal</Text>
          {legal.map((item, index) => (
            <TouchableOpacity
              style={styles.cardItem}
              key={index}
              onPress={() => router.push(item.link)}
            >
              <View style={styles.cardLeft}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
              <ChevronRight size={18} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.cardItem, { borderBottomWidth: 0 }]}
            onPress={() => setShow(true)}
          >
            <View style={styles.cardLeft}>
              <Image
                source={require("@/assets/images/profile/logout.png")}
                style={styles.itemImage}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
            <ChevronRight size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.footerText}>
            Simpliend is registered and regularized by the United States
            Financial Crimes Enforcement Network (FinCEN) & the Financial
            Transactions and Report Analysis Centre of Canada (FINTRAC) as an
            MSB.
          </Text>
          <Text style={{ textAlign: "center" }}>Version: 1.00</Text>
        </View>
      </View>
      <Modal visible={show} setVisible={setShow} type="center">
        <Text style={styles.modalText}>
          Are you sure you want to logout from the app?
        </Text>
        <View style={styles.modalButton}>
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={[styles.button, { borderColor: COLORS.secondary }]}
          >
            <Text style={[styles.buttonText, { color: COLORS.secondary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={[
              styles.button,
              {
                borderColor: COLORS.secondary,
                backgroundColor: COLORS.secondary,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: COLORS.white }]}>
              Yes, logout
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 150,
  },
  profile: {
    paddingTop: 32,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: {
    borderRadius: 100,
    width: 84,
    height: 84,
  },
  profileName: {
    color: COLORS.textColor,
    fontSize: 20,
    fontWeight: "600",
  },
  profileEmail: {
    marginVertical: 8,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  verify: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  verifyText: {
    textAlign: "center",
    paddingVertical: 6,
    width: 160,
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.textColor,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 8,
  },
  card: {
    marginTop: 28,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primary,
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 16,
    marginTop: 8,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  itemText: {
    fontWeight: "400",
    fontSize: 16,
    color: COLORS.textColor,
  },
  logoutText: {
    color: "#000C14",
    fontWeight: "500",
    fontSize: 16,
  },
  footerText: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000C14",
    lineHeight: 18,
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 60,
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
    marginBottom: 40,
  },
  button: {
    width: "45%",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default ProfileScreen;
