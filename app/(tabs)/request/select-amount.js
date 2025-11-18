import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import ContainerView from "@/components/ContainerView";
import { Text, Button, Modal, TextInput } from "@/elements";
import KeyPad from "@/components/KeyPad";
import { formatAmount } from "@/helper";
import AmountScroller from "@/components/AmountScroller";
import UserCard from "@/components/UserCard";
import { COLORS } from "@/styles/colors";

const AddMoneyScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  // const { user } = useLocalSearchParams();
  const { user } = router.params;

  const [amount, setAmount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [note, setNote] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("!!!!success", result);

      if (result.assets) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const renderThumbnail = () => {
    if (!file) return null;

    if (file.mimeType.startsWith("image")) {
      // If the file is an image, display it
      return <Image source={{ uri: file.uri }} style={styles.thumbnail} />;
    } else {
      // If it's not an image, show a generic document icon or text
      return (
        <View style={styles.documentThumbnail}>
          <Text style={styles.documentText}>Document</Text>
        </View>
      );
    }
  };

  const handleNumberPress = (num) => {
    if (amount === "0") {
      setAmount(Number(num));
    } else {
      setAmount((prev) => Number(prev.toString() + num));
    }
  };

  const handleDelete = () => {
    if (amount > 0) {
      setAmount((prev) => Number(prev.toString().slice(0, -1)));
    } else {
      setAmount(0);
    }
  };

  const handleNext = () => {
    navigation.push("review-details", { user, amount, note, file });
  };

  return (
    <ContainerView
      prev={<UserCard user={user} />}
      footer={
        <AmountScroller
          onAmountChange={setAmount}
          maxAmount={10000}
          step={10}
          currency="$"
          amount={amount}
        />
      }
    >
      <Text style={styles.amountTitle}>Enter Amount</Text>
      <Text style={styles.amountContainer}>$ {formatAmount(amount, 2)}</Text>
      <TouchableOpacity
        style={styles.addCommet}
        onPress={() => setIsVisible(true)}
      >
        <Image
          source={require("@/assets/images/extra/stickynote.png")}
          style={{ marginRight: 10 }}
        />
        <Text>Add a coment for this transaction </Text>
      </TouchableOpacity>
      {/* Next Button */}
      <Button handle={handleNext} title="Next" style={{ marginTop: 20 }} />

      <KeyPad
        handleNumberPress={handleNumberPress}
        handleDelete={handleDelete}
      />
      <Modal visible={isVisible} setVisible={setIsVisible} isCloseButton>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Add your note"
            style={styles.input}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />
        </View>
        {file ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.thumbnailContainer}>{renderThumbnail()}</View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFile(null)}
            >
              <Ionicons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.modalfooterText}
            onPress={pickDocument}
          >
            <Image source={require("@/assets/images/extra/upload.png")} />
            <Text>Upload attachment here</Text>
          </TouchableOpacity>
        )}
        {/* Button */}
        <Button
          handle={() => {
            setIsVisible(false);
            navigation.push("review-details", { user, amount, note, file });
          }}
          title="Next"
        />
      </Modal>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  prev: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bankMarkIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 100,
  },
  avatar: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 100,
    width: 40,
    height: 40,
    backgroundColor: "#E5E9FF",
    textAlign: "center",
    paddingTop: 11,
  },
  amountTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.primary,
  },
  amountContainer: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: "600",
    marginVertical: 50,
    textAlign: "center",
  },
  addCommet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalfooterText: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.5,
    marginVertical: 20,
  },
  thumbnailContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
  documentThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  documentText: {
    fontSize: 14,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    marginLeft: 10,
  },
  inputBox: {
    paddingHorizontal: 24,
    margin: 25,
    alignSelf: "center",
  },
  input: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default AddMoneyScreen;
