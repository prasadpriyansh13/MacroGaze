import { FoodEntry } from '../types/types';

interface MacroSummary {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export const calculateMacros = (foods: FoodEntry[]): MacroSummary => {
  return foods.reduce(
    (acc, food) => {
      acc.calories += food.calories;
      acc.carbs += food.carbs;
      acc.protein += food.protein;
      acc.fat += food.fat;
      return acc;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );
};