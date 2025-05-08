import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { FoodContext } from '../context/FoodContext';
import AddFoodScreen from '../screens/AddFoodScreen';
import { FoodEntry } from '../types/types';

export default function FoodEntryCard({ entry }: { entry: FoodEntry }) {
  const { deleteFood, updateFood } = useContext(FoodContext);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      'Delete Food Entry',
      'Are you sure you want to delete this food entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => deleteFood(entry.id),
          style: 'destructive'
        },
      ]
    );
  };

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleEditComplete = (updatedFood: FoodEntry) => {
    updateFood({ ...updatedFood, id: entry.id, date: entry.date });
    setIsEditModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{entry.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Ionicons name="pencil-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.calories}>{entry.calories} kcal</Text>
      <Text style={styles.macros}>
        Carbs: {entry.carbs}g | Protein: {entry.protein}g | Fat: {entry.fat}g
      </Text>
      <Text style={styles.date}>{new Date(entry.date).toLocaleDateString()}</Text>

      <Modal
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Food Entry</Text>
            <TouchableOpacity
              onPress={() => setIsEditModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <AddFoodScreen 
            initialValues={entry}
            onComplete={handleEditComplete}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  calories: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  macros: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    backgroundColor: colors.primary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    right: 8,
  },
});
