import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import ContainerView from "@/components/ContainerView";
import { Text, Button, TextInput } from "@/elements";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);

  // Handle feedback submission
  const handleSubmit = () => {
    if (feedback.trim() === "") {
      Alert.alert("Error", "Please provide feedback before submitting.");
      return;
    }

    // Here you can send the feedback data to a server, or email
    console.log("Feedback submitted:", feedback, "Rating:", rating);

    // Show a thank you message after submission
    Alert.alert("Thank You!", "Your feedback has been submitted.");
    setFeedback(""); // Clear the input field after submission
  };

  return (
    <ContainerView
      prev="Give Feedback"
      title="How would you rate your experience?"
    >
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text
              key={star}
              style={star <= rating ? styles.selectedStar : styles.star}
              onPress={() => setRating(star)}
            >
              ★
            </Text>
          ))}
        </View>

        <Text style={styles.label}>Your Feedback:</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your feedback here..."
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />

        <Button title="Submit Feedback" handle={handleSubmit} />
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    color: "#ccc",
    marginRight: 10,
  },
  selectedStar: {
    fontSize: 30,
    color: "#FFD700",
    marginRight: 10,
  },
  input: {
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});

export default FeedbackPage;
