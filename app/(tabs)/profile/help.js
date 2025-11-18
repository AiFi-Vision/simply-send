import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const HelpScreen = () => {
  const menu = [
    {
      title: "Help Centre",
      content: "Fast answer to all of the most common questions.",
      image: require("@/assets/images/profile/help_centre.png"),
    },
    {
      title: "Live Chat",
      content: "Chat with our team of experts in real-time.",
      image: require("@/assets/images/profile/live_chat.png"),
    },
    {
      title: "Phone Support",
      content: "Chat with our team of experts in real-time.",
      image: require("@/assets/images/profile/phone_support.png"),
    },
    {
      title: "Email",
      content: "Submit your request using our web form.",
      image: require("@/assets/images/profile/email.png"),
    },
  ];

  return (
    <ContainerView prev="Help & Support" title="We’re here for you">
      <View style={styles.container}>
        <View style={{ marginVertical: 20 }}>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            Monday-Friday: 8am -8pm (EST)
          </Text>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            Saturday & Sunday: 9am -6pm(EST)
          </Text>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            Business hours may be subject to change on holidays
          </Text>
        </View>
        <View>
          {menu.map((item, index) => (
            <View style={styles.item} key={index}>
              <Image source={item.image} style={styles.itemImage} />
              <View>
                <Text style={[globalStyles.h4, { marginBottom: 8 }]}>
                  {item.title}
                </Text>
                <Text style={[globalStyles.h5, { color: "#263238" }]}>
                  {item.content}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 18,
    padding: 20,
    marginTop: 12,
  },
  itemImage: {
    width: 42,
    height: 42,
    resizeMode: "contain",
    marginRight: 16,
  },
});

export default HelpScreen;
