export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  date: string;
}

// Use FoodEntry type instead of duplicate interface
export type FoodItem = FoodEntry;
