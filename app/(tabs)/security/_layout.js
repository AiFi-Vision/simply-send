import { Stack } from "expo-router";

const SecurityLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="change-password" options={{ headerShown: false }} />
    <Stack.Screen name="transaction-pin" options={{ headerShown: false }} />
    <Stack.Screen name="confirm-pin" options={{ headerShown: false }} />
  </Stack>
);

export default SecurityLayout;
