import AsyncStorage from '@react-native-async-storage/async-storage';

const GOALS_STORAGE_KEY = '@nutrient_goals';

export async function saveGoals(goals: {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}) {
  try {
    await AsyncStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals:', error);
  }
}

export async function getGoals() {
  try {
    const goals = await AsyncStorage.getItem(GOALS_STORAGE_KEY);
    return goals ? JSON.parse(goals) : null;
  } catch (error) {
    console.error('Error loading goals:', error);
    return null;
  }
}