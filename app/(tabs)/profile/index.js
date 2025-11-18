import React, { useState } from "react";
import ContainerView from "@/components/ContainerView";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text, Button, TextInput, Modal } from "@/elements";
import { COLORS } from "@/styles/colors";
import { CURRENCIES } from "@/data";
import globalStyles from "@/styles/global";
import { useUserStore } from "@/store";
import {
  pickImageFromGallery,
  takePhotoWithCamera,
} from "@/components/ImagePicker";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const PersonalInformationScreen = () => {
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const onChangeHandle = (e, target) => {
    setUser({ [target]: e });
  };

  const setIsCurrencyHide = () => {
    setIsCurrencyVisible(false);
    setKeyword("");
  };

  return (
    <View style={{ flex: 1 }}>
      <ContainerView
        prev="Personal Information"
        footer={
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.footerTitle}>Important</Text>
              <Text>
                You are unable to edit some parts of this profile because your
                account has already been verified. If you feel that you need to
                edit, please reach out to{" "}
                <Text style={{ color: COLORS.secondary }}>
                  customer support
                </Text>
              </Text>
            </View>
            <Button title="Save" />
          </View>
        }
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setAvatarVisible(true)}
          >
            <Image
              source={user.avatar || require("@/assets/images/users/empty.png")}
              style={styles.myImage}
            />
            <View style={styles.camera}>
              <Image
                source={require("@/assets/images/payment/camera.png")}
                style={{ width: 22, height: 22 }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.inputBox}>
              <Image
                source={require("@/assets/images/auth/Orix-user.png")}
                style={styles.inputImage}
              />
              <TextInput
                placeholder="First name"
                style={styles.input}
                value={user.firstName}
                onChangeText={(e) => onChangeHandle(e, "firstName")}
              />
            </View>
            <View style={styles.inputBox}>
              <Image
                source={require("@/assets/images/auth/Orix-user.png")}
                style={styles.inputImage}
              />
              <TextInput
                placeholder="Last name"
                style={styles.input}
                value={user.lastName}
                onChangeText={(e) => onChangeHandle(e, "lastName")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="@ username"
                style={styles.input}
                value={user.username}
                onChangeText={(e) => onChangeHandle(e, "username")}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={[styles.inputBox, { width: "25%" }]}
                onPress={() => setIsCurrencyVisible(true)}
              >
                {user.currency && (
                  <Image
                    source={user.currency?.icon}
                    style={{ width: 30, height: 30 }}
                  />
                )}
                <ChevronDown size={18} color={"#000"} />
              </TouchableOpacity>
              <View style={[styles.inputBox, { width: "70%" }]}>
                <Image
                  source={require("@/assets/images/auth/phone.png")}
                  style={styles.inputImage}
                />
                <TextInput
                  placeholder="phone"
                  style={styles.input}
                  value={user.phone}
                  onChangeText={(e) => onChangeHandle(e, "phone")}
                />
              </View>
            </View>
            <View style={styles.inputBox}>
              <Image
                source={require("@/assets/images/auth/calendar.png")}
                style={styles.inputImage}
              />
              <TextInput
                placeholder="birthdate"
                style={styles.input}
                value={user.birthdate}
                onChangeText={(e) => onChangeHandle(e, "birthdate")}
              />
            </View>
            <View style={styles.inputBox}>
              <Image
                source={require("@/assets/images/auth/Orix-email.png")}
                style={styles.inputImage}
              />
              <TextInput
                placeholder="email"
                style={styles.input}
                value={user.email}
                onChangeText={(e) => onChangeHandle(e, "email")}
              />
            </View>
            <View style={styles.inputBox}>
              <Image
                source={require("@/assets/images/auth/home-trend-down.png")}
                style={styles.inputImage}
              />
              <TextInput
                placeholder="address"
                style={styles.input}
                value={user.address}
                onChangeText={(e) => onChangeHandle(e, "address")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="address2"
                style={styles.input}
                value={user.address2}
                onChangeText={(e) => onChangeHandle(e, "address2")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="state"
                style={styles.input}
                value={user.state}
                onChangeText={(e) => onChangeHandle(e, "state")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="city"
                style={styles.input}
                value={user.city}
                onChangeText={(e) => onChangeHandle(e, "city")}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="postcode"
                style={styles.input}
                value={user.postcode}
                onChangeText={(e) => onChangeHandle(e, "postcode")}
              />
            </View>
          </View>
        </View>
        <Modal visible={isCurrencyVisible} setVisible={setIsCurrencyHide}>
          <View style={styles.inputBox}>
            <FontAwesome name="search" size={20} color="#aaa" />
            <TextInput
              placeholder="Search currency"
              style={styles.input}
              value={keyword}
              onChangeText={setKeyword}
            />
          </View>
          <Text style={globalStyles.h3}>All Currencies</Text>
          {CURRENCIES.length &&
            CURRENCIES.filter((item) => item.label.includes(keyword)).map(
              (item, index) => (
                <TouchableOpacity
                  style={styles.card}
                  key={index}
                  onPress={() => {
                    onChangeHandle(item, "currency");
                    setIsCurrencyHide();
                  }}
                >
                  <Image source={item.icon} style={styles.cardImage} />
                  <Text
                    style={[
                      globalStyles.h3,
                      { color: COLORS.textColor, marginRight: 20 },
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text style={[globalStyles.h4, { color: "#888" }]}>
                    {item.content}
                  </Text>
                </TouchableOpacity>
              )
            )}
        </Modal>
      </ContainerView>
      {/* Modal Layer */}
      {avatarVisible && (
        <TouchableWithoutFeedback onPress={() => setAvatarVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={async () => {
                  const uri = await pickImageFromGallery();
                  console.log("!!!!!selectedImage", uri);
                  // if (uri) setImage(uri);
                }}
              >
                <Image
                  source={require("@/assets/images/auth/Img_box_fill.png")}
                  style={styles.modalItemImage}
                />
                <Text style={styles.modalItemText}>
                  Choose Photo From Gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalItem, { borderBottomWidth: 0 }]}
                onPress={async () => {
                  const uri = await takePhotoWithCamera();
                  console.log("!!!!!cameraImage", uri);
                  // if (uri) setImage(uri);
                }}
              >
                <Image
                  source={require("@/assets/images/auth/Camera_light.png")}
                  style={styles.modalItemImage}
                />
                <Text style={styles.modalItemText}>Click a Photo </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.modalContent,
                { marginTop: 12, marginBottom: 24, paddingVertical: 24 },
              ]}
              onPress={() => setAvatarVisible(false)}
            >
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  body: {
    marginTop: 20,
  },
  avatar: {
    alignSelf: "center",
    alignItems: "center",
    width: 150,
  },
  myImage: {
    zIndex: 1,
    height: 140,
    width: 140,
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
    bottom: 0,
    right: 0,
  },
  footer: {
    margin: 20,
  },
  footerContent: {
    borderLeftWidth: 10,
    borderColor: COLORS.yellow,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#FFF6E0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  footerTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: COLORS.textColor,
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 66,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  inputImage: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
  },
  cardImage: {
    width: 48,
    height: 48,
    marginRight: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    width: "90%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 16,
  },
  modalText: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    color: "#E44E52",
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  modalItemImage: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  modalItemText: {
    fontWeight: "500",
    fontSize: 17,
  },
});

export default PersonalInformationScreen;
