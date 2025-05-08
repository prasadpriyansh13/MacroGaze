import { Stack } from 'expo-router';
import { colors } from '../../src/constants/colors'; // Adjust the path as needed
import AddFoodScreen from '../../src/screens/AddFoodScreen';

export default function AddFoodModal() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Food Entry',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      <AddFoodScreen />
    </>
  );
}