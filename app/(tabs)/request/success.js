import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import SuccessView from "@/components/Success";
import { formatAmount } from "@/helper";
import Text from "@/elements/Text";
import UserCard from "@/components/UserCard";
import { COLORS } from "@/styles/colors";

const RequestSuccess = () => {
  const router = useRoute();
  const { user, amount } = router.params;

  return (
    <SuccessView
      title={`Your request of ${formatAmount(amount, 2)} is sent`}
      content="We will let Satish Ray know right away that you requested money. You can see the details in your activity in case you need them later"
    >
      <View style={styles.card}>
        <UserCard user={user} />
      </View>
      <TouchableOpacity>
        <Text style={{ color: COLORS.secondary, textAlign: "center" }}>
          View transaction details
        </Text>
      </TouchableOpacity>
    </SuccessView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#2835935F",
    shadowRadius: 10,
    elevation: 15,
  },
});

export default RequestSuccess;
