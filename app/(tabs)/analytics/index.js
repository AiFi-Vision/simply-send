import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContainerView from "@/components/ContainerView";
import { Button, Text } from "@/elements";
import globalStyles from "@/styles/global";

const AnalyticsScreen = () => {
  const navigation = useNavigation();

  return (
    <ContainerView
      prev="Analytics"
      footer={
        <Button
          handle={() => navigation.push("details")}
          title="Got it"
          style={{ margin: 20 }}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/transaction/analytics.png")}
          />
          <Text style={[globalStyles.h1, { marginTop: 45 }]}>
            Welcome to Analytics
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={globalStyles.h2}>
              Track how much you send and spend
            </Text>
            <Text style={globalStyles.h4}>
              See how much you've been sending and spending this month compared
              to last.
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={globalStyles.h2}>Cross balance analysis</Text>
            <Text style={globalStyles.h4}>
              Analyse all transactions, or focus on one balance.
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={globalStyles.h2}>In depth category spending </Text>
            <Text style={globalStyles.h4}>
              Track how much your takeout habit is costing, or if you budgeted
              better on your last trip.
            </Text>
          </View>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: "center",
  },
  body: {
    marginTop: 38,
  },
  row: {
    marginBottom: 30,
    marginHorizontal: 10,
  },
});

export default AnalyticsScreen;
