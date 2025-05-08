import { Stack } from 'expo-router';
import { FoodProvider } from '../src/context/FoodContext';

export default function RootLayout() {
  return (
    <FoodProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ headerShown: false }} />
      </Stack>
    </FoodProvider>
  );
}