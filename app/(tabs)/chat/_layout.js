import { Stack } from "expo-router";

const ChatLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
  </Stack>
);

export default ChatLayout;
