import React, { useState } from "react";
import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import { takePhotoWithCamera } from "@/components/ImagePicker";
import { useUserStore } from "@/store";
import { COLORS } from "@/styles/colors";

const DocVerifyScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { uri } = router.params;
  const [cameraImage, setCameraImage] = useState(uri); // ← ① state for image

  const handleVerify = () => {
    useUserStore.getState().setUser({ docVerify: true });
    navigation.push("method-select");
    // navigation.dispatch(StackActions.popToTop());
  };

  return (
    <ContainerView
      title="Verify Document Scan"
      content="Scan your driving license."
      footer={
        <Button title="Continue" handle={handleVerify} style={{ margin: 20 }} />
      }
    >
      <View style={styles.container}>
        {cameraImage && (
          <Image
            source={{ uri: cameraImage }}
            style={styles.capturedImage} // ← ③ Show the captured image
          />
        )}
        <Text
          style={styles.capture}
          onPress={async () => {
            const uri = await takePhotoWithCamera();
            if (uri) {
              setCameraImage(uri);
            }
          }}
        >
          Capture again
        </Text>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  capture: {
    marginTop: 20,
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.secondary,
  },
});

export default DocVerifyScreen;
