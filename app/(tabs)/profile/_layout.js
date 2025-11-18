import { Stack } from "expo-router";

const ProfileLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="policy" options={{ headerShown: false }} />
    <Stack.Screen name="terms" options={{ headerShown: false }} />
    <Stack.Screen name="account" options={{ headerShown: false }} />
    <Stack.Screen name="help" options={{ headerShown: false }} />
    <Stack.Screen name="refer" options={{ headerShown: false }} />
    <Stack.Screen name="notification" options={{ headerShown: false }} />
    <Stack.Screen name="schedule" options={{ headerShown: false }} />
    <Stack.Screen name="request" options={{ headerShown: false }} />
    <Stack.Screen name="receive" options={{ headerShown: false }} />
    <Stack.Screen name="feedback" options={{ headerShown: false }} />
  </Stack>
);

export default ProfileLayout;
