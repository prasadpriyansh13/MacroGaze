import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FoodEntryCard from '../components/FoodEntryCard';
import { colors } from '../constants/colors';
import { FoodContext } from '../context/FoodContext';

export default function HomeScreen() {
  const { foods } = useContext(FoodContext);

  if (foods.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>No Food Entries Yet</Text>
        <Text style={styles.subtitle}>Add your first food entry using the tab below</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Food Entries</Text>
      {foods.map((food) => (
        <FoodEntryCard key={food.id} entry={food} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
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
    marginBottom: 10,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
