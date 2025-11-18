import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text, TextInput, RadioButton } from "@/elements";
import ContainerView from "@/components/ContainerView";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValidations = {
    hasUpperCase: (pw) => /[A-Z]/.test(pw),
    hasNumber: (pw) => /\d/.test(pw),
    hasSpecialChar: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    isMinLength: (pw) => pw.length >= 8,
  };

  const isUpperCase = passwordValidations.hasUpperCase(password);
  const isNumber = passwordValidations.hasNumber(password);
  const isSpecial = passwordValidations.hasSpecialChar(password);
  const isMinLength = passwordValidations.isMinLength(password);

  const handleSave = () => {
    if (password && password === confirm) {
      navigation.push("success-password");
    } else {
      console.log("Fail Confirm Password");
    }
  };

  return (
    <ContainerView
      prev="Reset Password"
      title="Reset Password"
      content="It's important to choose a strong and unique password for your account to keep it secure."
      footer={
        <Button handle={handleSave} title="Save" style={{ margin: 20 }} />
      }
    >
      {/* Input Field */}
      <View style={styles.body}>
        <View style={styles.inputBox}>
          <Image source={require("@/assets/images/auth/lock.png")} />
          <TextInput
            placeholder="New Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Image source={require("@/assets/images/auth/eye-open.png")} />
            ) : (
              <Image source={require("@/assets/images/auth/eye-close.png")} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputBox}>
          <Image source={require("@/assets/images/auth/lock.png")} />
          <TextInput
            placeholder="Confirm New Password"
            style={styles.input}
            secureTextEntry={!showConfirm}
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? (
              <Image source={require("@/assets/images/auth/eye-open.png")} />
            ) : (
              <Image source={require("@/assets/images/auth/eye-close.png")} />
            )}
          </TouchableOpacity>
        </View>

        {/* Change Password Requirement */}
        <View style={styles.extra}>
          <View style={styles.require}>
            <RadioButton selected={isUpperCase} size={16} />
            <Text style={styles.checkboxText}>At least one upper case</Text>
          </View>
          <View style={styles.require}>
            <RadioButton selected={isNumber} size={16} />
            <Text style={styles.checkboxText}>At least one number</Text>
          </View>
          <View style={styles.require}>
            <RadioButton selected={isSpecial} size={16} />
            <Text style={styles.checkboxText}>
              At least one special character (e.g. $%&)
            </Text>
          </View>
          <View style={styles.require}>
            <RadioButton selected={isMinLength} size={16} />
            <Text style={styles.checkboxText}>At least 8 Characters</Text>
          </View>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  body: {},
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    marginVertical: 12,
    height: 66,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 17,
  },
  extra: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  require: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkboxText: {
    fontSize: 15,
    fontWeight: 400,
    marginLeft: 10,
  },
});

export default ChangePasswordScreen;
