import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import { Text } from "@/elements";

const { width, height } = Dimensions.get("screen");

type OnboardingItem = {
  bgColor: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
};

type OnboardingScreenProps = {
  item: OnboardingItem;
  index: number;
  total: number;
};

export default function OnboardingScreen({
  item,
  index,
  total,
}: OnboardingScreenProps) {
  return (
    <ImageBackground source={item.image} style={styles.background}>
      <View style={{ bottom: index + 1 === total ? -100 : -200 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "200",
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
