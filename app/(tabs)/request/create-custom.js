import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Text, Button, TextInput, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import { formatAmount } from "@/helper";
import ContainerView from "@/components/ContainerView";
import ShareLinkForm from "@/components/ShareLinkForm";

const RequestCreateCustomScreen = () => {
  const route = useRoute();
  const router = useRouter();
  const navigation = useNavigation();
  const { user, amount } = route.params;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <ContainerView
      title="Share your request link"
      prev="Review details"
      footer={
        <Button
          handle={() => router.push("/home")}
          title="Go home"
          style={{ margin: 20 }}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Your payment link for ${formatAmount(amount)} has been created.
            Share your link to start receiving payment
          </Text>
          <Image
            source={require("@/assets/images/extra/vector.png")}
            style={styles.vectorIcon}
          />
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Name, email, phone"
              style={styles.input}
              value={"Simplisend.com/Fiahd127831"}
            />
            <TouchableOpacity style={styles.inputButton}>
              <Text style={{ color: COLORS.secondary }}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Request Form</Text>
          <View style={styles.cardForm}>
            <Text style={styles.formSubTitle}>{user.name}</Text>
            <Text style={{ color: "#808080", marginBottom: 8 }}>
              stevelacy@example.com +4412012984
            </Text>
            <Text style={{ color: "#19224D" }}>
              Request for monthly stipend form {user.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.sendGroup}
          onPress={() => setIsVisible(true)}
        >
          <View style={styles.send}>
            <Image
              source={require("@/assets/images/extra/curveline-right.png")}
              style={styles.sendIcon}
            />
          </View>
          <Text>Share with Friends</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isVisible} setVisible={setIsVisible}>
        <ShareLinkForm />
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#3862F8",
    borderRadius: 24,
    padding: 20,
  },
  cardText: { color: "#fff" },
  form: {
    marginTop: 40,
  },
  sendGroup: {
    marginTop: 108,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#FFFFFF1A",
    backgroundColor: "#EBEBEB1A",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 66,
    marginTop: 32,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  inputButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  vectorIcon: {
    position: "absolute",
    right: 16,
    top: 36,
  },
  cardForm: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    padding: 20,
    marginVertical: 10,
  },
  formTitle: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  formSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#19224D",
    marginBottom: 8,
  },
});

export default RequestCreateCustomScreen;
