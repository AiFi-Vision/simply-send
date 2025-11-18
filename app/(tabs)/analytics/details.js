import React, { useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { FontAwesome } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import { Text } from "@/elements";
import ContainerView from "@/components/ContainerView";
import { formatAmount } from "@/helper";
import { COLORS } from "@/styles/colors";

const AnalyticsDetailScreen = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(2025);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const barData = [
    {
      value: 40,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#3862F8",
    },
    { value: 20, frontColor: "#ECEFF1" },
    {
      value: 50,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#3862F8",
    },
    { value: 40, frontColor: "#ECEFF1" },
    {
      value: 75,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#3862F8",
    },
    { value: 25, frontColor: "#ECEFF1" },
    {
      value: 30,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#3862F8",
    },
    { value: 20, frontColor: "#ECEFF1" },
    {
      value: 60,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#3862F8",
    },
    { value: 40, frontColor: "#ECEFF1" },
    {
      value: 65,
      label: "Jun",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#3862F8",
    },
    { value: 30, frontColor: "#ECEFF1" },
  ];

  return (
    <ContainerView prev="Analytics" title="Spending">
      <View style={styles.container}>
        <View style={styles.dropbox}>
          <Pressable
            style={styles.currencySelector}
            onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
          >
            <Text style={styles.currencyCode}>{selectedCurrency}</Text>
            <ChevronDown size={20} color="#6B7280" />
          </Pressable>
          {showCurrencyPicker && (
            <View style={styles.currencyPicker}>
              {[2022, 2023, 2024, 2025, 2026].map((currency) => (
                <TouchableOpacity
                  key={currency}
                  style={styles.currencyOption}
                  onPress={() => {
                    setSelectedCurrency(currency);
                    setShowCurrencyPicker(false);
                  }}
                >
                  <Text style={styles.currencyOptionText}>{currency}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Bar Chart */}
        <BarChart
          data={barData}
          barWidth={10}
          spacing={30}
          initialSpacing={10}
          roundedTop
          roundedBottom
          yAxisThickness={0}
          hideYAxisText={true}
          xAxisColor="#ECEFF1"
          noOfSections={3}
          maxValue={75}
        />

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View>
            <Text style={styles.value}>{formatAmount(6534, 2)} USD</Text>
            <Text style={styles.label}>Avg monthly spend</Text>
          </View>
          <View style={styles.statsRight}>
            <Text style={styles.value}>{formatAmount(2534, 2)} USD</Text>
            <Text style={styles.label}>Spent this month</Text>
          </View>
        </View>

        {/* Category */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <FontAwesome name="bar-chart" size={12} color="#3b82f6" />
          </View>
          <View style={styles.progressBar}>
            <Text style={styles.categoryText}>General</Text>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
          </View>
          <View style={styles.categoryFooter}>
            <Text style={[styles.value, { fontSize: 12 }]}>2,534.00 USD</Text>
            <Text style={styles.percent}>100%</Text>
          </View>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 32,
  },
  statsRight: {
    alignItems: "flex-end",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  label: {
    color: COLORS.primary,
    fontSize: 12,
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryHeader: {
    alignItems: "center",
    padding: 12,
    backgroundColor: "#E5E9FF",
    borderRadius: 100,
  },
  categoryText: {
    color: "#1f2937",
    fontWeight: "600",
  },
  progressBar: {
    width: "60%",
  },
  progressBarBackground: {
    backgroundColor: "#e5e7eb",
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "30%", // full bar
    backgroundColor: "#3b82f6",
    height: "100%",
  },
  categoryFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  percent: {
    color: COLORS.primary,
    fontWeight: "500",
  },
  dropbox: {
    alignSelf: "flex-end",
  },
  currencySelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#999",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    width: 100,
    height: 40,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginRight: 4,
  },
  currencyPicker: {
    position: "absolute",
    top: 40,
    width: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  currencyOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  currencyOptionText: {
    fontSize: 16,
    color: "#374151",
  },
});

export default AnalyticsDetailScreen;
