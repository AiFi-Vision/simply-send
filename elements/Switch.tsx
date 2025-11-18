import { COLORS } from "@/styles/colors";
import React, { useEffect, useRef } from "react";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";

interface CustomSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  height?: number;
  width?: number;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onChange,
  height = 20,
  width = 40,
}) => {
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const circleSize = height - 6;
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, width - height + 3],
  });

  return (
    <TouchableOpacity onPress={() => onChange(!value)}>
      <View
        style={[
          styles.track,
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: value ? COLORS.secondary : "#ccc",
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: "center",
    padding: 3,
  },
  thumb: {
    backgroundColor: "#fff",
    position: "absolute",
  },
});

export default CustomSwitch;
