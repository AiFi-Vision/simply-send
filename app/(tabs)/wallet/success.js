import React from "react";
import { StyleSheet } from "react-native";
import SuccessView from "@/components/Success";

const AddMoneySuccess = () => {
  return (
    <SuccessView
      title="Money added to your wallet successfully"
      content="You have successfully added $ 1000 USD to your wallet."
    />
  );
};

const styles = StyleSheet.create({});

export default AddMoneySuccess;
