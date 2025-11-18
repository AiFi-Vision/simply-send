import React from "react";
import { StyleSheet } from "react-native";
import SuccessView from "@/components/Success";

const SendSuccess = () => {
  return (
    <SuccessView
      title="Money added to your bank."
      content="You have successfully sent $ 200 USD to Ronald Richard."
    ></SuccessView>
  );
};

const styles = StyleSheet.create({});

export default SendSuccess;
