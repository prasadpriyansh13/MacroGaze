import React, { createContext, useEffect, useState } from 'react';
import { getFoods, saveFoods } from '../storage/foodStorage';
import { FoodItem } from '../types/types';

interface FoodContextProps {
  foods: FoodItem[];
  addFood: (food: FoodItem) => void;
  deleteFood: (id: string) => void;
  updateFood: (food: FoodItem) => void;  // Add this line
}

export const FoodContext = createContext<FoodContextProps>({
  foods: [],
  addFood: () => {},
  deleteFood: () => {},
  updateFood: () => {},  // Add this line
});

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    const loadFoods = async () => setFoods(await getFoods());
    loadFoods();
  }, []);

  const addFood = (food: FoodItem) => {
    const newFoods = [...foods, food];
    setFoods(newFoods);
    saveFoods(newFoods);
  };

  const deleteFood = (id: string) => {
    const newFoods = foods.filter(f => f.id !== id);
    setFoods(newFoods);
    saveFoods(newFoods);
  };

  const updateFood = (updatedFood: FoodItem) => {
    const newFoods = foods.map(food => 
      food.id === updatedFood.id ? updatedFood : food
    );
    setFoods(newFoods);
    saveFoods(newFoods);
  };

  return (
    <FoodContext.Provider value={{ foods, addFood, deleteFood, updateFood }}>
      {children}
    </FoodContext.Provider>
  );
};
