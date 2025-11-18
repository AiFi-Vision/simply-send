import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";

const InformationScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Information"
      title="Information about our identity verification!"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E0FFF0" }]}
          onPress={() => navigation.push("info-identify")}
        >
          <Text style={styles.cardText}>
            Why am I being asked to verify my identity?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFF6E0" }]}
          onPress={() => navigation.push("info-simplisend")}
        >
          <Text style={styles.cardText}>
            What does simplisend do with my information?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E2E7E3" }]}
          onPress={() => navigation.push("info-document")}
        >
          <Text style={styles.cardText}>Accepted identity documents</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E0FFF0" }]}
          onPress={() => navigation.push("info-id")}
        >
          <Text style={styles.cardText}>
            How to verify your ID on simplisend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFF6E0" }]}
          onPress={() => navigation.push("info-profile")}
        >
          <Text style={styles.cardText}>
            How do I update or correct my profile?
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    borderRadius: 18,
    paddingHorizontal: 20,
    height: 80,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.textColor,
    lineHeight: 25,
  },
});

export default InformationScreen;
