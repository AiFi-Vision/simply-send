import ContainerView from "@/components/ContainerView";
import { StyleSheet } from "react-native";
import { Text } from "@/elements";
import { COLORS } from "@/styles/colors";

const PolicyScreen = () => {
  return (
    <ContainerView prev="Privacy Policy">
      <Text style={[styles.text, { marginBottom: 20 }]}>
        The terms and conditions of a payment mobile app may vary depending on
        the specific app and the country in which it is used. In general,
        however, these terms and conditions may include provisions related to:
      </Text>
      <Text style={styles.text}>
        The use and operation of the app, including any fees or charges that
        maybe associated with its use.
      </Text>
      <Text style={styles.text}>
        The privacy and security of the app, including how personal and
        financial information is collected, stored, and used.
      </Text>
      <Text style={styles.text}>
        Your rights and responsibilities as a user of the app, including any
        limitations on your use of the app or any liability for your actions.
      </Text>
      <Text style={styles.text}>
        Dispute resolution, including how any disputes between you and the app
        provider will be resolved.
      </Text>
      <Text style={styles.text}>
        Changes to the terms and conditions, including how the app provider can
        update or modify these terms and conditions in the future.
      </Text>
      <Text style={styles.text}>
        It is important to read and understand the terms and conditions of any
        payment app before using it, as they outline the legal agreement between
        you and the app provider.
      </Text>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.25,
    color: COLORS.textColor,
  },
});

export default PolicyScreen;
