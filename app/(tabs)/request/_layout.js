import { Stack } from "expo-router";

const WalletLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="select-user" options={{ headerShown: false }} />
    <Stack.Screen name="select-amount" options={{ headerShown: false }} />
    <Stack.Screen name="review-details" options={{ headerShown: false }} />
    <Stack.Screen name="success" options={{ headerShown: false }} />
    <Stack.Screen name="create-custom" options={{ headerShown: false }} />
  </Stack>
);

export default WalletLayout;
