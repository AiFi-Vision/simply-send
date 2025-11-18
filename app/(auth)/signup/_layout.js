import { Stack } from "expo-router";

const SignUpLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="verify" options={{ headerShown: false }} />
    <Stack.Screen name="name" options={{ headerShown: false }} />
    <Stack.Screen name="birth" options={{ headerShown: false }} />
    <Stack.Screen name="address" options={{ headerShown: false }} />
    <Stack.Screen name="secure" options={{ headerShown: false }} />
    <Stack.Screen name="push-notification" options={{ headerShown: false }} />
    <Stack.Screen name="pin" options={{ headerShown: false }} />
    <Stack.Screen name="setup-pin" options={{ headerShown: false }} />
    <Stack.Screen name="confirm-pin" options={{ headerShown: false }} />
    <Stack.Screen name="face" options={{ headerShown: false }} />
    <Stack.Screen name="finger" options={{ headerShown: false }} />
    <Stack.Screen name="complete" options={{ headerShown: false }} />
  </Stack>
);

export default SignUpLayout;
