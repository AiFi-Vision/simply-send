import { Stack } from "expo-router";

const TabLayout = () => (
  <Stack>
    <Stack.Screen name="home" options={{ headerShown: false }} />
    <Stack.Screen name="withdraw" options={{ headerShown: false }} />
    <Stack.Screen name="wallet" options={{ headerShown: false }} />
    <Stack.Screen name="request" options={{ headerShown: false }} />
    <Stack.Screen name="send" options={{ headerShown: false }} />
    <Stack.Screen name="analytics" options={{ headerShown: false }} />
    <Stack.Screen name="chat" options={{ headerShown: false }} />
    <Stack.Screen name="quick-payment" options={{ headerShown: false }} />
    <Stack.Screen name="recipients" options={{ headerShown: false }} />
    <Stack.Screen name="profile" options={{ headerShown: false }} />
    <Stack.Screen name="manage-account" options={{ headerShown: false }} />
    <Stack.Screen name="gift" options={{ headerShown: false }} />
    <Stack.Screen name="security" options={{ headerShown: false }} />
    <Stack.Screen name="notification" options={{ headerShown: false }} />
    <Stack.Screen name="verification" options={{ headerShown: false }} />
  </Stack>
);

export default TabLayout;
