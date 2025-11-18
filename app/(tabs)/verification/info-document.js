import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import ContainerView from "@/components/ContainerView";
import ExchangeRate from "@/components/ExchangeRate";
import { COLORS } from "@/styles/colors";
import { Text, TextInput } from "@/elements";
import globalStyles from "@/styles/global";

const InfoDocumentScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView prev="Information" title="Accepted identity documents">
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Image
            source={require("@/assets/images/currency/USD.png")}
            style={{ width: 30, height: 30, marginRight: 12 }}
          />
          <TextInput
            placeholder="Currency"
            style={styles.input}
            value="United States"
            editable={false}
          />
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>
            State-issued IDs such as a Driver License or Identification Card
          </Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>Social Security number (SSN)</Text>
        </View>
        <View style={styles.inputBox}>
          <ExchangeRate rateHide />
          <TextInput
            placeholder="Currency"
            style={styles.input}
            value="Canada & UK"
            editable={false}
          />
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>International Passport</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>Government-issued photo ID</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>National Identity Card</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>Permanent Residence Document</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.radioButton}
          />
          <Text style={styles.radioText}>Drivers License</Text>
        </View>
        <View style={styles.importantContent}>
          <Text style={styles.importantTitle}>Important</Text>
          <Text>
            Please make sure that your document is valid. We do not accept
            expired IDS.
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Image
            source={require("@/assets/images/extra/unaccept.png")}
            style={{ width: 30, height: 30, marginRight: 12 }}
          />
          <TextInput
            placeholder="Currency"
            style={styles.input}
            value="Unaccepted identity documents"
            editable={false}
          />
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="close"
            size={16}
            color="white"
            style={[styles.radioButton, { backgroundColor: "red" }]}
          />
          <Text style={styles.radioText}>School IDs</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="close"
            size={16}
            color="white"
            style={[styles.radioButton, { backgroundColor: "red" }]}
          />
          <Text style={styles.radioText}>Medical IDs</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="close"
            size={16}
            color="white"
            style={[styles.radioButton, { backgroundColor: "red" }]}
          />
          <Text style={styles.radioText}>Temporary (paper) IDs</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="close"
            size={16}
            color="white"
            style={[styles.radioButton, { backgroundColor: "red" }]}
          />
          <Text style={styles.radioText}>Residence Permit</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="close"
            size={16}
            color="white"
            style={[styles.radioButton, { backgroundColor: "red" }]}
          />
          <Text style={styles.radioText}>Public Services Card</Text>
        </View>
        <View style={styles.radioBox}>
          <Ionicons
            name="close"
            size={16}
            color="white"
            style={[styles.radioButton, { backgroundColor: "red" }]}
          />
          <Text style={styles.radioText}>Military IDs</Text>
        </View>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E0FFF0" }]}
          onPress={() => navigation.push("info-id")}
        >
          <View>
            <Text style={[globalStyles.h4, { color: "#3862F8" }]}>Next</Text>
            <Text style={styles.cardText}>
              How to verify your ID on simplisend
            </Text>
          </View>
          <ChevronRight size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    borderRadius: 18,
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  cardText: {
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.textColor,
    lineHeight: 25,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 24,
    height: 66,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  radioBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radioText: {
    marginLeft: 16,
    fontSize: 16,
    color: COLORS.textColor,
    opacity: 0.8,
  },
  radioButton: {
    backgroundColor: "#74C12C",
    borderRadius: 100,
    padding: 4,
  },
  importantContent: {
    borderLeftWidth: 10,
    borderColor: COLORS.yellow,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#FFF6E0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  importantTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: COLORS.textColor,
    marginBottom: 4,
  },
});

export default InfoDocumentScreen;
