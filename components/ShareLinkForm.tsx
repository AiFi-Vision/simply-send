import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/elements";

interface ShareLinkFormProps {
  message: string;
}

const ShareLinkForm: React.FC<ShareLinkFormProps> = ({ message }) => {
  const encodedMessage = encodeURIComponent(message);

  const tryOpen = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        "App not installed",
        "It looks like this app is not available on your device."
      );
    }
  };

  const openWhatsApp = () => {
    tryOpen(`whatsapp://send?text=${encodedMessage}`);
  };

  const openSMS = () => {
    const smsUrl =
      Platform.OS === "ios"
        ? `sms:&body=${encodedMessage}`
        : `sms:?body=${encodedMessage}`;
    tryOpen(smsUrl);
  };

  const openMessenger = () => {
    tryOpen(`fb-messenger://share?link=https://yourlink.com`);
  };

  const openTwitter = () => {
    tryOpen(`https://twitter.com/intent/tweet?text=${encodedMessage}`);
  };

  const openFacebook = () => {
    tryOpen(
      `https://www.facebook.com/sharer/sharer.php?u=https://yourlink.com`
    );
  };

  const openIMessages = () => {
    const iMessageUrl = `sms:&body=${encodedMessage}`;
    tryOpen(iMessageUrl);
  };

  const functions = [
    {
      title: "Messenger",
      image: require("@/assets/images/share/messenger.png"),
      onPress: openMessenger,
    },
    {
      title: "Message",
      image: require("@/assets/images/share/message.png"),
      onPress: openSMS,
    },
    {
      title: "WhatsApp",
      image: require("@/assets/images/share/whatsapp.png"),
      onPress: openWhatsApp,
    },
    {
      title: "Twitter",
      image: require("@/assets/images/share/twitter.png"),
      onPress: openTwitter,
    },
    {
      title: "Facebook",
      image: require("@/assets/images/share/facebook.png"),
      onPress: openFacebook,
    },
    {
      title: "iMessage",
      image: require("@/assets/images/share/iMessage.png"),
      onPress: openIMessages,
    },
  ];

  return (
    <View style={styles.modalFunction}>
      {functions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.functionItem}
          onPress={item.onPress}
        >
          <Image source={item.image} />
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.functionItem}>
        <View style={styles.moreIcon}>
          <Ionicons name="ellipsis-horizontal" size={32} color="black" />
        </View>
        <Text>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalFunction: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  functionItem: {
    width: "20%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  moreIcon: {
    padding: 6,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default ShareLinkForm;
