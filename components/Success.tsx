import React, { ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Text from "@/elements/Text";
import { COLORS } from "@/styles/colors";

interface SuccessViewProps {
  title: string;
  content: string;
  children?: ReactNode;
}

const SuccessView: React.FC<SuccessViewProps> = ({
  title,
  content,
  children,
}) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.body}>
        <Image source={require("@/assets/images/home/success.png")} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      {children}
      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Go to home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2835930F",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  body: {
    alignItems: "center",
    marginTop: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: COLORS.primary,
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    color: COLORS.textColor,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 20,
  },
});

export default SuccessView;
