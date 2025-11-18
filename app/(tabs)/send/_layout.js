import { Stack } from "expo-router";

const WithDrawLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="review-details" options={{ headerShown: false }} />
    <Stack.Screen name="payment-confirm" options={{ headerShown: false }} />
    <Stack.Screen name="success" options={{ headerShown: false }} />
  </Stack>
);

export default WithDrawLayout;
