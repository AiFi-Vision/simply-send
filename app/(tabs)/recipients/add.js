import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Text } from "@/elements";
import { COLORS } from "@/styles/colors";

const RecipientAddScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView prev="Add new recipient">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.push("add-myself")}
        >
          <View style={styles.itemLeft}>
            <Image source={require("@/assets/images/recipients/myself.png")} />
            <Text style={styles.itemText}>Myself</Text>
          </View>
          <ChevronRight size={20} color="#4B5563" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.push("someone")}
        >
          <View style={styles.itemLeft}>
            <Image source={require("@/assets/images/recipients/someone.png")} />
            <Text style={styles.itemText}>Someone else</Text>
          </View>
          <ChevronRight size={20} color="#4B5563" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.push("business")}
        >
          <View style={styles.itemLeft}>
            <Image
              source={require("@/assets/images/recipients/business.png")}
            />
            <Text style={styles.itemText}>Business/ organisation</Text>
          </View>
          <ChevronRight size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#26323833",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 10,
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RecipientAddScreen;
