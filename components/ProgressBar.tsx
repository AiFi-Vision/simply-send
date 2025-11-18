import React from "react";
import { View, StyleSheet } from "react-native";

// Define the props for ProgressBar
interface ProgressBarProps {
  currentStep: number; // The current step (active step)
  totalSteps: number; // The total number of steps
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  // Create an array with boolean values to represent active and inactive steps
  const steps = new Array(totalSteps)
    .fill(false)
    .map((_, index) => index < currentStep);

  return (
    <View style={styles.progressStepsContainer}>
      {steps.map((isActive, index) => (
        <View key={index} style={styles.progressStep}>
          <View
            style={[styles.progressIndicator, isActive && styles.activeStep]}
          />
        </View>
      ))}
    </View>
  );
};

// StyleSheet for ProgressBar
const styles = StyleSheet.create({
  progressStepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginHorizontal: 4,
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: "#22C55E", // Active step color
  },
});

export default ProgressBar;
