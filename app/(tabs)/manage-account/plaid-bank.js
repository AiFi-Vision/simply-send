import ContainerView from "@/components/ContainerView";
import { StyleSheet, View } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Text, Button } from "@/elements";
import globalStyles from "@/styles/global";

const PlaidBankScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Use Plaid to link your bank"
      footer={
        <Button
          title="Continue"
          handle={() => navigation.dispatch(StackActions.popToTop())}
          style={{ margin: 20 }}
        />
      }
    >
      <View style={styles.container}>
        <Text style={globalStyles.h1}>
          Simplisend Uses Plaid to link your bank
        </Text>
        <Text style={globalStyles.h2}>Developing connect with Plaid...</Text>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({});

export default PlaidBankScreen;
