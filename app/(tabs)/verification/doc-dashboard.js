import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

const DocDashboardScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <ContainerView
      footer={
        <View style={styles.footer}>
          <Button handle={() => navigation.push("doc-scan")} title="Continue" />
          <Text
            style={[globalStyles.h2, styles.skipButton]}
            onPress={() => router.push("/(tabs)/home")}
          >
            Skip for now
          </Text>
        </View>
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        <Image
          source={require("@/assets/images/verification/doc.png")}
          style={{ alignSelf: "center" }}
        />
        <Text style={[globalStyles.h2, styles.title]}>
          Why we need you to verify your identity
        </Text>
        <Text style={[globalStyles.h3, styles.content]}>
          To help protect you from fraud and identity theft, and to comply with
          federal regulations, we need some info including:
        </Text>
        <View style={styles.list}>
          <Text style={[globalStyles.h3, styles.content]}>
            {"\u2022"} Name, and DOB
          </Text>
          <Text style={[globalStyles.h3, styles.content]}>
            {"\u2022"} Data page of your government issued ID i.e drivers
            license, passport or permanent residence card
          </Text>
        </View>
        <Text style={[globalStyles.h3, styles.content]}>
          You will then be able to send up to 1,000.00 USD per day.
        </Text>
      </View>
      {/* Button */}
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  body: {},
  title: {
    marginTop: 40,
    marginBottom: 20,
  },
  content: {
    lineHeight: 22,
    color: COLORS.textColor,
  },
  footer: {
    margin: 20,
  },
  skipButton: {
    textAlign: "center",
    color: COLORS.secondary,
    padding: 20,
  },
  list: {
    marginVertical: 20,
    marginHorizontal: 5,
  },
});

export default DocDashboardScreen;
