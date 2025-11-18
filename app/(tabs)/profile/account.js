import ContainerView from "@/components/ContainerView";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Text } from "@/elements";
import { COLORS } from "@/styles/colors";
import globalStyles from "@/styles/global";

const AccountScreen = () => {
  return (
    <ContainerView
      prev="Account limits"
      title="Account limits"
      content="Please enter the strong password to make your payment secure."
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            How much money I can withdraw from wallet?
          </Text>
          <ChevronRight size={18} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            How many transaction I can make in one day?
          </Text>
          <ChevronRight size={18} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={[globalStyles.h3, { color: COLORS.textColor }]}>
            Can I have more than one account ?
          </Text>
          <ChevronRight size={18} color={"#000"} />
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    marginTop: 12,
  },
});

export default AccountScreen;
