import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import FoodEntryCard from '../../src/components/FoodEntryCard';
import { colors } from '../../src/constants/colors';
import { FoodContext } from '../../src/context/FoodContext';
import AddFoodScreen from '../../src/screens/AddFoodScreen';

export default function TabHome() {
  const { foods } = useContext(FoodContext);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleAddComplete = () => {
    setIsAddModalVisible(false);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No food entries yet</Text>
      <Text style={styles.emptySubtext}>Tap the + button to add your first meal</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        renderItem={({ item }) => <FoodEntryCard entry={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />
      
      <Pressable
        onPress={() => setIsAddModalVisible(true)}
        style={styles.addButton}
      >
        <Ionicons name="add-circle" size={56} color={colors.primary} />
      </Pressable>

      <Modal
        visible={isAddModalVisible}
        onRequestClose={() => setIsAddModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Food Entry</Text>
            <Pressable
              onPress={() => setIsAddModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </Pressable>
          </View>
          <AddFoodScreen onComplete={handleAddComplete} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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