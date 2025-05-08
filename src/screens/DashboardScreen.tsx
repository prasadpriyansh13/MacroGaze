import React, { useContext, useEffect, useState } from 'react'; // Add useEffect
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GoalsForm } from '../components/GoalsForm';
import { MacroProgressBar } from '../components/MacroProgressBar';
import { colors } from '../constants/colors';
import { FoodContext } from '../context/FoodContext';
import { getGoals, saveGoals } from '../storage/goalsStorage'; // Add getGoals
import { calculateMacros } from '../utils/nutrientUtils';

// Default goals if none are saved
const DEFAULT_GOALS = {
  calories: 2000,
  protein: 150,  // grams
  carbs: 250,    // grams
  fat: 70,       // grams
};

interface NutrientGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function DashboardScreen() {
  const { foods } = useContext(FoodContext);
  const [isGoalsModalVisible, setIsGoalsModalVisible] = useState(false);
  const [goals, setGoals] = useState<NutrientGoals>(DEFAULT_GOALS);

  // Load saved goals on component mount
  useEffect(() => {
    const loadSavedGoals = async () => {
      const savedGoals = await getGoals();
      if (savedGoals) {
        setGoals(savedGoals);
      }
    };
    loadSavedGoals();
  }, []);

  const todayFoods = foods.filter(food => {
    const today = new Date().toISOString().split('T')[0];
    return food.date.startsWith(today);
  });
  const summary = calculateMacros(todayFoods);

  const getCompletion = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <Pressable
          onPress={() => setIsGoalsModalVisible(true)}
          style={styles.goalsButton}
        >
          <Text style={styles.goalsButtonText}>Set Goals</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <View style={styles.card}>
          <MacroProgressBar
            label="Calories"
            current={summary.calories}
            target={goals.calories}  // Changed from DAILY_GOALS
            color={colors.primary}
          />
          <MacroProgressBar
            label="Protein"
            current={summary.protein}
            target={goals.protein}   // Changed from DAILY_GOALS
            color={colors.nutrientColors.protein}
            unit="g"
          />
          <MacroProgressBar
            label="Carbs"
            current={summary.carbs}
            target={goals.carbs}
            color={colors.nutrientColors.carbs}
            unit="g"
          />
          <MacroProgressBar
            label="Fat"
            current={summary.fat}
            target={goals.fat}
            color={colors.nutrientColors.fat}
            unit="g"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Macro Distribution</Text>
        <View style={styles.card}>
          <Text style={styles.insightText}>
            {`Protein: ${getCompletion(summary.protein, goals.protein)}% of daily goal`}
          </Text>
          <Text style={styles.insightText}>
            {`Carbs: ${getCompletion(summary.carbs, goals.carbs)}% of daily goal`}
          </Text>
          <Text style={styles.insightText}>
            {`Fat: ${getCompletion(summary.fat, goals.fat)}% of daily goal`}
          </Text>
        </View>
      </View>

      <Modal
        visible={isGoalsModalVisible}
        onRequestClose={() => setIsGoalsModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Nutrient Goals</Text>
            <GoalsForm
              initialGoals={goals}
              onSave={(newGoals) => {
                setGoals(newGoals);
                saveGoals(newGoals);
                setIsGoalsModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  goalsButton: {
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  goalsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
    textAlign: 'center',
  },
});

export default DashboardScreen;