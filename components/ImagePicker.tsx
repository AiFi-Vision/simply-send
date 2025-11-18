import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImageFromGallery = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert(
      "Permission required",
      "You need to allow access to the gallery."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1], // square crop
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    return imageUri;
  }

  return null;
};

export const takePhotoWithCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert("Permission required", "You need to allow camera access.");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    return imageUri;
  }

  return null;
};
