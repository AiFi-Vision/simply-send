import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";
import globalStyles from "@/styles/global";

interface AmountScrollerProps {
  onAmountChange: (amount: number) => void;
  maxAmount?: number;
  step?: number;
  currency?: string;
  amount?: number;
}

const SCALE_X = 15;
const SCALE_Y = 10;

const AmountScroller: React.FC<AmountScrollerProps> = ({
  onAmountChange,
  maxAmount = 10000,
  step = 0,
  currency = "$",
  amount = 0,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const lastScrollX = useRef(0);

  const amounts = Array.from(
    { length: Math.floor(maxAmount / step) + 1 },
    (_, i) => i * step
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    onAmountChange(Math.floor((xOffset + 1) / SCALE_X) * step);
    // const currentX = event.nativeEvent.contentOffset.x;

    // const movedDistance = currentX - lastScrollX.current; // ← movement range
    // console.log("Moved:", movedDistance);

    // lastScrollX.current = currentX;
    // onAmountChange(amount + Math.floor((movedDistance / SCALE_X) * step));
  };

  const scrollToPosition = (x: number) => {
    scrollViewRef.current?.scrollTo({ x, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={globalStyles.h2}>
          {currency}
          {amount}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
        style={styles.scroll}
      >
        <View style={styles.ruler}>
          {amounts.map((item, index) => (
            <View
              style={[
                styles.item,
                item % (step * 5) === 0 && { height: SCALE_Y * 2 },
                item % (step * 10) === 0 && { height: SCALE_Y * 3 },
              ]}
              key={index}
            ></View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 125,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  ruler: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  item: {
    borderRightWidth: 1,
    borderColor: COLORS.white,
    width: SCALE_X,
    height: SCALE_Y,
  },
  scroll: {
    // marginLeft: "50%",
  },
});

export default AmountScroller;
