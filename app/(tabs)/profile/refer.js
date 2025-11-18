import React, { useState } from "react";
import ContainerView from "@/components/ContainerView";
import { StyleSheet, Image, View } from "react-native";
import { Text, Button, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import ShareLinkForm from "@/components/ShareLinkForm";

const ReferScreen = () => {
  const [show, setShow] = useState(false);

  const users = [
    {
      name: "Theresa Webb",
      avatar: require("@/assets/images/users/user_6.png"),
    },
    {
      name: "Albert Flores",
      avatar: require("@/assets/images/users/user_7.png"),
    },
    {
      name: "Brooklyn Simmons",
      avatar: require("@/assets/images/users/user_8.png"),
    },
    {
      name: "Dianne Russell",
      avatar: require("@/assets/images/users/user_9.png"),
    },
  ];

  return (
    <ContainerView
      prev="Refer a Friend"
      footer={
        <View style={styles.footer}>
          <Text style={[globalStyles.h1, { marginBottom: 8 }]}>
            Refer a friend
          </Text>
          <Text style={[globalStyles.h4, { marginVertical: 8 }]}>
            Earn rewards by referring it to friends.
          </Text>
          <Text>Copy code</Text>
          <View style={styles.copyLink}>
            <Text style={styles.linkText}>
              https://simplisend.com/invite/ASF83AJF
            </Text>
            <Image source={require("@/assets/images/extra/copy.png")} />
          </View>
          <Button title="Invite friends" handle={() => setShow(true)} />
        </View>
      }
    >
      <View style={styles.container}>
        <Image source={require("@/assets/images/profile/refer_2.png")} />
        <Image source={require("@/assets/images/profile/refer_1.png")} />
        <Text style={[globalStyles.h2, { textAlign: "center", marginTop: 28 }]}>
          Refer a friend
        </Text>
        <Text
          style={[globalStyles.h2, { textAlign: "center", marginBottom: 12 }]}
        >
          $50 USD for you & 10 USD for friends
        </Text>
        <Text style={styles.text}>
          Earn $50 for each friend, who opens a Simplisend account and sends
          money, up to $500 per calendar year. Your friend can each additional
          $10, using your invite link.
        </Text>
      </View>
      <Modal visible={show} setVisible={setShow}>
        <Text style={globalStyles.h2}>Share with</Text>
        <View style={styles.modalUser}>
          {users.map((item, index) => (
            <View key={index} style={styles.userItem}>
              <Image source={item.avatar} />
              <Text style={{ textAlign: "center" }}>{item.name}</Text>
            </View>
          ))}
        </View>
        <ShareLinkForm />
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  footer: {
    margin: 20,
    padding: 20,
    borderRadius: 24,
    elevation: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  copyLink: {
    flexDirection: "row",
    marginVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: COLORS.secondary,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
    color: COLORS.textColor,
  },
  modalUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  userItem: {
    width: "20%",
    alignItems: "center",
  },
});

export default ReferScreen;
