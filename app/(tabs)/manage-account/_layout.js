import { Stack } from "expo-router";

const ManageAccountLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="connect-bank" options={{ headerShown: false }} />
    <Stack.Screen name="find-bank" options={{ headerShown: false }} />
    <Stack.Screen name="plaid-bank" options={{ headerShown: false }} />
    <Stack.Screen name="add-card" options={{ headerShown: false }} />
    <Stack.Screen name="add-card-detail" options={{ headerShown: false }} />
    <Stack.Screen name="edit-card" options={{ headerShown: false }} />
  </Stack>
);

export default ManageAccountLayout;
