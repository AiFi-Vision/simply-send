import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Text, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";
import ContainerView from "@/components/ContainerView";
import ShareLinkForm from "@/components/ShareLinkForm";
import { useUserStore } from "@/store";

const QuickPaymentScreen = () => {
  const scale = new Animated.Value(1); // Initial scale

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          // Scale up
          Animated.timing(scale, {
            toValue: 1.5, // Scale to 1.5x the size
            duration: 500, // Duration for scaling up
            easing: Easing.linear, // Linear easing
            useNativeDriver: true,
          }),
          // Scale down
          Animated.timing(scale, {
            toValue: 1, // Scale back to original size
            duration: 500, // Duration for scaling down
            easing: Easing.linear, // Linear easing
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation(); // Start the animation loop

    return () => {
      // Cleanup on unmount (optional)
      scale.stopAnimation();
    };
  }, [scale]);

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("QR Scanner");
  const [isVisible, setIsVisible] = useState(false);
  const user = useUserStore((state) => state.user);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleTabPress = async (tab) => {
    setActiveTab(tab);
    tab === "Scan nearby" && (await getLocationAsync());
  };

  const getLocationAsync = async () => {
    console.log("!!!!getLocationAsync");
    let { status } = await Location.requestPermissionsAsync();
    console.log("!!!status", status);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let locationData = await Location.getCurrentPositionAsync({});
    console.log("!!!locationData", locationData);
    setLocation(locationData.coords);
  };

  return (
    <ContainerView
      prev="Quick payment"
      footer={
        <TouchableOpacity
          style={styles.sendGroup}
          onPress={() => {
            activeTab === "QR Scanner"
              ? router.push("/(tabs)/send")
              : activeTab === "Your Code"
              ? setIsVisible(true)
              : "";
          }}
        >
          {activeTab !== "Scan nearby" ? (
            <View style={styles.send}>
              <Image
                source={require("@/assets/images/extra/curveline-right.png")}
                style={styles.sendIcon}
              />
            </View>
          ) : (
            <View>
              <Text>Scanning for people...</Text>
            </View>
          )}
          <Text>
            {activeTab === "QR Scanner"
              ? "Pay Now"
              : activeTab === "Your Code"
              ? "Share with Friends"
              : ""}
          </Text>
        </TouchableOpacity>
      }
      background={
        activeTab === "Scan nearby" && (
          <Image
            source={require("@/assets/images/payment/location.png")}
            style={styles.bgImage}
          />
        )
      }
    >
      <View style={styles.tabBar}>
        {["QR Scanner", "Your Code", "Scan nearby"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTab, // Apply activeTab style for the selected tab
            ]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeText, // Change text color for the active tab
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === "QR Scanner" ? (
        <View style={styles.body}>
          <Image source={user?.avatar} style={styles.avatar} />
          <Text style={[globalStyles.h1, { color: COLORS.textColor }]}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={globalStyles.h2}>{user?.link}</Text>
          <Text style={[globalStyles.h2, { color: COLORS.textColor }]}>
            {user?.email}
          </Text>
        </View>
      ) : activeTab === "Your Code" ? (
        <View style={styles.infoBody}>
          <View style={styles.myInfo}>
            <Image
              source={require("@/assets/images/payment/mycode.png")}
              style={styles.qrcode}
            />
            <View style={styles.centerImage}>
              <Image source={user?.avatar} style={styles.myImage} />
              <View style={styles.camera}>
                <Image
                  source={require("@/assets/images/payment/camera.png")}
                  style={{ width: 22, height: 22 }}
                />
              </View>
            </View>
          </View>
          <Text style={[globalStyles.h1, { color: COLORS.textColor }]}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={globalStyles.h2}>{user?.link}</Text>
          <Text style={[globalStyles.h4, { color: COLORS.textColor }]}>
            {user?.email}
          </Text>
        </View>
      ) : (
        <View>
          {location ? (
            <Text>
              Your current location: {location.latitude}, {location.longitude}
            </Text>
          ) : (
            <Animated.View
              style={[
                styles.circle,
                { transform: [{ scale: scale }] }, // Apply the scaling transformation
              ]}
            />
          )}
        </View>
      )}
      <Modal visible={isVisible} setVisible={setIsVisible}>
        <ShareLinkForm message={user?.link} />
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FFC107", // Yellow background for active tab
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeText: {
    color: "#fff", // White text for active tab
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 160,
  },
  sendGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
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
  avatar: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  infoBody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  myInfo: {
    marginHorizontal: 5,
    marginVertical: 40,
    alignItems: "center",
    padding: 20,
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  qrcode: {
    width: 330,
    height: 330,
    resizeMode: "contain",
    zIndex: 0,
  },
  centerImage: {
    position: "absolute",
    left: 144,
    top: 144,
  },
  myImage: {
    zIndex: 1,
    height: 85,
    width: 85,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  camera: {
    backgroundColor: "#b8b8b8",
    borderRadius: 100,
    borderColor: COLORS.white,
    borderWidth: 3,
    padding: 8,
    width: 44,
    zIndex: 2,
    position: "absolute",
    bottom: -10,
    right: -10,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circle: {
    marginTop: 200,
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50, // Make it a circle
    backgroundColor: "#3862F8", // Circle color
  },
});

export default QuickPaymentScreen;
