import React, { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import { colors } from '../constants/colors';
import { FoodContext } from '../context/FoodContext';
import { FoodItem } from '../types/types'; // Add this import

interface AddFoodScreenProps {
  onComplete?: (food: FoodItem) => void;
  initialValues?: FoodItem;
}

export default function AddFoodScreen({ onComplete, initialValues }: AddFoodScreenProps) {
  const { addFood } = useContext(FoodContext);
  const [name, setName] = useState(initialValues?.name || '');
  const [calories, setCalories] = useState(initialValues?.calories?.toString() || '');
  const [carbs, setCarbs] = useState(initialValues?.carbs?.toString() || '');
  const [protein, setProtein] = useState(initialValues?.protein?.toString() || '');
  const [fat, setFat] = useState(initialValues?.fat?.toString() || '');

  const handleSave = () => {
    if (!name || !calories) {
      Alert.alert('Required Fields', 'Please enter food name and calories.');
      return;
    }

    const food = {
      id: initialValues?.id || uuid.v4().toString(),
      name,
      calories: +calories,
      carbs: +carbs || 0,
      protein: +protein || 0,
      fat: +fat || 0,
      date: initialValues?.date || new Date().toISOString(),
    };

    if (initialValues) {
      onComplete?.(food);
    } else {
      addFood(food);
      Alert.alert('Success', 'Food entry added successfully');
      onComplete?.(food);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Food Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        style={styles.input}
      />
      <TextInput
        placeholder="Carbs (g)"
        keyboardType="numeric"
        value={carbs}
        onChangeText={setCarbs}
        style={styles.input}
      />
      <TextInput
        placeholder="Protein (g)"
        keyboardType="numeric"
        value={protein}
        onChangeText={setProtein}
        style={styles.input}
      />
      <TextInput
        placeholder="Fat (g)"
        keyboardType="numeric"
        value={fat}
        onChangeText={setFat}
        style={styles.input}
      />
      <Button title="Save Food Entry" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
