import React from "react";
import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";
import { takePhotoWithCamera } from "@/components/ImagePicker";

const SelfieCaptureScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      title="Capture selfie"
      content="Take your selfie photo for verification."
      footer={
        <Button
          title="Continue"
          style={{ margin: 20 }}
          disable // ← Disable button if no image yet
        />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.scan}
          onPress={async () => {
            const uri = await takePhotoWithCamera();
            if (uri) {
              navigation.push("selfie-verify", { uri });
            }
          }}
        >
          <Image
            source={require("@/assets/images/verification/camera.png")}
            style={{ width: 24, height: 24, marginBottom: 8 }}
          />
          <Text style={globalStyles.h3}>Take your selfie</Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  scan: {
    borderRadius: 18,
    borderColor: "#26323833",
    borderWidth: 2,
    height: 165,
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    overflow: "hidden", // important to clip image corners
  },
  capturedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default SelfieCaptureScreen;
