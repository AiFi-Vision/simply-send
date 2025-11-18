import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import PinCodeModal from "@/components/PinCodeModal";
import { COLORS } from "@/styles/colors";

const WalletPaymentConfirmScreen = () => {
  const router = useRoute();
  const { amount, currency } = router.params;

  const [isVisible, setIsVisible] = useState(false);

  const [pinCode, setPinCode] = useState("");

  return (
    <ContainerView
      title="Choose how do you want to send 200 USD"
      prev="Select payment method"
      footer={
        <Button
          handle={() => setIsVisible(true)}
          title="Continue"
          style={{ margin: 20 }}
        />
      }
    >
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.headerLeft}>Selected payment method</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.contentItem}>
        <View style={styles.contentItemLeft}>
          <View style={styles.contentItemImage}>
            <Image
              source={require("@/assets/images/bank/bank_4.png")}
              style={styles.bankMarkIcon}
            />
          </View>
          <View style={styles.contentItemBody}>
            <Text style={styles.contentItemTitle}>Bank of America</Text>
            <Text style={styles.contentItemId}>
              {"123123123123".replace(/\d(?=\d{4})/g, "*")}
            </Text>
          </View>
        </View>
        <Ionicons name="checkmark" style={styles.checkmarkStyle} size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.changeText}>Change payment method</Text>
      </TouchableOpacity>
      {/* Custom Modal */}
      <PinCodeModal
        pinCode={pinCode}
        setPinCode={setPinCode}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        nextRouter={"success"}
      />
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
  },
  contentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.primary,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  contentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    padding: 20,
    borderRadius: 24,
    borderColor: "#74C12C",
    borderWidth: 2,
  },
  contentItemLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentItemImage: {
    marginRight: 10,
  },
  contentItemBody: {},
  contentItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textColor,
  },
  contentItemId: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  bankMarkIcon: {
    width: 56,
    height: 56,
  },
  changeText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  checkmarkStyle: {
    color: "#fff",
    backgroundColor: "#74C12C",
    padding: 2,
    borderRadius: 100,
  },
});

export default WalletPaymentConfirmScreen;
