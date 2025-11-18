import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Text from "@/elements/Text";
import TextInput from "@/elements/TextInput";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/elements";
import globalStyles from "@/styles/global";

const SignUpBirthScreen = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(moment(day).format("DD/MM/YYYY").toString());
    setShowCalendar(false); // Close the calendar after selection
  };

  const handleSendOTP = () => {
    // Send OTP logic here
    console.log("Sending OTP to:", selectedDate);
    if (selectedDate) {
      navigation.navigate("address");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#111" />
        </TouchableOpacity>
      </View>
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={3} totalSteps={6} />
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={globalStyles.h1}>Enter your date of birth</Text>
        <Text style={[globalStyles.h4, styles.subtitle]}>
          Please enter your date of birth so that we can better understand you.
        </Text>

        <TouchableOpacity
          style={[styles.inputBox, selectedDate && styles.inputFocused]}
          onPress={() => setShowCalendar(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={selectedDate ? "#000" : "#999"}
            style={styles.icon}
          />
          <TextInput
            placeholder="DD/MM/YY"
            value={selectedDate}
            style={styles.input}
            placeholderTextColor="#888"
            editable={false}
          />
        </TouchableOpacity>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "blue",
                  selectedTextColor: "white",
                },
              }}
            />
          </View>
        )}

        {/* Button */}
        <Button
          handle={handleSendOTP}
          title="Next"
          disable={!selectedDate}
          style={{ marginTop: 60 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 500,
    color: "#111",
  },
  progressContainer: {
    paddingTop: 24,
  },
  body: {
    marginTop: 40,
  },
  subtitle: {
    marginVertical: 15,
    lineHeight: 22,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 24,
    marginBottom: 25,
    height: 66,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#59b77f",
  },
  icon: {
    marginRight: 8,
  },
  calendarContainer: {
    position: "relative",
    backgroundColor: "white",
    top: -10,
    // left: 20,
    // right: 20,
    borderRadius: 10,
    elevation: 5,
    zIndex: 999,
  },
});

export default SignUpBirthScreen;
