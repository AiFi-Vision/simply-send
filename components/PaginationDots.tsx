import React from "react";
import { View, StyleSheet } from "react-native";

interface PaginationDotsProps {
  currentIndex: number;
  total: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentIndex,
  total,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={styles.dotContainer}>
          {i === currentIndex ? (
            <View style={styles.activeDot}>
              <View style={styles.line} />
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.inactiveDot} />
          )}
        </View>
      ))}
    </View>
  );
};

const DOT_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  dotContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  activeDot: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: 8,
    height: 2,
    backgroundColor: "white",
    marginRight: 2,
    borderRadius: 1,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "white",
  },
  inactiveDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});

export default PaginationDots;
