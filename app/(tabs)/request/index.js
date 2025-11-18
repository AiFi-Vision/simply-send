import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import ProgressBar from "@/components/ProgressBar";
import globalStyles from "@/styles/global";

const SuccessView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const nextStep = () => {
    if (currentStep >= 2) {
      navigation.push("select-user");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const paymentBanner = [
    {
      title: "Get paid with ease",
      content:
        "Request money is a new way to get anyone or your friends to pay you online. They use a link to see your request and to pay you directly.",
      image: require("@/assets/images/request/ease.png"),
      button: "Continue",
    },
    {
      title: "Payment link",
      content:
        "When you request money and share a payment link, the recipient can pay via easy bank transfer or by debit or credit card.",
      image: require("@/assets/images/request/ease.png"),
      button: "Continue",
    },
    {
      title: "Share a payment link",
      content:
        "You'll have the option to 'Share payment link'. You can share your payment link online, via email, via SMS, or Whatsapp.",
      image: require("@/assets/images/request/ease.png"),
      button: "Get Started",
    },
  ];

  return (
    <ContainerView
      prev={
        <View style={{ width: "90%" }}>
          <ProgressBar currentStep={currentStep + 1} totalSteps={3} />
        </View>
      }
      footer={
        <Button
          handle={nextStep}
          title={paymentBanner[currentStep]?.button}
          style={{ margin: 20 }}
        />
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        <Image source={paymentBanner[currentStep]?.image} />
        <Text style={[globalStyles.h1, styles.title]}>
          {paymentBanner[currentStep]?.title}
        </Text>
        <Text style={[globalStyles.h4, styles.content]}>
          {paymentBanner[currentStep]?.content}
        </Text>
      </View>
      {/* Button */}
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    lineHeight: 22,
    textAlign: "center",
  },
});

export default SuccessView;
