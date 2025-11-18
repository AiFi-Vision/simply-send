import { Stack } from "expo-router";

const AnalyticsLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="details" options={{ headerShown: false }} />
  </Stack>
);

export default AnalyticsLayout;
