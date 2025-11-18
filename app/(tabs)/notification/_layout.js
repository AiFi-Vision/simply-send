import { Stack } from "expo-router";

const NotificationLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
);

export default NotificationLayout;
