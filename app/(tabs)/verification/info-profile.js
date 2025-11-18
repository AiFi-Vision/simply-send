import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";

const InfoProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Information"
      title="How do I update or correct my profile?"
    >
      <View style={styles.container}>
        <Text style={styles.content}>
          Visit your profile page to set your @simplisend username, and display
          it publicly, or update your date of birth and add your residence
          address. Please contact the SimpliSend support staff if you need
          further help.
        </Text>
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
});

export default InfoProfileScreen;
