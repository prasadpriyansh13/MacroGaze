import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { FoodContext } from '../context/FoodContext';
import { calculateMacros } from '../utils/nutrientUtils';

export default function SummaryScreen() {
  const { foods } = useContext(FoodContext);
  
  const summary = useMemo(() => calculateMacros(foods), [foods]);

  if (foods.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>No Data Available</Text>
        <Text style={styles.subtitle}>Add some food entries to see your nutrition summary</Text>
      </View>
    );
  }

  const totalMacros = summary.carbs + summary.protein + summary.fat;
  const getPercentage = (value: number) => ((value / totalMacros) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Summary</Text>
      
      <View style={styles.card}>
        <Text style={styles.mainStat}>
          {summary.calories}
          <Text style={styles.unit}> kcal</Text>
        </Text>
        <Text style={styles.label}>Total Calories</Text>
      </View>

      <View style={styles.macroContainer}>
        <View style={[styles.macroCard, { backgroundColor: colors.nutrientColors.protein }]}>
          <Text style={styles.macroValue}>{summary.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.percentage}>{getPercentage(summary.protein)}%</Text>
        </View>

        <View style={[styles.macroCard, { backgroundColor: colors.nutrientColors.carbs }]}>
          <Text style={styles.macroValue}>{summary.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.percentage}>{getPercentage(summary.carbs)}%</Text>
        </View>

        <View style={[styles.macroCard, { backgroundColor: colors.nutrientColors.fat }]}>
          <Text style={styles.macroValue}>{summary.fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
          <Text style={styles.percentage}>{getPercentage(summary.fat)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  mainStat: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  unit: {
    fontSize: 20,
  },
  label: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  macroCard: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  macroLabel: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  percentage: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 12,
    marginTop: 2,
  },
});
