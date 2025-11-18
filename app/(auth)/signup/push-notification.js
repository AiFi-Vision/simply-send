import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@/components/ProgressBar";
import { Text, Button, Modal } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Simplisend",
    body: "Welcome to set notification to Simplisend",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const SignUpPushNotificationScreen = () => {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const showCustomAlert = () => {
    setIsVisible(true);
  };

  const hideCustomAlert = () => {
    setIsVisible(false);
  };

  const handleAllowNotifications = async () => {
    try {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token ?? "");
    } catch (error) {
      setExpoPushToken(`${error}`);
    }
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={5} totalSteps={6} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Image
          source={require("@/assets/images/auth/Push notifications.png")}
        />
        <Text style={[globalStyles.h2, styles.bodyTitle]}>
          Simplisend would like to send you push notifications
        </Text>
        <Text style={[globalStyles.h4, styles.bodyText]}>
          Don’t miss out on special features from app and helpful hints and tips
        </Text>
      </View>

      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your Expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View> */}

      {/* Allow Button */}
      <Button handle={showCustomAlert} title="Allow notification" />
      <Text style={styles.skipText} onPress={() => navigation.push("pin")}>
        Skip for now
      </Text>
      {/* Custom Modal */}
      <Modal visible={isVisible} setVisible={hideCustomAlert} type="center">
        <Text style={styles.modalTitle}>
          Simplisend would like to send you push notifications
        </Text>
        <Text style={styles.modalMessage}>
          Notifications may include alerts, sounds and icon badges. These can be
          configured in Settings.
        </Text>

        {/* Custom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={hideCustomAlert}
          >
            <Text style={styles.noButtonText}>Don't allow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.okButton]}
            onPress={async () => {
              handleAllowNotifications();
              hideCustomAlert();
              await sendPushNotification(expoPushToken);
            }}
          >
            <Text style={styles.okButtonText}>Allow</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingTop: 24,
    marginTop: 60,
  },
  body: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
  },
  bodyTitle: {
    marginTop: 70,
    lineHeight: 22,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  bodyText: {
    marginTop: 20,
    lineHeight: 22,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  skipText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    color: COLORS.secondary,
    marginVertical: 30,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.textColor,
    lineHeight: 24,
  },
  modalMessage: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.textColor,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
  },
  okButton: {
    backgroundColor: COLORS.secondary,
  },
  okButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "500",
  },
  noButtonText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default SignUpPushNotificationScreen;
