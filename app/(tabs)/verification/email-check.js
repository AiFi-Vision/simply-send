import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";
import { useUserStore } from "@/store";

const EmailCheckScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { email } = router.params;

  const handleVerify = () => {
    useUserStore.getState().setUser({ emailVerify: true });
    navigation.push("method-select");
    // navigation.dispatch(StackActions.popToTop());
  };

  return (
    <ContainerView
      title="Check your email"
      footer={
        <Button
          handle={handleVerify}
          title="Email Verified"
          style={styles.footer}
        />
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        <Text style={[globalStyles.h3, styles.title]}>
          We’ve sent you an email at {email}
        </Text>
        <Image
          source={require("@/assets/images/verification/verify-email.png")}
        />
        <Text style={[globalStyles.h3, styles.title]}>
          Check your email and click verify email to validate your email. Once
          done, click email verified below.
        </Text>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    color: COLORS.textColor,
    alignSelf: "flex-start",
  },
  footer: {
    margin: 20,
  },
});

export default EmailCheckScreen;
