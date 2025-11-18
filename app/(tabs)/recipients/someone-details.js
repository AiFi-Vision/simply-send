import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import ContainerView from "@/components/ContainerView";
import { getAvatarName } from "@/helper";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const SomeoneDetailScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { info } = router.params;
  const [nickNameShow, setNickNameShow] = useState(false);

  return (
    <ContainerView
      prev="Details"
      footer={
        <View style={styles.footer}>
          <Button title="Send Money" handle={() => {}} />
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Image
              source={require("@/assets/images/recipients/detail.png")}
              style={styles.headerImage}
            />
            <Text style={styles.headerText}>{getAvatarName(info.name)}</Text>
          </View>
          <Text
            style={[
              globalStyles.h2,
              { color: COLORS.textColor, marginTop: 16 },
            ]}
          >
            {info.name}
          </Text>
          <View style={styles.currency}>
            <Image
              source={info.currency?.icon}
              style={{ width: 21, height: 21, marginRight: 8 }}
            />
            <Text style={globalStyles.h5}>{info.currency?.label} Account</Text>
          </View>
          <View style={styles.headerButton}>
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.button, { marginRight: 16 }]}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.button, { borderColor: "red" }]}
            >
              <Text style={[styles.buttonText, { color: "red" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <Text style={globalStyles.h4}>Bank name</Text>
            <Text style={styles.itemContent}>{info.bank?.name}</Text>
          </View>
          {nickNameShow ? (
            <View style={styles.item}>
              <Text style={globalStyles.h4}>Nickname</Text>
              <Text style={styles.itemContent}>{getAvatarName(info.name)}</Text>
            </View>
          ) : (
            <Text
              onPress={() => setNickNameShow(true)}
              style={[styles.itemContent, { color: COLORS.secondary }]}
            >
              Add a nickname
            </Text>
          )}
          <View style={styles.item}>
            <Text style={globalStyles.h4}>Account holder name</Text>
            <Text style={styles.itemContent}>{info.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={globalStyles.h4}>Email</Text>
            <Text style={styles.itemContent}>{info.email}</Text>
          </View>
          <View style={styles.item}>
            <Text style={globalStyles.h4}>Account number</Text>
            <Text style={styles.itemContent}>{info.accountNumber}</Text>
          </View>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 12,
    marginBottom: 10,
  },
  headerImage: {
    position: "absolute",
    alignSelf: "center",
    top: -60,
    width: 280,
    height: 280,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 56,
    fontWeight: "500",
    color: COLORS.primary,
    padding: 50,
    backgroundColor: "#E5E9FF",
    borderRadius: 100,
    width: 180,
    height: 180,
    textAlign: "center",
  },
  currency: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  button: {
    width: 126,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.secondary,
    fontWeight: "400",
    fontSize: 14,
  },
  item: {
    marginVertical: 10,
  },
  itemContent: {
    fontSize: 20,
    fontWeight: "400",
    color: COLORS.textColor,
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  footer: {
    margin: 20,
  },
});

export default SomeoneDetailScreen;
