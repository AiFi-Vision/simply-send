import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";
import globalStyles from "@/styles/global";

const InfoIdScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Information"
      title="How to verify your ID on simplisend"
    >
      <View style={styles.container}>
        <Text style={styles.content}>
          Taking a photo of your Identity Document
        </Text>
        <Text style={styles.note}>
          Note: You must do a liveness check before submitting your ID document.
          This allows us to identify spoofing attempts and authenticate actual
          users quickly. The system authenticates actual users by creating a 3D
          FaceMap, which is constantly referenced for authorizing users' actions
          moving forward; the system ensures that users are physically present
          for transactions, logins, and you and your date is safe from fraud.
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Open the Simplisend App and Login.
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Click on the "Verify Identity" button on the homepage.
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Continue to verify your identity.
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Make sure to give access to the Simplisend app to access
          your camera.
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Take a picture of your government-issued ID Card
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Do a liveness check and center your face in front of the
          frame and gently roll your face for the app to completely capture your
          face.
        </Text>
        <Text style={styles.list}>
          {"\u2022"} You are now ready. We will authenticate your identity
          within a couple of minutes but may occasionally take up to 24 hours
        </Text>
        <Text style={styles.list}>
          {"\u2022"} Once you are verified, we will notify you via email.
        </Text>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFF6E0" }]}
          onPress={() => navigation.push("info-profile")}
        >
          <View>
            <Text style={[globalStyles.h4, { color: "#3862F8" }]}>Next</Text>
            <Text style={styles.cardText}>
              How do I update or correct my profile?
            </Text>
          </View>
          <ChevronRight size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 25,
    color: COLORS.textColor,
    marginVertical: 16,
  },
  card: {
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },
  cardText: {
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.textColor,
    lineHeight: 25,
  },
  note: {
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.textColor,
    marginBottom: 20,
  },
  list: {
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 25,
    color: COLORS.textColor,
  },
});

export default InfoIdScreen;
