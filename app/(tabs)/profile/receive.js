import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import ContainerView from "@/components/ContainerView";
import { Text, Switch, Modal, Button } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const ReceiveScreen = () => {
  const [switchEmail, setSwitchEmail] = useState(true);
  const [switchPhone, setSwitchPhone] = useState(false);
  const [switchLink, setSwitchLink] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    switchLink && setShowModal(true);
  }, [switchLink]);

  return (
    <ContainerView prev="Receive Funds settings" title="Receive Funds settings">
      <View style={styles.container}>
        <Text style={globalStyles.h2}>
          Choose how people can find and pay you on Simplisend
        </Text>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/receive/email.png")}
              style={{ marginRight: 16 }}
            />
            <View>
              <Text style={styles.text}>Email Address</Text>
              <Text style={[styles.text, { opacity: 0.5 }]}>
                Find me with andrew09@gmail.com
              </Text>
            </View>
          </View>
          <Switch
            value={switchEmail}
            onChange={setSwitchEmail}
            width={45}
            height={25}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/receive/phone.png")}
              style={{ marginRight: 16 }}
            />
            <View>
              <Text style={styles.text}>Phone Number</Text>
              <Text style={[styles.text, { opacity: 0.5 }]}>
                Find me with +9217348732
              </Text>
            </View>
          </View>
          <Switch
            value={switchPhone}
            onChange={setSwitchPhone}
            width={45}
            height={25}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/receive/link.png")}
              style={{ marginRight: 16 }}
            />
            <View>
              <Text style={styles.text}>Simplisend.me Link</Text>
              <Text style={[styles.text, { opacity: 0.5 }]}>
                Find me at simplisend.me/
              </Text>
              <Text style={[styles.text, { opacity: 0.5 }]}>
                @andrew.ainsley
              </Text>
            </View>
          </View>
          <Switch
            value={switchLink}
            onChange={setSwitchLink}
            width={45}
            height={25}
          />
        </View>
      </View>
      <Modal
        visible={showModal}
        setVisible={() => {
          setShowModal(false);
          setSwitchLink(false);
        }}
        type="center"
      >
        <Text style={styles.modalTitle}>
          Are you OK to share your information through this link?
        </Text>
        <Text style={styles.modalContent}>
          By continuing, you agree that we'll create a nickname and link for
          you, so that people can find you on Wise. People with the link will be
          able to see your nickname, name and profile photo. For more details,
          please refer to our privacy policy:{" "}
          <Text style={{ color: COLORS.secondary }}>Read more</Text>
        </Text>
        <Button
          title="Confirm"
          style={{ marginBottom: 40 }}
          handle={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    marginVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
  },
  text: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.primary,
    lineHeight: 24,
    marginTop: 32,
  },
  modalContent: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.textColor,
    lineHeight: 24,
  },
});

export default ReceiveScreen;
