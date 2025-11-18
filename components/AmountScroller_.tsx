import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AmountScrollerProps {
  onAmountChange: (amount: number) => void;
  maxAmount?: number;
  step?: number;
  currency?: string;
}

const ITEM_WIDTH = 10;
const ITEM_HEIGHT = 30;
const windowWidth = Dimensions.get("window").width;

export default function AmountScroller({
  onAmountChange,
  maxAmount = 10000,
  step = 10,
  currency = "$",
}: AmountScrollerProps) {
  const [currentAmount, setCurrentAmount] = useState(0);
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const amounts = Array.from(
    { length: Math.floor(maxAmount / step) + 1 },
    (_, i) => i * step
  );

  const updateAmount = (offset: number) => {
    const index = Math.round(offset / ITEM_WIDTH);
    const boundedIndex = Math.max(0, Math.min(index, amounts.length - 1));
    const amount = amounts[boundedIndex];
    if (amount !== currentAmount) {
      setCurrentAmount(amount);
      onAmountChange(amount);
    }
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      const newX = startX.value + e.translationX;
      const maxX = (amounts.length - 1) * ITEM_WIDTH;
      translateX.value = Math.max(0, Math.min(newX, maxX));
      updateAmount(translateX.value);
    })
    .onEnd(() => {
      const snapPoint = Math.round(translateX.value / ITEM_WIDTH) * ITEM_WIDTH;
      translateX.value = withSpring(snapPoint, {
        damping: 20,
        stiffness: 200,
      });
      updateAmount(snapPoint);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.amountDisplay}>
        <Text style={styles.currencySymbol}>{currency}</Text>
        <Text style={styles.amount}>{currentAmount}</Text>
      </View>

      <View style={styles.scrollContainer}>
        <View style={styles.scrollWrapper}>
          <View style={styles.scrollViewContainer}>
            {/* <GestureDetector gesture={gesture}> */}
            <Animated.View style={[styles.ticksContainer, animatedStyle]}>
              {amounts.map((amount) => (
                <View key={amount} style={styles.amountItem}>
                  <View
                    style={[
                      styles.tick,
                      amount % (step * 5) === 0 && styles.fiveTick,
                      amount % (step * 10) === 0 && styles.tenTick,
                    ]}
                  />
                </View>
              ))}
            </Animated.View>
            {/* </GestureDetector> */}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3730A3",
    borderRadius: 16,
    padding: 10,
    width: "100%",
  },
  amountDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currencySymbol: {
    fontSize: 24,
    color: "#FFFFFF",
    marginRight: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  scrollContainer: {
    height: 50,
    alignItems: "center",
  },
  scrollWrapper: {
    width: windowWidth - 80,
    height: ITEM_HEIGHT,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  scrollViewContainer: {
    width: "100%",
    height: ITEM_HEIGHT,
    overflow: "hidden",
    marginTop: 10,
  },
  ticksContainer: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
  },
  amountItem: {
    width: ITEM_WIDTH,
    alignItems: "center",
  },
  tick: {
    width: 2,
    height: 10,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
  },
  fiveTick: {
    height: 25,
  },
  tenTick: {
    height: 50,
  },
});
