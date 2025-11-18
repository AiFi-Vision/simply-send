import { Stack } from "expo-router";

const AuthLayout = () => (
  <Stack>
    <Stack.Screen name="login" options={{ headerShown: false }} />
    <Stack.Screen name="signup" options={{ headerShown: false }} />
    <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
    <Stack.Screen name="verify" options={{ headerShown: false }} />
    <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    <Stack.Screen name="success-password" options={{ headerShown: false }} />
  </Stack>
);

export default AuthLayout;
