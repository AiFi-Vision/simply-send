import { Stack } from "expo-router";

const RecipientsLayout = () => (
  <Stack>
    <Stack.Screen name="search" options={{ headerShown: false }} />
    <Stack.Screen name="add" options={{ headerShown: false }} />
    <Stack.Screen name="add-myself" options={{ headerShown: false }} />
    <Stack.Screen name="myself-details" options={{ headerShown: false }} />
    <Stack.Screen name="someone" options={{ headerShown: false }} />
    <Stack.Screen name="someone-details" options={{ headerShown: false }} />
    <Stack.Screen name="business" options={{ headerShown: false }} />
  </Stack>
);

export default RecipientsLayout;
