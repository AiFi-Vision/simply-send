import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import UserCard from "@/components/UserCard";
import { COLORS } from "@/styles/colors";
import { formatAmount } from "@/helper";

const RequestReviewDetailsScreen = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { user, amount, note, file } = router.params;

  return (
    <ContainerView
      prev="Review details"
      footer={
        <Button
          handle={() => navigation.push("create-custom", { user, amount })}
          title="Create Custom Link"
          style={{ margin: 20 }}
          type="outline"
        />
      }
    >
      <View style={styles.card}>
        <UserCard user={user} />
        <Text style={styles.changeText}>Change</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentRow}>
          <Text style={styles.rowRight}>Recipient</Text>
          <Text style={styles.rowLeft}>{user.name}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.rowRight}>Email</Text>
          <Text style={styles.rowLeft}>satishray@gmail.com</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.rowRight}>Notes</Text>
          <Text style={styles.rowLeft}>{note}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.rowRight}>Request Amount</Text>
          <Text style={styles.rowLeft}>${formatAmount(amount)}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.rowRight}>Attachment</Text>
          <Text style={styles.rowLeft}>{file.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.sendGroup}
        onPress={() => navigation.push("success", { user, amount })}
      >
        <View style={styles.send}>
          <Image
            source={require("@/assets/images/extra/curveline-right.png")}
            style={styles.sendIcon}
          />
        </View>
        <Text>Send Request</Text>
      </TouchableOpacity>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
  },
  changeText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    marginTop: 20,
  },
  contentRow: {
    marginVertical: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowRight: {
    maxWidth: "35%",
  },
  rowLeft: {
    maxWidth: "55%",
  },
  sendGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  send: {
    backgroundColor: COLORS.yellow,
    padding: 16,
    borderRadius: 100,
    maxWidth: 56,
    marginBottom: 20,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});

export default RequestReviewDetailsScreen;
