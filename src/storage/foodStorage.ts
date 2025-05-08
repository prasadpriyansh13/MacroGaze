import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodEntry, FoodItem } from '../types/types';

const STORAGE_KEY = 'FOOD_ENTRIES';
const FOODS_KEY = 'FOODS';

export async function saveFoodEntry(entry: FoodEntry) {
  const existing = await getAllFoodEntries();
  const updated = [...existing, entry];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function getAllFoodEntries(): Promise<FoodEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function clearAllFoodEntries() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function getFoods(): Promise<FoodItem[]> {
  try {
    const raw = await AsyncStorage.getItem(FOODS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error getting foods:', error);
    return [];
  }
}

export async function saveFoods(foods: FoodItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FOODS_KEY, JSON.stringify(foods));
  } catch (error) {
    console.error('Error saving foods:', error);
  }
}
