import { Stack } from "expo-router";

const VerificationLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="method-select" options={{ headerShown: false }} />
    <Stack.Screen name="information" options={{ headerShown: false }} />
    <Stack.Screen name="info-identify" options={{ headerShown: false }} />
    <Stack.Screen name="info-simplisend" options={{ headerShown: false }} />
    <Stack.Screen name="info-document" options={{ headerShown: false }} />
    <Stack.Screen name="info-id" options={{ headerShown: false }} />
    <Stack.Screen name="info-profile" options={{ headerShown: false }} />
    <Stack.Screen name="email-verify" options={{ headerShown: false }} />
    <Stack.Screen name="email-check" options={{ headerShown: false }} />
    <Stack.Screen name="selfie-dashboard" options={{ headerShown: false }} />
    <Stack.Screen name="selfie-capture" options={{ headerShown: false }} />
    <Stack.Screen name="selfie-verify" options={{ headerShown: false }} />
    <Stack.Screen name="doc-dashboard" options={{ headerShown: false }} />
    <Stack.Screen name="doc-scan" options={{ headerShown: false }} />
    <Stack.Screen name="doc-select" options={{ headerShown: false }} />
    <Stack.Screen name="doc-capture" options={{ headerShown: false }} />
    <Stack.Screen name="doc-verify" options={{ headerShown: false }} />
    <Stack.Screen name="verify-success" options={{ headerShown: false }} />
  </Stack>
);

export default VerificationLayout;
