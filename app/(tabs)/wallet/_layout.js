import { Stack } from "expo-router";

const WalletLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="card" options={{ headerShown: false }} />
    <Stack.Screen name="add" options={{ headerShown: false }} />
    <Stack.Screen name="review-details" options={{ headerShown: false }} />
    <Stack.Screen name="select-bank" options={{ headerShown: false }} />
    <Stack.Screen name="payment-method" options={{ headerShown: false }} />
    <Stack.Screen name="payment-confirm" options={{ headerShown: false }} />
    <Stack.Screen name="success" options={{ headerShown: false }} />
  </Stack>
);

export default WalletLayout;
