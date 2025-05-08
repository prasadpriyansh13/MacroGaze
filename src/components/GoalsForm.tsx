import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';

interface NutrientGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface GoalsFormProps {
  initialGoals: NutrientGoals;
  onSave: (goals: NutrientGoals) => void;
}

export function GoalsForm({ initialGoals, onSave }: GoalsFormProps) {
  const [goals, setGoals] = useState<NutrientGoals>(initialGoals);

  const handleSave = () => {
    onSave(goals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Daily Calories</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(goals.calories)}
          onChangeText={(value) => setGoals({ ...goals, calories: Number(value) || 0 })}
          placeholder="Enter calories"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Protein (g)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(goals.protein)}
          onChangeText={(value) => setGoals({ ...goals, protein: Number(value) || 0 })}
          placeholder="Enter protein in grams"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Carbs (g)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(goals.carbs)}
          onChangeText={(value) => setGoals({ ...goals, carbs: Number(value) || 0 })}
          placeholder="Enter carbs in grams"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fat (g)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(goals.fat)}
          onChangeText={(value) => setGoals({ ...goals, fat: Number(value) || 0 })}
          placeholder="Enter fat in grams"
        />
      </View>

      <Button
        title="Save Goals"
        onPress={handleSave}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  }
});