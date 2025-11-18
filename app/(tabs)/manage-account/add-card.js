import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

const AddCardScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Add new card"
      title="Add new card"
      content="You can add a new card either by scanning or by manually providing the card details "
      footer={
        <Button
          title="Continue"
          handle={() => navigation.push("add-card-detail")}
          style={{ margin: 20 }}
        />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.scan}
          onPress={() => Alert.alert("Developing...")}
        >
          <Image
            source={require("@/assets/images/extra/qrscan.png")}
            style={{ width: 24, height: 24, marginBottom: 8 }}
          />
          <Text style={globalStyles.h3}>
            Tap <Text style={{ color: COLORS.secondary }}>here</Text> to scan
            card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("add-card-detail")}>
          <Text style={{ color: COLORS.secondary, textAlign: "center" }}>
            Enter card details manually
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  scan: {
    borderRadius: 18,
    borderColor: "#26323833",
    borderWidth: 2,
    height: 165,
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

export default AddCardScreen;
