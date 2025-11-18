import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, Text, TextInput, RadioButton } from "@/elements";
import { useUserStore } from "@/store";

const LoginScreen = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fakeUser = {
    id: 1,
    firstName: "Daiki",
    lastName: "Fujimoto",
    avatar: require("@/assets/images/users/user_8.png"),
    email: "daikifujimoto.yato@gmail.com",
    token: "1234567890",
    isVerified: false,
    link: "https://simplisend.com/daikifujimoto.yato",
  };

  const handleLogin = async () => {
    await useUserStore.getState().login(fakeUser);
    router.push("home");
  };

  return (
    <View style={styles.container}>
      {/* Info */}
      <View>
        <Image
          source={require("@/assets/images/auth/info.png")}
          style={styles.info}
        />
      </View>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")} // replace with your logo
          style={styles.logo}
        />
        <Text style={styles.welcome}>Welcome back to</Text>
        <Text style={styles.title}>Simplisend</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <FontAwesome name="envelope" size={20} color="#aaa" />
          <TextInput
            placeholder="Email/ Mobile Number"
            style={styles.input}
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
          <Ionicons name="scan-outline" size={20} color="#2ecc71" />
        </View>

        <View style={styles.inputBox}>
          <Feather name="lock" size={20} color="#aaa" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#2ecc71"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me + Forgot Password */}
        <View style={styles.row}>
          <View style={styles.rememberMe}>
            <RadioButton
              selected={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              size={20}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("forgot-password")}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <Button
          handle={handleLogin}
          title="Login"
          style={{ marginBottom: 60 }}
        />

        {/* Social Login */}
        <Text style={styles.or}>Or</Text>
        <Text style={styles.signUpWith} onPress={() => router.push("signup")}>
          Sign up With
        </Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            {/* <GoogleMark /> */}
            <FontAwesome name="google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <FontAwesome name="apple" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <FontAwesome name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text style={styles.createAccount}>Create new account</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  logoContainer: {
    marginTop: 80,
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  welcome: {
    fontWeight: 400,
    fontSize: 14,
    color: "#334399",
    lineHeight: 20,
  },
  title: {
    fontSize: 46,
    fontWeight: 600,
    color: "#334399",
  },
  inputContainer: {
    marginTop: 40,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    marginBottom: 25,
    height: 66,
    // backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 500,
    color: "#334399",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#2c3e50",
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: 500,
    color: "#27ae60",
  },
  or: {
    textAlign: "center",
    color: "#999",
    fontWeight: 400,
    fontSize: 14,
  },
  signUpWith: {
    textAlign: "center",
    fontWeight: 600,
    marginVertical: 10,
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  iconCircle: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 3,
  },
  footerText: {
    textAlign: "center",
    color: "#444",
    marginTop: 10,
    fontWeight: 400,
    fontSize: 14,
  },
  createAccount: {
    fontWeight: 600,
    color: "#334399",
  },
  info: {
    position: "absolute",
    top: 66,
    right: 0,
  },
});

export default LoginScreen;
