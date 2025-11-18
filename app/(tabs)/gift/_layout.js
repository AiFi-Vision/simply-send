import { Stack } from "expo-router";

const GiftCardLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="detail" options={{ headerShown: false }} />
  </Stack>
);

export default GiftCardLayout;
