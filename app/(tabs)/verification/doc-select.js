import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text, Button } from "@/elements";
import { COLORS } from "@/styles/colors";

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={styles.radioBody}>
      <Text style={styles.radioLabel}>{label}</Text>
    </View>
    <View
      style={[
        styles.outerCircle,
        selected && { borderColor: COLORS.secondary },
      ]}
    >
      {selected && <View style={styles.innerCircle} />}
    </View>
  </TouchableOpacity>
);

const DocSelectScreen = () => {
  const navigation = useNavigation();
  const [selectedKey, setSelectedKey] = useState(0);

  return (
    <ContainerView
      title="Select Identity Document"
      content="Select the type of document you want to upload"
      footer={
        <View style={styles.footer}>
          <Button
            handle={() => navigation.push("doc-capture")}
            title="Continue"
          />
        </View>
      }
    >
      {/* Main Content */}
      <View style={styles.body}>
        {[
          "Driving License",
          "National Insurance Number",
          "Passport",
          "Social Security Number",
        ].map((item, index) => (
          <RadioButton
            key={index}
            label={item}
            selected={index === selectedKey}
            onPress={() => setSelectedKey(index)}
          />
        ))}
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  body: {},
  footer: {
    margin: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 24,
    marginVertical: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#888", // Green border
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 100,
    backgroundColor: COLORS.secondary, // Filled green dot
  },
  radioBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default DocSelectScreen;
